DROP DATABASE wegot_sidebar;
CREATE DATABASE wegot_sidebar;
USE wegot_sidebar;

CREATE TABLE restaurants(
   open_now     VARCHAR(5) NOT NULL
  ,periods      VARCHAR(456) NOT NULL
  ,weekday_text VARCHAR(189) NOT NULL
  ,lat          NUMERIC(8,4) NOT NULL
  ,lng          NUMERIC(9,4) NOT NULL
  ,address      VARCHAR(55) NOT NULL
  ,phone        VARCHAR(15) NOT NULL
  ,name         VARCHAR(30) NOT NULL
  ,place_id     INTEGER  NOT NULL PRIMARY KEY
  ,url          VARCHAR(19) NOT NULL
  ,website      VARCHAR(20) NOT NULL
);