package user

import (		
	"context"
	"database/sql"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/driver"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/model"
)

type groupaccessRepository struct {
	conn *sql.DB
}

func NewGroupAccessEntryRepository(conn *sql.DB) *groupaccessRepository {
	return &groupaccessRepository{conn: conn}
}

func (groupaccess *groupaccessRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.GroupAccessEntry)
	return driver.GetById(groupaccess.conn, obj, id)
}

func (groupaccess *groupaccessRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.GroupAccessEntry)
	result, err := driver.Create(groupaccess.conn, &usr)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	usr.Id = id
	return id, nil
}

func (groupaccess *groupaccessRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.GroupAccessEntry)
	
	err := driver.UpdateById(groupaccess.conn, &usr)
	return obj, err
}

func (groupaccess *groupaccessRepository) Delete(cntx context.Context, id int64) error {
	obj := &model.GroupAccessEntry{Id: id}
	return driver.SoftDeleteById(groupaccess.conn, obj, id)
}

func (groupaccess *groupaccessRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.GroupAccessEntry{}
	return driver.GetAll(groupaccess.conn, obj, 0, 0)
}
