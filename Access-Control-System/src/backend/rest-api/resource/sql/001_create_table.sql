USE restapi;

CREATE TABLE IF NOT EXISTS user_detail (
    id                  INT         AUTO_INCREMENT      PRIMARY KEY,
    first_name          CHAR(25)    NOT NULL,
    last_name           CHAR(25)    NOT NULL,
    email               CHAR(64)    NOT NULL UNIQUE,
    password            VARBINARY(128)    NOT NULL,
    contact_number      CHAR(15)    NOT NULL,
    updated_by          INT         NOT NULL DEFAULT 0,
    deleted             TINYINT(1)  NOT NULL DEFAULT 0,
    creation_date       DATETIME    DEFAULT CURRENT_TIMESTAMP,
    last_update         DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS user_data (
    id                  INT         AUTO_INCREMENT      PRIMARY KEY,
    user_id          CHAR(25)    NOT NULL,
	status_on_social_media TINYINT(1) NOT NULL DEFAULT 0,
	FOREIGN KEY (id) REFERENCES user_detail(id)
)ENGINE = INNODB CHARACTER SET=utf8;
