CREATE TABLE `Game` (
    `ID` int(11) NOT NULL DEFAULT 0,
    `Name` varchar(150) NOT NULL,
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
);


CREATE TABLE `Artist` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`ID`)
);

CREATE TABLE `Illustrate` (
    `GameID` int(11) NOT NULL,
    `ArtistID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`ArtistID`),
    KEY `ArtistID` (`ArtistID`),
    CONSTRAINT `illustrate_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `illustrate_ibfk_2` FOREIGN KEY (`ArtistID`) REFERENCES `Artist` (`ID`)
);


CREATE TABLE `Designer` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`ID`)
);

CREATE TABLE `Create_` (
    `GameID` int(11) NOT NULL,
    `DesignerID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`DesignerID`),
    KEY `DesignerID` (`DesignerID`),
    CONSTRAINT `create__ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `create__ibfk_2` FOREIGN KEY (`DesignerID`) REFERENCES `Designer` (`ID`)
);


CREATE TABLE `Category` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(40) DEFAULT NULL,
    PRIMARY KEY (`ID`)
);

CREATE TABLE `Belong` (
    `GameID` int(11) NOT NULL,
    `CategoryID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`CategoryID`),
    KEY `CategoryID` (`CategoryID`),
    CONSTRAINT `belong_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `belong_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`ID`)
);


CREATE TABLE `Familly` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(80) DEFAULT NULL,
    PRIMARY KEY (`ID`)
);

CREATE TABLE `BelongFamily` (
    `GameID` int(11) NOT NULL,
    `FamillyID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`FamillyID`),
    KEY `FamillyID` (`FamillyID`),
    CONSTRAINT `belongfamily_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `belongfamily_ibfk_2` FOREIGN KEY (`FamillyID`) REFERENCES `Familly` (`ID`)
);


CREATE TABLE `Mechanic` (
 `ID` int(11) NOT NULL AUTO_INCREMENT,
 `Name` varchar(50) DEFAULT NULL,
 PRIMARY KEY (`ID`)
) 

CREATE TABLE `Use_` (
    `GameID` int(11) NOT NULL,
    `MechanicID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`MechanicID`),
    KEY `MechanicID` (`MechanicID`),
    CONSTRAINT `use__ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `use__ibfk_2` FOREIGN KEY (`MechanicID`) REFERENCES `Mechanic` (`ID`)
);


CREATE TABLE `Implementation` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(150) DEFAULT NULL,
    PRIMARY KEY (`ID`)
);

CREATE TABLE `Implement` (
    `GameID` int(11) NOT NULL,
    `ImplementationID` int(11) NOT NULL,
    PRIMARY KEY (`GameID`,`ImplementationID`),
    KEY `ImplementationID` (`ImplementationID`),
    CONSTRAINT `implement_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `implement_ibfk_2` FOREIGN KEY (`ImplementationID`) REFERENCES `Implementation` (`ID`)
);


CREATE TABLE `Expansion` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(200) DEFAULT NULL,
    PRIMARY KEY (`ID`)
);

CREATE TABLE `Extend` (
 `GameID` int(11) NOT NULL,
 `ExpansionID` int(11) NOT NULL,
 PRIMARY KEY (`GameID`,`ExpansionID`),
 KEY `ExpansionID` (`ExpansionID`),
 CONSTRAINT `extend_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
 CONSTRAINT `extend_ibfk_2` FOREIGN KEY (`ExpansionID`) REFERENCES `Expansion` (`ID`)
);


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
);

CREATE TABLE `Rating` (
    `ID` int(11) NOT NULL,
    `GameID` int(11) NOT NULL,
    `UserID` int(11) NOT NULL,
    `Note` decimal(2,1) NOT NULL,
    `Review` longtext DEFAULT NULL,
    `Date` date NOT NULL,
    PRIMARY KEY (`GameID`,`UserID`,`ID`) USING BTREE,
    KEY `UserID` (`UserID`),
    CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
    CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `User_` (`ID`)
);

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
);