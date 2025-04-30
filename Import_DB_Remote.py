import pandas as pd
import random
import ast
import mysql.connector
from mysql.connector import Error

def extract_list(entry):
    try:
        return [x.strip() for x in ast.literal_eval(entry) if x.strip()]
    except:
        return []

try:
    connection = mysql.connector.connect(
        host="interchange.proxy.rlwy.net",
        port=45297,
        user="root",
        password="timlDeklfyFFRQWSVjoQwJEqUvFUGTsm",
        database="railway"
    )
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)

       # Désactivation des clés étrangères
        '''cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")

        # Suppression explicite des vues SQL existantes
        views = [
            "NewGames", "ReviewCard", "ProductReview"
        ]
        for vw in views:
            cursor.execute(f"DROP VIEW IF EXISTS `{vw}`;")

        # Suppression de toutes les tables existantes
        tables = [
            "Implement", "Implementation", "BelongFamily", "Familly", "Belong", "Category", "Publish", "Publisher", "Create_", "Designer", "Illustrate", "Artist", "Extend", "Expansion", "Use_", "Mechanic", "GameOffer", "Rating", "GameUpdates", "User_", "Game"
        ]
        for tbl in tables:
            cursor.execute(f"DROP TABLE IF EXISTS `{tbl}`;")
        # Réactivation des clés étrangères
        cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")'''

