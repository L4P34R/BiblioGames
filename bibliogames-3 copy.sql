USE railway;

-- Créer une table temporaire contenant les GameID valides
CREATE TEMPORARY TABLE valid_game_ids (ID INT PRIMARY KEY);
INSERT INTO valid_game_ids (ID)
SELECT ID FROM Game;

-- Supprimer les lignes orphelines dans Rating, GameOffer, GameUpdates
DELETE FROM Rating WHERE GameID NOT IN (SELECT ID FROM valid_game_ids);
DELETE FROM GameOffer WHERE GameID NOT IN (SELECT ID FROM valid_game_ids);
DELETE FROM GameUpdates WHERE GameID NOT IN (SELECT ID FROM valid_game_ids);

-- Supprimer la table temporaire
DROP TEMPORARY TABLE valid_game_ids;



-- Nettoyage des lignes orphelines liées aux jeux qui ne sont pas dans game
DELETE FROM Implement WHERE GameID NOT IN (SELECT ID FROM Game);
DELETE FROM BelongFamily WHERE GameID NOT IN (SELECT ID FROM Game);
DELETE FROM Belong WHERE GameID NOT IN (SELECT ID FROM Game);
DELETE FROM Publish WHERE GameID NOT IN (SELECT ID FROM Game);
DELETE FROM Create_ WHERE GameID NOT IN (SELECT ID FROM Game);
DELETE FROM Illustrate WHERE GameID NOT IN (SELECT ID FROM Game);
DELETE FROM Extend WHERE GameID NOT IN (SELECT ID FROM Game);
DELETE FROM Use_ WHERE GameID NOT IN (SELECT ID FROM Game);
DELETE FROM GameOffer WHERE GameID NOT IN (SELECT ID FROM Game);
DELETE FROM Rating WHERE GameID NOT IN (SELECT ID FROM Game);
DELETE FROM GameUpdates WHERE GameID NOT IN (SELECT ID FROM Game);


-- --------------------------------------------------------

--
-- Structure de la vue `newgames`
--
DROP TABLE IF EXISTS `newgames`;
DROP TABLE IF EXISTS `NewGames`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `NewGames` AS
SELECT `Game`.`ID` AS `ID`, `Game`.`Name` AS `Name`, `Game`.`Price` AS `Price`, `Game`.`Average` AS `Average`, `Game`.`ImageUrl` AS `ImageUrl`
FROM `Game`
WHERE `Game`.`Price` IS NOT NULL;

-- --------------------------------------------------------

--
-- Structure de la vue `productreview`
--
DROP TABLE IF EXISTS `productreview`;
DROP TABLE IF EXISTS `ProductReview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `ProductReview` AS
SELECT `r`.`ID` AS `ID`, `r`.`GameID` AS `GameID`, `r`.`Note` AS `Note`, `r`.`Review` AS `Review`, `r`.`Date` AS `Date`, `u`.`UserName` AS `UserName`
FROM `Rating` AS `r`
JOIN `User_` AS `u` ON `u`.`ID` = `r`.`UserID`
ORDER BY `r`.`Date` DESC;

-- --------------------------------------------------------

--
-- Structure de la vue `reviewcard`
--
DROP TABLE IF EXISTS `reviewcard`;
DROP TABLE IF EXISTS `ReviewCard`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `ReviewCard` AS
SELECT `Rating`.`ID` AS `ID`, `Rating`.`Note` AS `Note`, `Rating`.`Review` AS `Review`, `User_`.`UserName` AS `UserName`
FROM `Rating`
JOIN `User_` ON `User_`.`ID` = `Rating`.`UserID`
WHERE `Rating`.`Review` IS NOT NULL
ORDER BY `Rating`.`Date` DESC;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Artist`
--
ALTER TABLE `Artist`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Belong`
--
ALTER TABLE `Belong`
  ADD PRIMARY KEY (`GameID`,`CategoryID`),
  ADD KEY `CategoryID` (`CategoryID`),
  ADD KEY `idx_game_id_belong` (`GameID`),
  ADD KEY `idx_category_id_belong` (`CategoryID`);

--
-- Index pour la table `BelongFamily`
--
ALTER TABLE `BelongFamily`
  ADD PRIMARY KEY (`GameID`,`FamillyID`),
  ADD KEY `FamillyID` (`FamillyID`),
  ADD KEY `idx_game_id_belongfamily` (`GameID`),
  ADD KEY `idx_family_id_belongfamily` (`FamillyID`);

--
-- Index pour la table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Create_`
--
ALTER TABLE `Create_`
  ADD PRIMARY KEY (`GameID`,`DesignerID`),
  ADD KEY `DesignerID` (`DesignerID`),
  ADD KEY `idx_game_id_create` (`GameID`),
  ADD KEY `idx_designer_id_create` (`DesignerID`);

