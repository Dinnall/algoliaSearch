import csv 
import sys
 
with open("restaurants_info.csv", 'rb') as csvfile:
     restaurant = csv.reader(csvfile, delimiter=',', quotechar='|')
     for row in restaurant:
         print ', '.join(row)
