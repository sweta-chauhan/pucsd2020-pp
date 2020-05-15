package user

import (		
	"context"
	"database/sql"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/driver"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/model"
)

type rtypeRepository struct {
	conn *sql.DB
}

func NewResourceTypeRepository(conn *sql.DB) *rtypeRepository {
	return &rtypeRepository{conn: conn}
}

func (rtype *rtypeRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.ResourceType)
	return driver.GetById(rtype.conn, obj, id)
}

func (rtype *rtypeRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.ResourceType)
	result, err := driver.Create(rtype.conn, &usr)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	usr.Id = id
	return id, nil
}

func (rtype *rtypeRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.ResourceType)
	
	err := driver.UpdateById(rtype.conn, &usr)
	return obj, err
}

func (rtype *rtypeRepository) Delete(cntx context.Context, id int64) (interface{}, error){
	obj := &model.ResourceType{Id: id}
	return driver.DeleteById(rtype.conn, obj, id)
}

func (rtype *rtypeRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.ResourceType{}
	return driver.GetAll(rtype.conn, obj, 0, 0)
}

func (rtype *rtypeRepository) GetByAnyCol(cntx context.Context, colname string, value interface{}) ([]interface{}, error) {
	obj := &model.ResourceType{}
	return driver.GetByAnyCol(rtype.conn, obj, colname, value)
}