--
-- Index pour la table `Designer`
--
ALTER TABLE `Designer`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Expansion`
--
ALTER TABLE `Expansion`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Extend`
--
ALTER TABLE `Extend`
  ADD PRIMARY KEY (`GameID`,`ExpansionID`),
  ADD KEY `ExpansionID` (`ExpansionID`),
  ADD KEY `idx_game_id_extend` (`GameID`),
  ADD KEY `idx_expansion_id_extend` (`ExpansionID`);

--
-- Index pour la table `Familly`
--
ALTER TABLE `Familly`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Game`
--
ALTER TABLE `Game`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `idx_game_year` (`Year_`),
  ADD KEY `idx_game_avg` (`Average`),
  ADD KEY `idx_game_price` (`Price`);

--
-- Index pour la table `GameOffer`
--
ALTER TABLE `GameOffer`
  ADD PRIMARY KEY (`GameID`,`UserID`),
  ADD UNIQUE KEY `OfferID` (`OfferID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `idx_game_id_offer` (`GameID`),
  ADD KEY `idx_user_id_offer` (`UserID`);

--
-- Index pour la table `GameUpdates`
--
ALTER TABLE `GameUpdates`
  ADD PRIMARY KEY (`UpdateID`),
  ADD KEY `GameID` (`GameID`);

--
-- Index pour la table `Illustrate`
--
ALTER TABLE `Illustrate`
  ADD PRIMARY KEY (`GameID`,`ArtistID`),
  ADD KEY `ArtistID` (`ArtistID`),
  ADD KEY `idx_game_id_illustrate` (`GameID`),
  ADD KEY `idx_artist_id_illustrate` (`ArtistID`);

--
-- Index pour la table `Implement`
--
ALTER TABLE `Implement`
  ADD PRIMARY KEY (`GameID`,`ImplementationID`),
  ADD KEY `ImplementationID` (`ImplementationID`),
  ADD KEY `idx_game_id_implement` (`GameID`),
  ADD KEY `idx_impl_id_implement` (`ImplementationID`);

--
-- Index pour la table `Implementation`
--
ALTER TABLE `Implementation`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Mechanic`
--
ALTER TABLE `Mechanic`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Publish`
--
ALTER TABLE `Publish`
  ADD PRIMARY KEY (`GameID`,`PublisherID`),
  ADD KEY `PublisherID` (`PublisherID`),
  ADD KEY `idx_game_id_publish` (`GameID`),
  ADD KEY `idx_publisher_id_publish` (`PublisherID`);

--
-- Index pour la table `Publisher`
--
ALTER TABLE `Publisher`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Rating`
--
ALTER TABLE `Rating`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `GameID` (`GameID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `idx_game_id_rating` (`GameID`),
  ADD KEY `idx_user_id_rating` (`UserID`);

--
-- Index pour la table `User_`
--
ALTER TABLE `User_`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `UserName` (`UserName`);

