package user

import (		
	"context"
	"database/sql"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/driver"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/model"
)

type resourceRepository struct {
	conn *sql.DB
}

func NewResourceRepository(conn *sql.DB) *resourceRepository {
	return &resourceRepository{conn: conn}
}

func (resource *resourceRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.Resource)
	/*lines to get resource content from server*/
	return driver.GetById(resource.conn, obj, id)
}

func (resource *resourceRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.Resource)
	/*lines to create resource on server*/
	result, err := driver.Create(resource.conn, &usr)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	usr.Id = id
	return id, nil
}

func (resource *resourceRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.Resource)
	/*lines to add lines in resource on server*/
	err := driver.UpdateById(resource.conn, &usr)
	return obj, err
}

func (resource *resourceRepository) Delete(cntx context.Context, id int64) error {
	obj := &model.Resource{Id: id}
	/*Lines to delete file over the server*/
	return driver.SoftDeleteById(resource.conn, obj, id)
}

func (resource *resourceRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.Resource{}
	return driver.GetAll(resource.conn, obj, 0, 0)
}
