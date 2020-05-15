package user

import (		
	"context"
	"database/sql"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/driver"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/model"
)

type groupRepository struct {
	conn *sql.DB
}

func NewGroupRepository(conn *sql.DB) *groupRepository {
	return &groupRepository{conn: conn}
}

func (group *groupRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.Group)
	return driver.GetById(group.conn, obj, id)
}

func (group *groupRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.Group)
	result, err := driver.Create(group.conn, &usr)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	usr.Id = id
	return id, nil
}

func (group *groupRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.Group)
	
	err := driver.UpdateById(group.conn, &usr)
	return obj, err
}

func (group *groupRepository) Delete(cntx context.Context, id int64) error {
	obj := &model.Group{Id: id}
	return driver.SoftDeleteById(group.conn, obj, id)
}

func (group *groupRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.Group{}
	return driver.GetAll(group.conn, obj, 0, 0)
}
