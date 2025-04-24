START TRANSACTION;

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

CREATE TABLE `Artist` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Illustrate` (
    `GameID` int(11) NOT NULL,
    `ArtistID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`ArtistID`),
    KEY `ArtistID` (`ArtistID`),
    CONSTRAINT `illustrate_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `illustrate_ibfk_2` FOREIGN KEY (`ArtistID`) REFERENCES `Artist` (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Designer` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Create_` (
    `GameID` int(11) NOT NULL,
    `DesignerID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`DesignerID`),
    KEY `DesignerID` (`DesignerID`),
    CONSTRAINT `create__ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `create__ibfk_2` FOREIGN KEY (`DesignerID`) REFERENCES `Designer` (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Publisher` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Publish` (
    `GameID` int(11) NOT NULL,
    `PublisherID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`PublisherID`),
    KEY `PublisherID` (`PublisherID`),
    CONSTRAINT `publish_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `publish_ibfk_2` FOREIGN KEY (`PublisherID`) REFERENCES `Publisher` (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Category` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(40) DEFAULT NULL,
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Belong` (
    `GameID` int(11) NOT NULL,
    `CategoryID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`CategoryID`),
    KEY `CategoryID` (`CategoryID`),
    CONSTRAINT `belong_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `belong_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Familly` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(80) DEFAULT NULL,
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `BelongFamily` (
    `GameID` int(11) NOT NULL,
    `FamillyID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`FamillyID`),
    KEY `FamillyID` (`FamillyID`),
    CONSTRAINT `belongfamily_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `belongfamily_ibfk_2` FOREIGN KEY (`FamillyID`) REFERENCES `Familly` (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Mechanic` (
 `ID` int(11) NOT NULL AUTO_INCREMENT,
 `Name` varchar(50) DEFAULT NULL,
 PRIMARY KEY (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Use_` (
    `GameID` int(11) NOT NULL,
    `MechanicID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`MechanicID`),
    KEY `MechanicID` (`MechanicID`),
    CONSTRAINT `use__ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `use__ibfk_2` FOREIGN KEY (`MechanicID`) REFERENCES `Mechanic` (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Implementation` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(150) DEFAULT NULL,
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Implement` (
    `GameID` int(11) NOT NULL,
    `ImplementationID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`ImplementationID`),
    KEY `ImplementationID` (`ImplementationID`),
    CONSTRAINT `implement_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `implement_ibfk_2` FOREIGN KEY (`ImplementationID`) REFERENCES `Implementation` (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Expansion` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(200) DEFAULT NULL,
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB;

CREATE TABLE `Extend` (
 `GameID` int(11) NOT NULL,
 `ExpansionID` int(11) NOT NULL,
 PRIMARY KEY (`GameID`,`ExpansionID`),
 KEY `ExpansionID` (`ExpansionID`),
 CONSTRAINT `extend_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
 CONSTRAINT `extend_ibfk_2` FOREIGN KEY (`ExpansionID`) REFERENCES `Expansion` (`ID`)
) ENGINE=InnoDB;

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

-- Index pour les relations entre les jeux et leurs entités associées
CREATE INDEX idx_game_id_rating ON Rating(GameID);
CREATE INDEX idx_game_id_offer ON GameOffer(GameID);
CREATE INDEX idx_game_id_create ON Create_(GameID);
CREATE INDEX idx_game_id_use ON Use_(GameID);
CREATE INDEX idx_game_id_publish ON Publish(GameID);
CREATE INDEX idx_game_id_extend ON Extend(GameID);
CREATE INDEX idx_game_id_belong ON Belong(GameID);
CREATE INDEX idx_game_id_belongfamily ON BelongFamily(GameID);
CREATE INDEX idx_game_id_implement ON Implement(GameID);
CREATE INDEX idx_game_id_illustrate ON Illustrate(GameID);

-- Index inverses (secondaires) sur les clés étrangères pointant vers les autres entités
CREATE INDEX idx_user_id_rating ON Rating(UserID);
CREATE INDEX idx_user_id_offer ON GameOffer(UserID);

CREATE INDEX idx_mechanic_id_use ON Use_(MechanicID);
CREATE INDEX idx_designer_id_create ON Create_(DesignerID);
CREATE INDEX idx_publisher_id_publish ON Publish(PublisherID);
CREATE INDEX idx_expansion_id_extend ON Extend(ExpansionID);
CREATE INDEX idx_category_id_belong ON Belong(CategoryID);
CREATE INDEX idx_family_id_belongfamily ON BelongFamily(FamillyID);
CREATE INDEX idx_impl_id_implement ON Implement(ImplementationID);
CREATE INDEX idx_artist_id_illustrate ON Illustrate(ArtistID);

-- Index sur les champs souvent filtrés dans des recherches ou tris
CREATE INDEX idx_game_name ON Game(Name);
CREATE INDEX idx_game_year ON Game(Year_);
CREATE INDEX idx_game_avg ON Game(Average);
CREATE INDEX idx_game_price ON Game(Price);

-- Déclancheurs:
DELIMITER //

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
//


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
//

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
//


DELIMITER ;

CREATE VIEW NewGames AS
SELECT
    ID,
    Name,
    Price,
    Average,
    ImageUrl
FROM Game
WHERE Price IS NOT NULL;

CREATE VIEW ReviewCard AS
SELECT
	Note,
    Review,
    User_.UserName
FROM Rating
JOIN User_ ON User_.ID = UserID
WHERE Review IS NOT NULL
ORDER BY Date DESC;

COMMIT; 