drop table if exists Users;
drop table if exists UserSession;
drop table if exists ClothingItem;
drop table if exists Category;

CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    gender VARCHAR(255),
    skinTone VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS UserSession (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_email) REFERENCES Users(email) on delete CASCADE
);

CREATE TABLE IF NOT EXISTS Category (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    main_category VARCHAR(50),
    sub_category VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS ClothingItem (
    clothing_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email VARCHAR(250) NOT NULL,
    category_id INTEGER NOT NULL,
    color VARCHAR(50),
    sleeves VARCHAR(50),
    pattern VARCHAR(50),
    style VARCHAR(50),
    lastWorn DATETIME,
    FOREIGN KEY (user_email) REFERENCES Users(email) on delete cascade,
    FOREIGN KEY (category_id) REFERENCES Category(category_id) on delete cascade
);

CREATE TABLE IF NOT EXISTS Category (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    main_category VARCHAR(50),
    sub_category VARCHAR(50)
);

INSERT INTO Category (category_id, main_category, sub_category) VALUES
(1, "TOPS", "t-shirt"),
(2, "TOPS", "shirt"),
(3, "TOPS", "blouse"),
(4, "TOPS", "crop top"),

(5, "BOTTOMS", "pants"),
(6, "BOTTOMS", "shorts"),
(7, "BOTTOMS", "skirt"),

(8, "ONEPIECE", "jumpsuit"),
(9, "ONEPIECE", "dress"),
(10, "ONEPIECE", "suit"),
(11, "ONEPIECE", "overalls"),

(12, "SHOES", "sneakers"),
(13, "SHOES", "heels"),
(14, "SHOES", "dress shoes"),
(15, "SHOES", "boots"),

(16, "JUMPERS", "jumper"),
(17, "Dresses", "formal"),
(18, "Dresses", "formal"),
(19, "Dresses", "formal"),

(20, "JACKETS", "jacket"),
(21, "JACKETS", "blazer"),
(22, "JACKETS", "raincoat"),
(23, "JACKETS", "trenchcoat"),

(24, "SWIMWEAR", "onepiece"),
(25, "SWIMWEAR", "bikini"),
(26, "SWIMWEAR", "trunks"),
(27, "SWIMWEAR", "speedo"),

(28, "ACCESSORIES", "hat"),
(29, "ACCESSORIES", "glasses"),
(30, "ACCESSORIES", "scarf"),
(31, "ACCESSORIES", "gloves");

insert into Users(email, firstName, lastName, password, location, gender, skinTone) VALUES
("test@test.test", "test", "test", "test","Auckland","male","neutral");