except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if connection.is_connected():
        details = pd.read_csv("details.csv")
        ratings = pd.read_csv("ratings.csv")

        merged = pd.merge(details, ratings, how='left', left_on='id', right_on='id')
        
        '''cursor.execute("START TRANSACTION;")

        cursor.execute("""
        CREATE TABLE `Game` (
            `ID` int(11) NOT NULL AUTO_INCREMENT,
            `Name` text NOT NULL,
            `Description` longtext DEFAULT NULL,
            `Year_` int(11) DEFAULT NULL,
            `MinPlayer` int(11) DEFAULT NULL,
            `MaxPlayer` int(11) DEFAULT NULL,
            `PlayTime` int(11) DEFAULT NULL,
            `MinplayTime` int(11) DEFAULT NULL,
            `MaxPlayTime` int(11) DEFAULT NULL,
            `MinAge` int(11) DEFAULT NULL,
            `Trading` int(11) NOT NULL DEFAULT 0,
            `Wishing` int(11) NOT NULL DEFAULT 0,
            `Average` decimal(15,4) DEFAULT NULL,
            `NbRates` int(11) DEFAULT NULL,
            `ImageUrl` varchar(200) DEFAULT NULL,
            `BGGUrl` varchar(100) DEFAULT NULL,
            `Price` float DEFAULT NULL,
            PRIMARY KEY (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Artist` (
            `ID` int(11) NOT NULL AUTO_INCREMENT,
            `Name` varchar(100) DEFAULT NULL,
            PRIMARY KEY (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Illustrate` (
            `GameID` int(11) NOT NULL,
            `ArtistID` int(11) NOT NULL,
            PRIMARY KEY (`GameID`,`ArtistID`),
            KEY `ArtistID` (`ArtistID`),
            CONSTRAINT `illustrate_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
            CONSTRAINT `illustrate_ibfk_2` FOREIGN KEY (`ArtistID`) REFERENCES `Artist` (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Designer` (
            `ID` int(11) NOT NULL AUTO_INCREMENT,
            `Name` varchar(50) DEFAULT NULL,
            PRIMARY KEY (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Create_` (
            `GameID` int(11) NOT NULL,
            `DesignerID` int(11) NOT NULL,
            PRIMARY KEY (`GameID`,`DesignerID`),
            KEY `DesignerID` (`DesignerID`),
            CONSTRAINT `create__ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
            CONSTRAINT `create__ibfk_2` FOREIGN KEY (`DesignerID`) REFERENCES `Designer` (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Publisher` (
            `ID` int(11) NOT NULL AUTO_INCREMENT,
            `Name` varchar(50) DEFAULT NULL,
            PRIMARY KEY (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Publish` (
            `GameID` int(11) NOT NULL,
            `PublisherID` int(11) NOT NULL,
            PRIMARY KEY (`GameID`,`PublisherID`),
            KEY `PublisherID` (`PublisherID`),
            CONSTRAINT `publish_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
            CONSTRAINT `publish_ibfk_2` FOREIGN KEY (`PublisherID`) REFERENCES `Publisher` (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Category` (
            `ID` int(11) NOT NULL AUTO_INCREMENT,
            `Name` varchar(40) DEFAULT NULL,
            PRIMARY KEY (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Belong` (
            `GameID` int(11) NOT NULL,
            `CategoryID` int(11) NOT NULL,
            PRIMARY KEY (`GameID`,`CategoryID`),
            KEY `CategoryID` (`CategoryID`),
            CONSTRAINT `belong_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
            CONSTRAINT `belong_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Familly` (
            `ID` int(11) NOT NULL AUTO_INCREMENT,
            `Name` varchar(80) DEFAULT NULL,
            PRIMARY KEY (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `BelongFamily` (
            `GameID` int(11) NOT NULL,
            `FamillyID` int(11) NOT NULL,
            PRIMARY KEY (`GameID`,`FamillyID`),
            KEY `FamillyID` (`FamillyID`),
            CONSTRAINT `belongfamily_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
            CONSTRAINT `belongfamily_ibfk_2` FOREIGN KEY (`FamillyID`) REFERENCES `Familly` (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Mechanic` (
        `ID` int(11) NOT NULL AUTO_INCREMENT,
        `Name` varchar(50) DEFAULT NULL,
        PRIMARY KEY (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Use_` (
            `GameID` int(11) NOT NULL,
            `MechanicID` int(11) NOT NULL,
            PRIMARY KEY (`GameID`,`MechanicID`),
            KEY `MechanicID` (`MechanicID`),
            CONSTRAINT `use__ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
            CONSTRAINT `use__ibfk_2` FOREIGN KEY (`MechanicID`) REFERENCES `Mechanic` (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Implementation` (
            `ID` int(11) NOT NULL AUTO_INCREMENT,
            `Name` varchar(150) DEFAULT NULL,
            PRIMARY KEY (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Implement` (
            `GameID` int(11) NOT NULL,
            `ImplementationID` int(11) NOT NULL,
            PRIMARY KEY (`GameID`,`ImplementationID`),
            KEY `ImplementationID` (`ImplementationID`),
            CONSTRAINT `implement_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
            CONSTRAINT `implement_ibfk_2` FOREIGN KEY (`ImplementationID`) REFERENCES `Implementation` (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Expansion` (
            `ID` int(11) NOT NULL AUTO_INCREMENT,
            `Name` varchar(200) DEFAULT NULL,
            PRIMARY KEY (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Extend` (
        `GameID` int(11) NOT NULL,
        `ExpansionID` int(11) NOT NULL,
        PRIMARY KEY (`GameID`,`ExpansionID`),
        KEY `ExpansionID` (`ExpansionID`),
        CONSTRAINT `extend_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
        CONSTRAINT `extend_ibfk_2` FOREIGN KEY (`ExpansionID`) REFERENCES `Expansion` (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `User_` (
            `ID` int(11) NOT NULL AUTO_INCREMENT,
            `UserName` varchar(50) NOT NULL,
            `email` tinytext NOT NULL,
            `Password` tinytext NOT NULL,
            `FirstName` varchar(50) NOT NULL,
            `LastName` varchar(50) NOT NULL,
            `Birthdate` date DEFAULT NULL,
            `AccountCreationDate` datetime NOT NULL,
            `Admin` tinyint(1) NOT NULL DEFAULT 0,
            `Color` varchar(50) DEFAULT NULL,
            PRIMARY KEY (`ID`),
            UNIQUE KEY `UserName` (`UserName`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `Rating` (
            `ID` int(11) NOT NULL AUTO_INCREMENT,
            `GameID` int(11) NOT NULL,
            `UserID` int(11) NOT NULL,
            `Note` int(11) NOT NULL,
            `Review` longtext DEFAULT NULL,
            `Date` date NOT NULL,
            PRIMARY KEY (`ID`),
            KEY `GameID` (`GameID`),
            KEY `UserID` (`UserID`),
            CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
            CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `User_` (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `GameOffer` (
            `GameID` int(11) NOT NULL,
            `UserID` int(11) NOT NULL,
            `OfferID` int(11) NOT NULL AUTO_INCREMENT,
            `Price` decimal(15,2) NOT NULL,
            `Date_` date NOT NULL,
            `Damage` int(11) DEFAULT NULL,
            `About` varchar(200) DEFAULT NULL,
            PRIMARY KEY (`GameID`,`UserID`),
            UNIQUE KEY `OfferID` (`OfferID`),
            KEY `UserID` (`UserID`),
            CONSTRAINT `gameoffer_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
            CONSTRAINT `gameoffer_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `User_` (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("""
        CREATE TABLE `GameUpdates` (
            `UpdateID` int(11) NOT NULL AUTO_INCREMENT,
            `GameID` int(11) NOT NULL,
            `OldName` varchar(150) DEFAULT NULL,
            `NewName` varchar(150) DEFAULT NULL,
            `OldDescription` longtext DEFAULT NULL,
            `NewDescription` longtext DEFAULT NULL,
            `OldYear_` int(11) DEFAULT NULL,
            `NewYear_` int(11) DEFAULT NULL,
            `OldMinPlayer` int(11) DEFAULT NULL,
            `NewMinPlayer` int(11) DEFAULT NULL,
            `OldMaxPlayer` int(11) DEFAULT NULL,
            `NewMaxPlayer` int(11) DEFAULT NULL,
            `OldPlayTime` int(11) DEFAULT NULL,
            `NewPlayTime` int(11) DEFAULT NULL,
            `OldMinplayTime` int(11) DEFAULT NULL,
            `NewMinplayTime` int(11) DEFAULT NULL,
            `OldMaxPlayTime` int(11) DEFAULT NULL,
            `NewMaxPlayTime` int(11) DEFAULT NULL,
            `OldMinAge` int(11) DEFAULT NULL,
            `NewMinAge` int(11) DEFAULT NULL,
            `OldTrading` int(11) DEFAULT NULL,
            `NewTrading` int(11) DEFAULT NULL,
            `OldWishing` int(11) DEFAULT NULL,
            `NewWishing` int(11) DEFAULT NULL,
            `OldAverage` decimal(15,4) DEFAULT NULL,
            `NewAverage` decimal(15,4) DEFAULT NULL,
            `OldNbRates` int(11) DEFAULT NULL,
            `NewNbRates` int(11) DEFAULT NULL,
            `OldImageUrl` varchar(200) DEFAULT NULL,
            `NewImageUrl` varchar(200) DEFAULT NULL,
            `OldBGGUrl` varchar(100) DEFAULT NULL,
            `NewBGGUrl` varchar(100) DEFAULT NULL,
            `OldPrice` float DEFAULT NULL,
            `NewPrice` float DEFAULT NULL,
            `UpdateDate` datetime NOT NULL,
            PRIMARY KEY (`UpdateID`),
            KEY `GameID` (`GameID`),
            CONSTRAINT `gameupdates_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`)
        ) ENGINE=InnoDB;
        """)
        cursor.execute("CREATE INDEX idx_game_id_rating ON Rating(GameID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_game_id_offer ON GameOffer(GameID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_game_id_create ON Create_(GameID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_game_id_use ON Use_(GameID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_game_id_publish ON Publish(GameID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_game_id_extend ON Extend(GameID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_game_id_belong ON Belong(GameID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_game_id_belongfamily ON BelongFamily(GameID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_game_id_implement ON Implement(GameID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_game_id_illustrate ON Illustrate(GameID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_user_id_rating ON Rating(UserID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_user_id_offer ON GameOffer(UserID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_mechanic_id_use ON Use_(MechanicID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_designer_id_create ON Create_(DesignerID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_publisher_id_publish ON Publish(PublisherID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_expansion_id_extend ON Extend(ExpansionID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_category_id_belong ON Belong(CategoryID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_family_id_belongfamily ON BelongFamily(FamillyID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_impl_id_implement ON Implement(ImplementationID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_artist_id_illustrate ON Illustrate(ArtistID);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_game_year ON Game(Year_);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_game_avg ON Game(Average);")
        cursor.fetchone()
        cursor.execute("CREATE INDEX idx_game_price ON Game(Price);")
        cursor.fetchone()
        # Triggers
        cursor.execute("""
        CREATE TRIGGER `isInTable`
        BEFORE INSERT ON `User_`
        FOR EACH ROW
        BEGIN
            IF EXISTS (SELECT 1 FROM User_ WHERE email = NEW.email) THEN
                SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Email already exists';
            ELSEIF EXISTS (SELECT 1 FROM User_ WHERE UserName = NEW.UserName) THEN
                SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Username already exists';
            END IF;
        END;
        """)
        cursor.execute("""
        CREATE TRIGGER `trg_update_game_rating`
        AFTER INSERT ON `Rating`
        FOR EACH ROW
        BEGIN
            UPDATE Game
            SET
            Average = ((Average * NbRates) + NEW.Note) / (NbRates + 1),
            NbRates = NbRates + 1
            WHERE ID = NEW.GameID;
        END;
        """)
        cursor.execute("""
        CREATE TRIGGER `GameUpdate`
        BEFORE UPDATE ON `Game`
        FOR EACH ROW
        BEGIN
            INSERT INTO GameUpdates (
                GameID, OldName, NewName, OldDescription, NewDescription, OldYear_, NewYear_,
                OldMinPlayer, NewMinPlayer, OldMaxPlayer, NewMaxPlayer, OldPlayTime, NewPlayTime,
                OldMinplayTime, NewMinplayTime, OldMaxPlayTime, NewMaxPlayTime, OldMinAge, NewMinAge,
                OldTrading, NewTrading, OldWishing, NewWishing, OldAverage, NewAverage, OldNbRates,
                NewNbRates, OldImageUrl, NewImageUrl, OldBGGUrl, NewBGGUrl, OldPrice, NewPrice, UpdateDate
            )
            VALUES (
                OLD.ID, OLD.Name, NEW.Name, OLD.Description, NEW.Description, OLD.Year_, NEW.Year_,
                OLD.MinPlayer, NEW.MinPlayer, OLD.MaxPlayer, NEW.MaxPlayer, OLD.PlayTime, NEW.PlayTime,
                OLD.MinplayTime, NEW.MinplayTime, OLD.MaxPlayTime, NEW.MaxPlayTime, OLD.MinAge, NEW.MinAge,
                OLD.Trading, NEW.Trading, OLD.Wishing, NEW.Wishing, OLD.Average, NEW.Average, OLD.NbRates,
                NEW.NbRates, OLD.ImageUrl, NEW.ImageUrl, OLD.BGGUrl, NEW.BGGUrl, OLD.Price, NEW.Price, NOW()
            );
        END;
        """)
        cursor.execute("""
        CREATE TRIGGER trg_update_game_rating_after_update
        AFTER UPDATE ON Rating
        FOR EACH ROW
        BEGIN
        UPDATE Game
        SET
            Average = (
            SELECT AVG(Note)
            FROM Rating
            WHERE GameID = NEW.GameID
            ),
            NbRates = (
            SELECT COUNT(*)
            FROM Rating
            WHERE GameID = NEW.GameID
            )
        WHERE ID = NEW.GameID;
        END;
        """)
        cursor.execute("""
        CREATE TRIGGER trg_update_game_rating_after_delete
        AFTER DELETE ON Rating
        FOR EACH ROW
        BEGIN
        UPDATE Game
        SET
            Average = (
            SELECT IFNULL(AVG(Note), 0)
            FROM Rating
            WHERE GameID = OLD.GameID
            ),
            NbRates = (
            SELECT COUNT(*)
            FROM Rating
            WHERE GameID = OLD.GameID
            )
        WHERE ID = OLD.GameID;
        END;
        """)
        # Views
        cursor.execute("""
        CREATE VIEW NewGames AS
        SELECT
            Game.ID,
            Game.Name,
            Game.Price,
            Game.Average,
            Game.ImageUrl
        FROM Game
        WHERE Game.Price IS NOT NULL;
        """)
        cursor.execute("""
        CREATE VIEW ReviewCard AS
        SELECT
            Rating.ID,
            Rating.Note,
            Rating.Review,
            User_.UserName
        FROM Rating
        JOIN User_ ON User_.ID = Rating.UserID
        WHERE Rating.Review IS NOT NULL
        ORDER BY Rating.Date DESC;
        """)
        cursor.execute("""
        CREATE VIEW ProductReview AS
        SELECT
            r.ID,
            r.GameID,
            r.Note,
            r.Review,
            r.Date,
            u.UserName
        FROM Rating r
        JOIN User_ u ON u.ID = r.UserID
        ORDER BY r.Date DESC;
        """)
        cursor.execute("COMMIT;")'''

        cursor.execute("START TRANSACTION;")
        cursor.fetchall()

        cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
        cursor.fetchall()
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

            # Insertion dans la table Game
            cursor.execute("SELECT 1 FROM Game WHERE ID = %s", (game_id,))
            cursor.fetchall()
            # fetchone() already follows
            if not cursor.fetchone():
                cursor.execute("""
                INSERT INTO Game (ID, Name, Description, Year_, MinPlayer, MaxPlayer, PlayTime, MinplayTime, MaxPlayTime, MinAge, Trading, Wishing, Average, NbRates, ImageUrl, BGGUrl, Price)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (game_id, name, desc, year, minp, maxp, pt, minpt, maxpt, minage, trading, wishing, average, nbRates, imgURL, BGGUrl, random_price))
                print("inserted")

            # Insertion dans la table Designer
            if pd.notna(row['boardgamedesigner']):
                for dev in extract_list(row.get('boardgamedesigner', '[]')):
                    cursor.execute("INSERT IGNORE INTO Designer (Name) VALUES (%s)", (dev,))
                    cursor.fetchall()
                    cursor.execute("SELECT ID FROM Designer WHERE Name = %s", (dev,))
                    cursor.fetchall()
                    result = cursor.fetchone()
                    if result:
                        designer_id = result[0]
                        # Vérification avant insertion dans la table de liaison
                        cursor.execute("SELECT 1 FROM Create_ WHERE GameID = %s AND DesignerID = %s", (game_id, designer_id))
                        cursor.fetchall()
                        # fetchone() already follows
                        if not cursor.fetchone():
                            cursor.execute("INSERT IGNORE INTO Create_ (GameID, DesignerID) VALUES (%s, %s)", (game_id, designer_id))
                            cursor.fetchall()
            
            # Insertion dans la table Artist
            if pd.notna(row['boardgameartist']):
                for artist in extract_list(row.get('boardgameartist', '[]')):
                    cursor.execute("INSERT IGNORE INTO Artist (Name) VALUES (%s)", (artist,))
                    cursor.fetchall()
                    cursor.execute("SELECT ID FROM Artist WHERE Name = %s", (artist,))
                    cursor.fetchall()
                    result = cursor.fetchone()
                    if result:
                        artist_id = result[0]
                        # Vérification avant insertion dans la table de liaison
                        cursor.execute("SELECT 1 FROM Illustrate WHERE GameID = %s AND ArtistID = %s", (game_id, artist_id))
                        cursor.fetchall()
                        # fetchone() already follows
                        if not cursor.fetchone():
                            cursor.execute("INSERT IGNORE INTO Illustrate (GameID, ArtistID) VALUES (%s, %s)", (game_id, artist_id))
                            cursor.fetchall()
            
            # Insertion dans la table Publisher
            if pd.notna(row['boardgamepublisher']):
                for pub in extract_list(row.get('boardgamepublisher', '[]')):
                    cursor.execute("INSERT IGNORE INTO Publisher (Name) VALUES (%s)", (pub,))
                    cursor.fetchall()
                    cursor.execute("SELECT ID FROM Publisher WHERE Name = %s", (pub,))
                    cursor.fetchall()
                    result = cursor.fetchone()
                    if result:
                        publisher_id = result[0]
                        # Vérification avant insertion dans la table de liaison
                        cursor.execute("SELECT 1 FROM Publish WHERE GameID = %s AND PublisherID = %s", (game_id, publisher_id))
                        cursor.fetchall()
                        # fetchone() already follows
                        if not cursor.fetchone():
                            cursor.execute("INSERT IGNORE INTO Publish (GameID, PublisherID) VALUES (%s, %s)", (game_id, publisher_id))
                            cursor.fetchall()
            
            # Insertion dans la table Mechanic
            if pd.notna(row['boardgamemechanic']):
                for mec in extract_list(row.get('boardgamemechanic', '[]')):
                    cursor.execute("INSERT IGNORE INTO Mechanic (Name) VALUES (%s)", (mec,))
                    cursor.fetchall()
                    cursor.execute("SELECT ID FROM Mechanic WHERE Name = %s", (mec,))
                    cursor.fetchall()
                    result = cursor.fetchone()
                    if result:
                        mec_id = result[0]
                        # Vérification avant insertion dans la table de liaison
                        cursor.execute("SELECT 1 FROM Use_ WHERE GameID = %s AND MechanicID = %s", (game_id, mec_id))
                        cursor.fetchall()
                        # fetchone() already follows
                        if not cursor.fetchone():
                            cursor.execute("INSERT IGNORE INTO Use_ (GameID, MechanicID) VALUES (%s, %s)", (game_id, mec_id))
                            cursor.fetchall()
            
            # Insertion dans la table Expansion
            if pd.notna(row['boardgameexpansion']):
                for exp in extract_list(row.get('boardgameexpansion', '[]')):
                    cursor.execute("INSERT IGNORE INTO Expansion (Name) VALUES (%s)", (exp,))
                    cursor.fetchall()
                    cursor.execute("SELECT ID FROM Expansion WHERE Name = %s", (exp,))
                    cursor.fetchall()
                    result = cursor.fetchone()
                    if result:
                        exp_id = result[0]
                        # Vérification avant insertion dans la table de liaison
                        cursor.execute("SELECT 1 FROM Extend WHERE GameID = %s AND ExpansionID = %s", (game_id, exp_id))
                        cursor.fetchall()
                        # fetchone() already follows
                        if not cursor.fetchone():
                            cursor.execute("INSERT IGNORE INTO Extend (GameID, ExpansionID) VALUES (%s, %s)", (game_id, exp_id))
                            cursor.fetchall()
            
            # Insertion dans la table Category
            if pd.notna(row['boardgamecategory']):
                for cat in extract_list(row.get('boardgamecategory', '[]')):
                    cursor.execute("INSERT IGNORE INTO Category (Name) VALUES (%s)", (cat,))
                    cursor.fetchall()
                    cursor.execute("SELECT ID FROM Category WHERE Name = %s", (cat,))
                    cursor.fetchall()
                    result = cursor.fetchone()
                    if result:
                        cat_id = result[0]
                        # Vérification avant insertion dans la table de liaison
                        cursor.execute("SELECT 1 FROM Belong WHERE GameID = %s AND CategoryID = %s", (game_id, cat_id))
                        cursor.fetchall()
                        # fetchone() already follows
                        if not cursor.fetchone():
                            cursor.execute("INSERT IGNORE INTO Belong (GameID, CategoryID) VALUES (%s, %s)", (game_id, cat_id))
                            cursor.fetchall()
            
            # Insertion dans la table Familly
            if pd.notna(row['boardgamefamily']):
                for fam in extract_list(row.get('boardgamefamily', '[]')):
                    cursor.execute("INSERT IGNORE INTO Familly (Name) VALUES (%s)", (fam,))
                    cursor.fetchall()
                    cursor.execute("SELECT ID FROM Familly WHERE Name = %s", (fam,))
                    cursor.fetchall()
                    result = cursor.fetchone()
                    if result:
                        fam_id = result[0]
                        # Vérification avant insertion dans la table de liaison
                        cursor.execute("SELECT 1 FROM BelongFamily WHERE GameID = %s AND FamillyID = %s", (game_id, fam_id))
                        cursor.fetchall()
                        # fetchone() already follows
                        if not cursor.fetchone():
                            cursor.execute("INSERT IGNORE INTO BelongFamily (GameID, FamillyID) VALUES (%s, %s)", (game_id, fam_id))
                            cursor.fetchall()
            
            # Insertion dans la table Implementation
            if pd.notna(row['boardgameimplementation']):
                for impl in extract_list(row.get('boardgameimplementation', '[]')):
                    cursor.execute("INSERT IGNORE INTO Implementation (Name) VALUES (%s)", (impl,))
                    cursor.fetchall()
                    cursor.execute("SELECT ID FROM Implementation WHERE Name = %s", (impl,))
                    cursor.fetchall()
                    result = cursor.fetchone()
                    if result:
                        impl_id = result[0]
                        # Vérification avant insertion dans la table de liaison
                        cursor.execute("SELECT 1 FROM Implement WHERE GameID = %s AND ImplementationID = %s", (game_id, impl_id))
                        cursor.fetchall()
                        # fetchone() already follows
                        if not cursor.fetchone():
                            cursor.execute("INSERT IGNORE INTO Implement (GameID, ImplementationID) VALUES (%s, %s)", (game_id, impl_id))
                            cursor.fetchall()

        cursor.execute("COMMIT;")
        cursor.fetchall()

        cnx.commit()


        cursor.close()
        connection.close()
        print("MySQL connection is closed")
