USE Access_Control_List;

/*Root user initilization*/

insert into user_detail (first_name,last_name,username,email,password,is_sudo_access) values('ACL','CONTROL','root','acl.control@acl.sn','hello@123',1);

/*Permission table seeding*/

#insert into permission_bit (id,p_read,p_write) values(1,1,1);/*Read,Write*/
insert into permission_bit (id,p_read,p_write) values(1,1,0);/*Read*/
insert into permission_bit (id,p_read,p_write) values(2,0,1);/*Write*/

/*Resource type domain table seeding*/

insert into resource_type_domain values(1,"File");
insert into resource_type_domain values(2,"Folder");

/*Root Group initilization*/
insert into group_info(id,group_name) values(1,'root');

/*Resource seeding*/
insert into resource_info (resource_type_id,parent_resource_id,resource_name,location,owner) values(2,0,'ACL','rest-api',1);

/*Group User seeding*/

insert into group_user (id,user_id) values(1,1);

/*User access entry seeding*/

insert into user_access_entry (resource_id,id,pid) values(1,1,1);

/*Group access entry seeding*/
insert into group_access_entry (resource_id,id,pid) values(1,1,1);
