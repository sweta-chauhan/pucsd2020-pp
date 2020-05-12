package user

import (		
	"context"
	"database/sql"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/driver"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/model"
)

type useraccessRepository struct {
	conn *sql.DB
}

func NewUserAccessEntryRepository(conn *sql.DB) *useraccessRepository {
	return &useraccessRepository{conn: conn}
}

func (useraccess *useraccessRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.UserAccessEntry)
	return driver.GetById(useraccess.conn, obj, id)
}

func (useraccess *useraccessRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.UserAccessEntry)
	result, err := driver.Create(useraccess.conn, &usr)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	usr.Id = id
	return id, nil
}

func (useraccess *useraccessRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.UserAccessEntry)
	
	err := driver.UpdateById(useraccess.conn, &usr)
	return obj, err
}

func (useraccess *useraccessRepository) Delete(cntx context.Context, id int64) error {
	obj := &model.UserAccessEntry{Id: id}
	return driver.SoftDeleteById(useraccess.conn, obj, id)
}

func (useraccess *useraccessRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.UserAccessEntry{}
	return driver.GetAll(useraccess.conn, obj, 0, 0)
}
