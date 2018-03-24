DROP DATABASE wegot_sidebar;
CREATE DATABASE wegot_sidebar;
USE wegot_sidebar;

CREATE TABLE restaurants(
   place_id INTEGER  NOT NULL PRIMARY KEY 
  ,lat      NUMERIC(8,4) NOT NULL
  ,lng      NUMERIC(9,4) NOT NULL
  ,address  VARCHAR(70) NOT NULL
  ,phone    VARCHAR(15) NOT NULL
  ,url      VARCHAR(30) NOT NULL
  ,website  VARCHAR(30) NOT NULL
  ,day0     VARCHAR(9) NOT NULL
  ,day1     VARCHAR(9) NOT NULL
  ,day2     VARCHAR(9) NOT NULL
  ,day3     VARCHAR(9) NOT NULL
  ,day4     VARCHAR(9) NOT NULL
  ,day5     VARCHAR(9) NOT NULL
  ,day6     VARCHAR(9) NOT NULL
);