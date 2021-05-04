package user

import (		
	"os"
	"path/filepath"
	"context"
	"database/sql"
	//"log"
	//"bytes"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/driver"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/model"
	"io/ioutil"
)

type resourceRepository struct {
	conn *sql.DB
}

func NewResourceRepository(conn *sql.DB) *resourceRepository {
	return &resourceRepository{conn: conn}
}

func (resource *resourceRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.Resource) 
	var result interface{}
	result,err := driver.GetById(resource.conn, obj, id)
	if obj.ResourceType == 1 {
		basepath := obj.ResourcePath
		filename := obj.ResourceName
		data, err := ioutil.ReadFile(filepath.Join(basepath,filename))
  		if err != nil {
    		
    		return nil,err
  		}

  		if(len(data)>0){
  			obj.Data = string(data)
  		} else{
  			obj.Data =" "
  		}
	}
	return result,err 
}

func (resource *resourceRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	usr := obj.(model.Resource)
	/*lines to create resource on server*/
	//log.Println(usr)
	if usr.ResourceType == 1 {
	basepath := usr.ResourcePath
	filename := usr.ResourceName 
	//log.Println(filename)
	dst,_ := os.Create(filepath.Join(basepath, filename, "/"))
	defer dst.Close()
	}
	if usr.ResourceType == 2 {
		basepath := usr.ResourcePath
		foldername := usr.ResourceName
		_, err := os.Stat(filepath.Join(basepath, foldername, "/"))
 		
	if os.IsNotExist(err) {
		errDir := os.MkdirAll(usr.ResourcePath+"/"+usr.ResourceName, 0755)
		if errDir != nil {
			return 0, err
		}
	}
	}
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
	//var result interface{}
	var data string
	data = usr.Data
	driver.GetById(resource.conn, &usr, usr.Id)
	if usr.ResourceType == 1 {
		basepath := usr.ResourcePath
		filename := usr.ResourceName
		//fmt.Println(usr.Data)
		err := ioutil.WriteFile(filepath.Join(basepath,filename), []byte(data), 0644)
  		if err != nil {
    		return nil,err
  		}
	}
	err := driver.UpdateById(resource.conn, &usr)
	return obj,err 
}

func (resource *resourceRepository) Delete(cntx context.Context, id int64) (interface{}, error) {
	usr := &model.Resource{Id: id}
	/*Lines to delete file over the server*/
	obj := new(model.Resource)
	driver.GetById(resource.conn, obj, id)
	if obj.ResourceType == 1 {
	basepath := obj.ResourcePath
	filename := obj.ResourceName 
	os.Remove(filepath.Join(basepath, filename, "/"))
	}

	if obj.ResourceType == 2 {
		basepath := obj.ResourcePath
		foldername := obj.ResourceName
		_, err := os.Stat(filepath.Join(basepath, foldername, "/"))
	if os.IsNotExist(err)!= true{
		os.Remove(filepath.Join(basepath, foldername, "/"))
	}

	}
	return driver.DeleteById(resource.conn, usr, id)
}

func (resource *resourceRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.Resource{}
	return driver.GetAll(resource.conn, obj, 0, 0)
}


func (resource *resourceRepository) GetByAnyCol(cntx context.Context, colname string, value interface{}) ([]interface{}, error) {
	obj := &model.Resource{}
	return driver.GetByAnyCol(resource.conn, obj, colname, value)
}