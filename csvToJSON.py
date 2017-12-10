import csv
import json

data = []
with open('restaurants_info.csv') as f:
    for row in csv.DictReader(f):
        data.append(row)

json_data = json.dumps(data,indent=4)
file = open("restaurantsInfos.json","w")
file.write(json_data)


