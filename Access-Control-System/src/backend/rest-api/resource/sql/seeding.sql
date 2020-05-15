USE Access_Control_List;

/*Root user initilization*/

insert into user_detail (first_name,last_name,username,email,password,is_sudo_access) values('ACL','CONTROL','root','acl.control@acl.sn','2cb134080590a03859205d29fadfe29ddde215418d00839cef84ba9e13c945de',1);

/*Permission table seeding*/

insert into permission_bit (permission_id,p_read,p_write) values(1,1,1);/*Read,Write*/
insert into permission_bit (permission_id,p_read,p_write) values(2,1,0);/*Read*/
insert into permission_bit (permission_id,p_read,p_write) values(3,0,1);/*Write*/

/*Resource type domain table seeding*/

insert into resource_type_domain values(1,"File");
insert into resource_type_domain values(2,"Folder");

/*Root Group initilization*/
insert into group_info(group_name) values('root');

/*Resource seeding*/
insert into resource_info (resource_type_id,parent_resource_id,resource_name,location,owner) values(2,0,'ACL_DISK','/home/sweta/ACL',1);

/*Group User seeding*/

insert into group_user (gid,user_id) values(1,1);

/*User access entry seeding*/

insert into user_access_entry (resource_id,user_id,permission_id) values(1,1,1);

/*Group access entry seeding*/
insert into group_access_entry (resource_id,gid,permission_id) values(1,1,1);
