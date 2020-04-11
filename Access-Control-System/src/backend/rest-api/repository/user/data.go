package user

import (
		
	"context"
	"database/sql"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/driver"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/model"
)

type dataRepository struct {
	conn *sql.DB
}

func NewDataRepository(conn *sql.DB) *dataRepository {
	return &dataRepository{conn: conn}
}

func (user *dataRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	//log.Printf("Getting context and creating model.User object in repository/user module")
	obj := new(model.Data)
	return driver.GetById(user.conn, obj, id)
}

func (user *dataRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	//log.Printf("Getting context and creating model.User object in repository/user module")
	data := obj.(model.Data)
	result, err := driver.Create(user.conn, &data)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	data.Id = id
	return id, nil
}

func (user *dataRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	//log.Printf("Getting context and creating model.User object in repository/user module")
	data := obj.(model.Data)
	
	err := driver.UpdateById(user.conn, &data)
	return obj, err
}

func (user *dataRepository) Delete(cntx context.Context, id int64) error {
	//log.Printf("Getting context and creating model.User object repository/user module")
	obj := &model.Data{Id: id}
	return driver.SoftDeleteById(user.conn, obj, id)
}

func (user *dataRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	//log.Printf("Getting context and creating model.User object repository/user module")
	obj := &model.Data{}
	return driver.GetAll(user.conn, obj, 0, 0)
}
