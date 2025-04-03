import ast
import random
import mysql.connector
from mysql.connector import errorcode

config = {
    'user': 'root',
    'password': '1JZX100Chaser',
    'host': 'localhost',
    'database': 'bibliogames',
    'raise_on_warnings': True
}

try:
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor(buffered=True)
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Access denied: incorrect username/password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)
    exit()

try:
    cursor.execute("SELECT id FROM game")
    game_ids = cursor.fetchall()

    opTracker = 0

    for game_id in game_ids:
        print(opTracker)
        opTracker += 1
        centimes = random.randint(0, 3)
        if centimes == 0:
            centimes = 0
        elif centimes == 1:
            centimes = 50
        elif centimes == 2:
            centimes = 1
        elif centimes == 3:
            centimes = 10
        random_price = random.randint(10, 100) - centimes/10 # Prix aléatoire entre 10 et 100
        cursor.execute("UPDATE game SET price = %s WHERE id = %s", (random_price, game_id[0]))

    cnx.commit()
    print("Prices have been successfully updated.")
except mysql.connector.Error as err:
    print(f"Error: {err}")
finally:
    cursor.close()
    cnx.close()
    print("Database connection closed.")