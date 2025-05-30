import pandas as pd
import random
import ast
import mysql.connector
from mysql.connector import errorcode

def extract_list(entry):
    try:
        return [x.strip() for x in ast.literal_eval(entry) if x.strip()]
    except:
        return []

config = {
    'user': 'root',
    'password': '', # Remplacez par votre mot de passe
    'host': 'localhost',
    'database': 'bibliogames',#Remplacez par le nom de votre DB
    'raise_on_warnings': True
}

try:
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor(buffered=True)
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Accès refusé: mauvais user/mdp")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("La base n'existe pas")
    else:
        print(err)
    exit()

details = pd.read_csv("details.csv")
ratings = pd.read_csv("ratings.csv")

merged = pd.merge(details, ratings, how='left', left_on='id', right_on='id')

cursor.execute("START TRANSACTION;")

cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
opTracker = 0

for _, row in merged.iterrows():
    print(opTracker)
    opTracker += 1
    game_id = int(row['id'])
    name = row['primary'].replace("'", "\'")
    desc = row['description'].replace("'", "\'") if pd.notna(row['description']) else ''
    year = int(row['yearpublished']) if pd.notna(row['yearpublished']) else None
    minp = int(row['minplayers']) if pd.notna(row['minplayers']) else None
    maxp = int(row['maxplayers']) if pd.notna(row['maxplayers']) else None
    pt = int(row['playingtime']) if pd.notna(row['playingtime']) else None
    minpt = int(row['minplaytime']) if pd.notna(row['minplaytime']) else None
    maxpt = int(row['maxplaytime']) if pd.notna(row['maxplaytime']) else None
    minage = int(row['minage']) if pd.notna(row['minage']) else None
    trading = int(row['trading']) if pd.notna(row['trading']) else None
    wishing = int(row['wishing']) if pd.notna(row['wishing']) else None
    average = float(row['average']) if pd.notna(row['average']) else None
    nbRates = int(row['users_rated']) if pd.notna(row['users_rated']) else None
    imgURL = row['thumbnail'].replace("'", "\'") if pd.notna(row['thumbnail']) else None
    BGGUrl = row['url'].replace("'", "\'") if pd.notna(row['url']) else None
    centimes = random.randint(0, 3)
    if centimes == 0:
        centimes = 0
    elif centimes == 1:
        centimes = 50
    elif centimes == 2:
        centimes = 1
    elif centimes == 3:
        centimes = 10
    random_price = random.randint(10, 100) - centimes/10

    # Insertion dans la table game
    if not cursor.execute("SELECT 1 FROM game WHERE ID = %s", (game_id,)):
      cursor.execute("""
          INSERT INTO game (ID, name, description, year_, minplayer, maxplayer, playtime, minplaytime, maxplaytime, minage, trading, wishing, average, nbrates, imageurl, bggurl, price)
          VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
      """, (game_id, name, desc, year, minp, maxp, pt, minpt, maxpt, minage, trading, wishing, average, nbRates, imgURL, BGGUrl, random_price))
      print("inserted")

      # Insertion dans la table designer
      if pd.notna(row['boardgamedesigner']):
          for dev in extract_list(row.get('boardgamedesigner', '[]')):
              cursor.execute("INSERT IGNORE INTO designer (name) VALUES (%s)", (dev,))
              cursor.execute("SELECT ID FROM designer WHERE name = %s", (dev,))
              result = cursor.fetchone()
              if result:
                  designer_id = result[0]
                  # Vérification avant insertion dans la table de liaison
                  cursor.execute("SELECT 1 FROM create_ WHERE GameID = %s AND DesignerID = %s", (game_id, designer_id))
                  if not cursor.fetchone():
                      cursor.execute("INSERT IGNORE INTO create_ (GameID, DesignerID) VALUES (%s, %s)", (game_id, designer_id))
      
      # Insertion dans la table artist
      if pd.notna(row['boardgameartist']):
          for artist in extract_list(row.get('boardgameartist', '[]')):
              cursor.execute("INSERT IGNORE INTO artist (name) VALUES (%s)", (artist,))
              cursor.execute("SELECT ID FROM artist WHERE name = %s", (artist,))
              result = cursor.fetchone()
              if result:
                  artist_id = result[0]
                  # Vérification avant insertion dans la table de liaison
                  cursor.execute("SELECT 1 FROM illustrate WHERE GameID = %s AND artistid = %s", (game_id, artist_id))
                  if not cursor.fetchone():
                      cursor.execute("INSERT IGNORE INTO illustrate (GameID, artistid) VALUES (%s, %s)", (game_id, artist_id))
      
      # Insertion dans la table publisher
      if pd.notna(row['boardgamepublisher']):
          for pub in extract_list(row.get('boardgamepublisher', '[]')):
              cursor.execute("INSERT IGNORE INTO publisher (name) VALUES (%s)", (pub,))
              cursor.execute("SELECT ID FROM publisher WHERE name = %s", (pub,))
              result = cursor.fetchone()
              if result:
                  publisher_id = result[0]
                  # Vérification avant insertion dans la table de liaison
                  cursor.execute("SELECT 1 FROM publish WHERE GameID = %s AND publisherid = %s", (game_id, publisher_id))
                  if not cursor.fetchone():
                      cursor.execute("INSERT IGNORE INTO publish (GameID, publisherid) VALUES (%s, %s)", (game_id, publisher_id))
      
      # Insertion dans la table mechanic
      if pd.notna(row['boardgamemechanic']):
          for mec in extract_list(row.get('boardgamemechanic', '[]')):
              cursor.execute("INSERT IGNORE INTO Mechanic (name) VALUES (%s)", (mec,))
              cursor.execute("SELECT ID FROM Mechanic WHERE name = %s", (mec,))
              result = cursor.fetchone()
              if result:
                  mec_id = result[0]
                  # Vérification avant insertion dans la table de liaison
                  cursor.execute("SELECT 1 FROM Use_ WHERE GameID = %s AND mechanicid = %s", (game_id, mec_id))
                  if not cursor.fetchone():
                      cursor.execute("INSERT IGNORE INTO Use_ (GameID, mechanicid) VALUES (%s, %s)", (game_id, mec_id))
      
      # Insertion dans la table expansion
      if pd.notna(row['boardgameexpansion']):
          for exp in extract_list(row.get('boardgameexpansion', '[]')):
              cursor.execute("INSERT IGNORE INTO expansion (name) VALUES (%s)", (exp,))
              cursor.execute("SELECT ID FROM expansion WHERE name = %s", (exp,))
              result = cursor.fetchone()
              if result:
                  exp_id = result[0]
                  # Vérification avant insertion dans la table de liaison
                  cursor.execute("SELECT 1 FROM extend WHERE GameID = %s AND expansionid = %s", (game_id, exp_id))
                  if not cursor.fetchone():
                      cursor.execute("INSERT IGNORE INTO extend (GameID, expansionid) VALUES (%s, %s)", (game_id, exp_id))
      
      # Insertion dans la table category
      if pd.notna(row['boardgamecategory']):
          for cat in extract_list(row.get('boardgamecategory', '[]')):
              cursor.execute("INSERT IGNORE INTO category (name) VALUES (%s)", (cat,))
              cursor.execute("SELECT ID FROM category WHERE name = %s", (cat,))
              result = cursor.fetchone()
              if result:
                  cat_id = result[0]
                  # Vérification avant insertion dans la table de liaison
                  cursor.execute("SELECT 1 FROM belong WHERE GameID = %s AND CategoryID = %s", (game_id, cat_id))
                  if not cursor.fetchone():
                      cursor.execute("INSERT IGNORE INTO belong (GameID, CategoryID) VALUES (%s, %s)", (game_id, cat_id))
      
      # Insertion dans la table family
      if pd.notna(row['boardgamefamily']):
          for fam in extract_list(row.get('boardgamefamily', '[]')):
              cursor.execute("INSERT IGNORE INTO familly (name) VALUES (%s)", (fam,))
              cursor.execute("SELECT ID FROM familly WHERE name = %s", (fam,))
              result = cursor.fetchone()
              if result:
                  fam_id = result[0]
                  # Vérification avant insertion dans la table de liaison
                  cursor.execute("SELECT 1 FROM belongfamily WHERE GameID = %s AND FamillyID = %s", (game_id, fam_id))
                  if not cursor.fetchone():
                      cursor.execute("INSERT IGNORE INTO belongfamily (GameID, FamillyID) VALUES (%s, %s)", (game_id, fam_id))
      
      # Insertion dans la table implementation
      if pd.notna(row['boardgameimplementation']):
          for impl in extract_list(row.get('boardgameimplementation', '[]')):
              cursor.execute("INSERT IGNORE INTO implementation (name) VALUES (%s)", (impl,))
              cursor.execute("SELECT ID FROM implementation WHERE name = %s", (impl,))
              result = cursor.fetchone()
              if result:
                  impl_id = result[0]
                  # Vérification avant insertion dans la table de liaison
                  cursor.execute("SELECT 1 FROM implement WHERE GameID = %s AND ImplementationID = %s", (game_id, impl_id))
                  if not cursor.fetchone():
                      cursor.execute("INSERT IGNORE INTO implement (GameID, ImplementationID) VALUES (%s, %s)", (game_id, impl_id))

cursor.execute("COMMIT;")

cnx.commit()
cursor.close()
cnx.close()
print("Import terminé avec succès !")
