/*SQL Query for login*/
SELECT password FROM user_detail where id=?;

/*SQL Query for getting group list where user have access*/
SELECT gid FROM group_user where user_id=?;

/*SQL Query for getting complete group_info*/
SELECT group_name FROM where gid=?;

/*SQL Query for getting user_access_entry */
SELECT * from user_access_entry where user_id=?;

/*SQL Query for getting group_access_entry on resource*/
SELECT * from group_access_entry where gid=?;

/*SQL Query for getting resource info*/ 
SELECT * from resource_info where id=?;
