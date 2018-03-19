#!/bin/bash
for f in ./data/*.csv
do
    time mysql -e "load data local infile '"$f"' into table restaurants fields TERMINATED BY '^' LINES TERMINATED BY '\n'"  -u root wegot_sidebar --local-infile
done