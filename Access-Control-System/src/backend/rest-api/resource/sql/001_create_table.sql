USE Access_Control_List;

/*This table is created to provide generality to the system by defining type of users domain,
So that invalid type of users couldn't be added.
For example :- 
	insert into user_type_domain values(1,'Root Admin')
	insert into user_type_domain values(2,'Resource Admin')
	insert into user_type_domain values(3,'Group Admin')
	insert into user_type_domain values(4,'Visitor')
	So on.
			   
*/
CREATE TABLE IF NOT EXISTS user_type_domain (
    utypeid                  INT         AUTO_INCREMENT      PRIMARY KEY,
    description          CHAR(25)    NOT NULL
)ENGINE = INNODB CHARACTER SET=utf8;

/*This table is created to provide generality to the system by defining access domain,
So that new access policy in future can be added.
For example :- 
	insert into access_domain values(1,'read')
	insert into access_domain values(2,'write')
	insert into access_domain values(3,'execute')
	insert into access_domain values(4,'all')
	insert into access_domain values(5,'read n write')
	insert into access_domain values(6,'read n execute')
	insert into access_domain values(7,'write n execute')
	So on.

*/
CREATE TABLE IF NOT EXISTS access_domain (
    access_id       INT         AUTO_INCREMENT      PRIMARY KEY,
	description		CHAR(25)	NOT NULL,

)ENGINE = INNODB CHARACTER SET=utf8;

/*This table is created to map user_type and access with id.
For example :- 
	insert into user_access_domain values(1,1,4)
	insert into user_access_domain values(2,2,2)
	insert into user_access_domain values(3,4,1)
	insert into user_access_domain values(4,3,1)
	So on.
*/
CREATE TABLE IF NOT EXISTS user_access_domain (
    user_access_id                  INT         AUTO_INCREMENT      PRIMARY KEY,
    utypeid     INT    NOT NULL,
	access_id	INT		NOT NULL,
	FOREIGN KEY (utypeid) REFERENCES user_type_domain(utypeid),
	FOREIGN KEY (access_id) REFERENCES access_domain(access_id)
)ENGINE = INNODB CHARACTER SET=utf8;

/*This table is created to generality to the database resource type.
For example :- 
	insert into resource_type_domain values(1,'File')
	insert into resource_type_domain values(2,'Folder')
	insert into resource_type_domain values(3,'Database')
	insert into resourve_type_domain values(4,'Server')
	So on.
*/

CREATE TABLE IF NOT EXISTS resource_type_domain (
    resource_type_id   INT     AUTO_INCREMENT      PRIMARY KEY,
    description   CHAR(25)    NOT NULL
)ENGINE = INNODB CHARACTER SET=utf8;

/*This table is created to resource info.
For example :- 
	insert into resource_info values(1,1,'demo_file','file_path',0,'12/12/12','')
	insert into resource_info values(2,2,'demo_folder','folder_path',0,'12/12/20','')
	insert into resource_info values(3,3,'demo_db','db_path',0,'12/12/21','')
	insert into resourve_info values(4,4,'demo_server','server_domain',0,'12/12/21','')
	So on.
*/


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

/*This table is created to hold group info.
For example :- 
	insert into group_info values(1,'g1',2,0,'','')
	insert into group info values(2,'g2',1,0,'','')
	insert into group_info values(3,'g3',2,0,'','')
	insert into group_info values(4,'g4',3,0,'','')
	So on.
*/


CREATE TABLE IF NOT EXISTS group_info (
    gid                  INT         AUTO_INCREMENT      PRIMARY KEY,
    group_name          CHAR(25)    NOT NULL, 
	access_id				INT,
	deleted             TINYINT(1)  NOT NULL DEFAULT 0,
    creation_date       DATETIME    DEFAULT CURRENT_TIMESTAMP,
    last_update         DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (access_id) REFERENCES access_domain(access_id)

)ENGINE = INNODB CHARACTER SET=utf8;

/*This table is created to hold User info.
For example :- 
	insert into user_detail values(1,'u1','l1','as@sd',ass3s3d,3,0,9,'','')
	insert into user_detail values(2,'u2','l2','dsd@ds',d3e3r4,3,0,0,'','')
	insert into user_detail values(3,'u3','l3','sds@sds',4f4fwef3,2,0,0,'','')
	insert into user_detail values(4,'u4','l4','sds@ds',ed2333r,1,0,,'','')
	So on.
*/

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

/*This table is created to hold group user mapping info.
For example :- 
	insert into group_user values(1,1,2,'')
	insert into group user values(2,1,1,'','')
	insert into group_user values(3,2,2,'','')
	insert into group_user values(4,3,3,'','')
	So on.
*/

CREATE TABLE IF NOT EXISTS group_user (
    gid                  INT         AUTO_INCREMENT      PRIMARY KEY,
    user_id          	INT    NOT NULL,
	creation_date       DATETIME    DEFAULT CURRENT_TIMESTAMP,
	last_update         DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,	
	FOREIGN KEY (user_id) REFERENCES user_detail(id),
	FOREIGN KEY (gid) REFERENCES group_info(gid),
)ENGINE = INNODB CHARACTER SET=utf8;

/*Following two table hold user and group resource wise access info.
Like on which resource what kind of access they can perform.*/
CREATE TABLE IF NOT EXISTS user_access_entry (
    resource_id      INT NOT NULL,
    user_id          INT   NOT NULL,
	access_id   INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user_detail(id),
	FOREIGN KEY (resource_id) REFERENCES resource_info(id),
	FOREIGN KEY (access_id) REFERENCES access_domain(access_id),
	PRIMARY KEY (resource_id,user_id,access_id)
)ENGINE = INNODB CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS group_access_entry (
    resource_id      INT NOT NULL,
    gid          INT   NOT NULL,
	access_id   INT NOT NULL,
	FOREIGN KEY (gid) REFERENCES group_info(gid),
	FOREIGN KEY (resource_id) REFERENCES resource_info(id),
	FOREIGN KEY (access_id) REFERENCES access_domain(access_id),
	PRIMARY KEY (resource_id,gid,access_id)
)ENGINE = INNODB CHARACTER SET=utf8;



