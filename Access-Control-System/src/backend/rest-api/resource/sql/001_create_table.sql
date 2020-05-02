USE Access_Control_List;

CREATE TABLE IF NOT EXISTS user_type_domain (
    utypeid                  INT         AUTO_INCREMENT      PRIMARY KEY,
    description          CHAR(25)    NOT NULL
)ENGINE = INNODB CHARACTER SET=utf8;


CREATE TABLE IF NOT EXISTS access_domain (
    access_id       INT         AUTO_INCREMENT      PRIMARY KEY,
	description		CHAR(25)	NOT NULL
)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS user_access_domain (
    user_access_id                  INT         AUTO_INCREMENT      PRIMARY KEY,
    utypeid     INT    NOT NULL,
	access_id	INT		NOT NULL,
	status_on_social_media TINYINT(1) NOT NULL DEFAULT 0,
	FOREIGN KEY (utypeid) REFERENCES user_type_domain(utypeid),
	FOREIGN KEY (access_id) REFERENCES access_domain(access_id)
)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS resource_type_domain (
    resource_type_id   INT     AUTO_INCREMENT      PRIMARY KEY,
    description   CHAR(25)    NOT NULL
)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS resource_info (
    id   INT     AUTO_INCREMENT      PRIMARY KEY,
	resource_type_id	INT NOT NULL,
	resource_name CHAR(255) NOT NULL,
	location	CHAR(255) NOT NULL,
	deleted             TINYINT(1)  NOT NULL DEFAULT 0,
    creation_date       DATETIME    DEFAULT CURRENT_TIMESTAMP,
    last_update         DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (resource_type_id) REFERENCES resource_type_domain(resource_type_id)
)ENGINE = INNODB CHARACTER SET=utf8;


CREATE TABLE IF NOT EXISTS group_info (
    gid                  INT         AUTO_INCREMENT      PRIMARY KEY,
    group_name          CHAR(25)    NOT NULL, 
	access_id				INT,
	deleted             TINYINT(1)  NOT NULL DEFAULT 0,
    creation_date       DATETIME    DEFAULT CURRENT_TIMESTAMP,
    last_update         DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (access_id) REFERENCES access_domain(access_id)

)ENGINE = INNODB CHARACTER SET=utf8;


CREATE TABLE IF NOT EXISTS user_detail (
    id                  INT         AUTO_INCREMENT      PRIMARY KEY,
    first_name          CHAR(25)    NOT NULL,
    last_name           CHAR(25)    NOT NULL,
    email               CHAR(64)    NOT NULL UNIQUE,
    password            VARBINARY(255)    NOT NULL,
    contact_number      CHAR(15)    NOT NULL,
	user_access_id		INT,
    updated_by          INT         NOT NULL DEFAULT 0,
    deleted             TINYINT(1)  NOT NULL DEFAULT 0,
    creation_date       DATETIME    DEFAULT CURRENT_TIMESTAMP,
	last_update         DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_access_id) REFERENCES user_access_domain(user_access_id)
)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS group_user (
    gid                  INT         AUTO_INCREMENT      PRIMARY KEY,
    user_id          	INT    NOT NULL,
	user_access_id		INT,
	creation_date       DATETIME    DEFAULT CURRENT_TIMESTAMP,
	last_update         DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,	
	FOREIGN KEY (user_id) REFERENCES user_detail(id),
	FOREIGN KEY (gid) REFERENCES group_info(gid),
	FOREIGN KEY (user_access_id) REFERENCES user_access_domain(user_access_id)
)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS access_list (
    resource_id      INT NOT NULL,
    user_id          INT    NULL,
	gid				 INT 	NULL,
	access_id   INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user_detail(id),
	FOREIGN KEY (resource_id) REFERENCES resource_info(id),
	FOREIGN KEY (gid) REFERENCES group_info(gid),
	FOREIGN KEY (access_id) REFERENCES access_domain(access_id)
)ENGINE = INNODB CHARACTER SET=utf8;


