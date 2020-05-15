DROP DATABASE IF EXISTS Access_Control_List;

CREATE DATABASE Access_Control_List;

USE Access_Control_List;

CREATE TABLE IF NOT EXISTS permission_bit (
	id 	INT NOT NULL PRIMARY KEY,
	p_read TINYINT(1)  NOT NULL DEFAULT 0,
	p_write TINYINT(1)  NOT NULL DEFAULT 0
)ENGINE = INNODB CHARACTER SET=utf8;


CREATE TABLE IF NOT EXISTS resource_type_domain (
    id   INT  PRIMARY KEY,
    description   VARCHAR(25)    NOT NULL
)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS group_info (
    id                  INT         AUTO_INCREMENT      PRIMARY KEY,
    group_name          VARCHAR(25)    NOT NULL, 
	creation_date       DATETIME    DEFAULT CURRENT_TIMESTAMP,
    last_update         DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS user_detail (
    id                  INT         AUTO_INCREMENT      PRIMARY KEY,
	first_name          VARCHAR(25)    NOT NULL,
    last_name           VARCHAR(25)    NOT NULL,
    username			VARCHAR(25)  NOT NULL UNIQUE,
	email               VARCHAR(64)    NOT NULL UNIQUE,
    password            VARBINARY(255)    NOT NULL,
	is_sudo_access		TINYINT(1)  NOT NULL DEFAULT 0,
    creation_date       DATETIME    DEFAULT CURRENT_TIMESTAMP,
	last_update         DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS resource_info (
    id   INT     AUTO_INCREMENT      PRIMARY KEY,
	resource_type_id	INT NOT NULL,
	parent_resource_id	INT NOT NULL,
	resource_name CHAR(255) NOT NULL,
	location	CHAR(255) NOT NULL,
	owner		INT NOT NULL,
    creation_date       DATETIME    DEFAULT CURRENT_TIMESTAMP,
    last_update         DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEy (owner)	REFERENCES user_detail(id),
	FOREIGN KEY (resource_type_id) REFERENCES resource_type_domain(id),
	UNIQUE (parent_resource_id,resource_name)
)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS group_user (
    id                 INT NOT NULL,
    user_id          	INT    NOT NULL,
	creation_date       DATETIME    DEFAULT CURRENT_TIMESTAMP,
	last_update         DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,	
	FOREIGN KEY (user_id) REFERENCES user_detail(id),
	FOREIGN KEY (id) REFERENCES group_info(id),
	PRIMARY KEY (id,user_id)

)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS user_access_entry (
    resource_id      INT NOT NULL,
    id          INT   NOT NULL,
	pid   INT NOT NULL,/*Access on file like read,write,all,etc.*/
	FOREIGN KEY (id) REFERENCES user_detail(id),
	FOREIGN KEY (resource_id) REFERENCES resource_info(id),
	FOREIGN KEY (pid) REFERENCES permission_bit(id),
	PRIMARY KEY (resource_id,id)
)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS group_access_entry (
    resource_id      INT NOT NULL,
    id          INT   NOT NULL,/*Group Id*/
	pid   INT NOT NULL,/*Access on file like read,write,all,etc.*/
	FOREIGN KEY (id) REFERENCES group_info(id),
	FOREIGN KEY (resource_id) REFERENCES resource_info(id),
	FOREIGN KEY (pid) REFERENCES permission_bit(id),
	PRIMARY KEY (resource_id,id)
)ENGINE = INNODB CHARACTER SET=utf8;
