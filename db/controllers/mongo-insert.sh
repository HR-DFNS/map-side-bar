#!/bin/bash
  time mongoimport --numInsertionWorkers 2 --db wegot-sidebar --collection restaurants --drop --type json --file ./data/data-part-1.json --jsonArray
for i in '2' '3' '4' '5' '6' '7' '8' '9' '10'
do
  time mongoimport --numInsertionWorkers 2 --db wegot-sidebar --collection restaurants --type json --file ./data/data-part-${i}.json --jsonArray
done