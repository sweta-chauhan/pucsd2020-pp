package user

import (		
	"context"
	"database/sql"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/driver"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/model"
)

type groupuserRepository struct {
	conn *sql.DB
}

func NewGroupUserRepository(conn *sql.DB) *groupuserRepository {
	return &groupuserRepository{conn: conn}
}

func (groupuser *groupuserRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.GroupUser)
	return driver.GetById(groupuser.conn, obj, id)
}

func (groupuser *groupuserRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.GroupUser)
	result, err := driver.Create(groupuser.conn, &usr)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	usr.Id = id
	return id, nil
}

func (groupuser *groupuserRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.GroupUser)
	
	err := driver.UpdateById(groupuser.conn, &usr)
	return obj, err
}

func (groupuser *groupuserRepository) Delete(cntx context.Context, id int64) error {
	obj := &model.GroupUser{Id: id}
	return driver.SoftDeleteById(groupuser.conn, obj, id)
}

func (groupuser *groupuserRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.GroupUser{}
	return driver.GetAll(groupuser.conn, obj, 0, 0)
}
