import pandas as pd
import openpyxl
import json
import io


df = pd.read_excel('data/siglas.xlsx').reset_index(drop=True).fillna('')

df['significado'] = df['pt'].str.cat(df['en'], sep=' ')

df.drop(['pt', 'en'], axis=1, inplace=True)

data = []

for i in range(len(df)):
  row_data = {'sigla': df['sigla'].iloc[i], 'significado': df['significado'].iloc[i]}
  data.append(row_data)

siglario = json.dumps(data, ensure_ascii=False)

#json = df[['sigla', 'significado']].to_json()

print(df.columns)
print(df['significado'])
print(siglario)

json_data = df.to_json(orient='records', indent=4)

# Abrindo um arquivo para escrita no modo texto com codificação UTF-8
with io.open('data/siglario.json', 'w') as outfile:
  # Gravando o JSON codificado no arquivo
  outfile.write(json_data)