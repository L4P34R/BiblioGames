import pandas as pd

details = pd.read_csv("details.csv")
ratings = pd.read_csv("ratings.csv")

merged = pd.merge(details, ratings, how='left', left_on='id', right_on='id')

# Écrire le DataFrame merged dans un nouveau fichier CSV
merged.to_csv("merged.csv", index=False)