--
-- Index pour la table `Use_`
--
ALTER TABLE `Use_`
  ADD PRIMARY KEY (`GameID`,`MechanicID`),
  ADD KEY `MechanicID` (`MechanicID`),
  ADD KEY `idx_game_id_use` (`GameID`),
  ADD KEY `idx_mechanic_id_use` (`MechanicID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Artist`
--
ALTER TABLE `Artist`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43149;

--
-- AUTO_INCREMENT pour la table `Category`
--
ALTER TABLE `Category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65503;

--
-- AUTO_INCREMENT pour la table `Designer`
--
ALTER TABLE `Designer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32995;

--
-- AUTO_INCREMENT pour la table `Expansion`
--
ALTER TABLE `Expansion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57623;

--
-- AUTO_INCREMENT pour la table `Familly`
--
ALTER TABLE `Familly`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62942;

--
-- AUTO_INCREMENT pour la table `Game`
--
ALTER TABLE `Game`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=350993;

--
-- AUTO_INCREMENT pour la table `GameOffer`
--
ALTER TABLE `GameOffer`
  MODIFY `OfferID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `GameUpdates`
--
ALTER TABLE `GameUpdates`
  MODIFY `UpdateID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `Implementation`
--
ALTER TABLE `Implementation`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11285;

--
-- AUTO_INCREMENT pour la table `Mechanic`
--
ALTER TABLE `Mechanic`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79567;

--
-- AUTO_INCREMENT pour la table `Publisher`
--
ALTER TABLE `Publisher`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96325;

--
-- AUTO_INCREMENT pour la table `Rating`
--
ALTER TABLE `Rating`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `User_`
--
ALTER TABLE `User_`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Belong`
--
ALTER TABLE `Belong`
  ADD CONSTRAINT `belong_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
  ADD CONSTRAINT `belong_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`ID`);

--
-- Contraintes pour la table `BelongFamily`
--
ALTER TABLE `BelongFamily`
  ADD CONSTRAINT `belongfamily_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
  ADD CONSTRAINT `belongfamily_ibfk_2` FOREIGN KEY (`FamillyID`) REFERENCES `Familly` (`ID`);

--
-- Contraintes pour la table `Create_`
--
ALTER TABLE `Create_`
  ADD CONSTRAINT `create__ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
  ADD CONSTRAINT `create__ibfk_2` FOREIGN KEY (`DesignerID`) REFERENCES `Designer` (`ID`);

--
-- Contraintes pour la table `Extend`
--
ALTER TABLE `Extend`
  ADD CONSTRAINT `extend_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
  ADD CONSTRAINT `extend_ibfk_2` FOREIGN KEY (`ExpansionID`) REFERENCES `Expansion` (`ID`);

--
-- Contraintes pour la table `GameOffer`
--
ALTER TABLE `GameOffer`
  ADD CONSTRAINT `gameoffer_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
  ADD CONSTRAINT `gameoffer_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `User_` (`ID`);

--
-- Contraintes pour la table `GameUpdates`
--
ALTER TABLE `GameUpdates`
  ADD CONSTRAINT `gameupdates_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`);

--
-- Contraintes pour la table `Illustrate`
--
ALTER TABLE `Illustrate`
  ADD CONSTRAINT `illustrate_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
  ADD CONSTRAINT `illustrate_ibfk_2` FOREIGN KEY (`ArtistID`) REFERENCES `Artist` (`ID`);

--
-- Contraintes pour la table `Implement`
--
ALTER TABLE `Implement`
  ADD CONSTRAINT `implement_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
  ADD CONSTRAINT `implement_ibfk_2` FOREIGN KEY (`ImplementationID`) REFERENCES `Implementation` (`ID`);

--
-- Contraintes pour la table `Publish`
--
ALTER TABLE `Publish`
  ADD CONSTRAINT `publish_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
  ADD CONSTRAINT `publish_ibfk_2` FOREIGN KEY (`PublisherID`) REFERENCES `Publisher` (`ID`);

--
-- Contraintes pour la table `Rating`
--
ALTER TABLE `Rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `User_` (`ID`);

--
-- Contraintes pour la table `Use_`
--
ALTER TABLE `Use_`
  ADD CONSTRAINT `use__ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `Game` (`ID`),
  ADD CONSTRAINT `use__ibfk_2` FOREIGN KEY (`MechanicID`) REFERENCES `Mechanic` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
