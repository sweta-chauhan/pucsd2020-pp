package driver

import (
	"bytes"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"reflect"
	"strings"
	"time"

	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/config"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/model"

	_ "github.com/go-sql-driver/mysql"
)

const (
	MYSQL_DRIVER_NAME   = "mysql"
	CONN_MAX_LIFETIME   = 30 * 60 * 60 // 30 day
	COLUMN_INGNORE_FLAG = "1"
	COLUMN_PRIMARY      = "primary"
)

func NewMysqlConnection(cfg config.MysqlConnection) (*sql.DB, error) {
	//log.Printf("Come to the database driver connection ")
	db, err := sql.Open(MYSQL_DRIVER_NAME, cfg.ConnString())
	if err != nil {
		log.Fatalf("Failed to open mysql connection: %v", err)
		return nil, err
	}

	if cfg.IdleConnection > 0 {
		//log.Printf("Checking Idle connection")

		db.SetMaxIdleConns(cfg.IdleConnection)
	}
	if cfg.MaxConnection > 0 {
		//log.Printf("Checking max connection")

		db.SetMaxOpenConns(cfg.MaxConnection)
	}
	//log.Printf("Setting Connection lifeline")

	db.SetConnMaxLifetime(time.Second * CONN_MAX_LIFETIME)

	if err := db.Ping(); err != nil {
		log.Fatalf("Failed to ping mysql: %v", err)
	}
	//log.Printf("return either database driver connection ")

	return db, err
}

// return the placeholder string with given count
func GetPlaceHolder(count int) string {
	if count > 0 {
		str := strings.Repeat("?, ", count)
		return str[:len(str)-2]
	}

	return ""
}

/**
 * Insert new row
 */
func Create(conn *sql.DB, object model.IModel) (sql.Result, error) {
	
	//log.Printf("Reading object values from interface type using reflection")

	rValue := reflect.ValueOf(object)
	rType := reflect.TypeOf(object)
	columns := []string{}
	var params []interface{}

	count := 0
	for idx := 0; idx < rValue.Elem().NumField(); idx++ {
		field := rType.Elem().Field(idx)
		value := rValue.Elem().Field(idx)
		if  COLUMN_INGNORE_FLAG == field.Tag.Get("autoincr") ||
			COLUMN_INGNORE_FLAG == field.Tag.Get("ignore") {
			continue
		}

		column := field.Tag.Get("column")
		columns = append(columns, column)
		params = append(params, value.Interface())
		count++
	}
   //log.Printf("Creating query string ...")

	var queryBuffer bytes.Buffer
	queryBuffer.WriteString("INSERT INTO ")
	queryBuffer.WriteString(object.Table())
	queryBuffer.WriteString("(")
	queryBuffer.WriteString(strings.Join(columns, ", "))
	queryBuffer.WriteString(") VALUES(")
	queryBuffer.WriteString(GetPlaceHolder(count))
	queryBuffer.WriteString(");")

	query := queryBuffer.String()
	stmt, err := conn.Prepare(query)
	if nil != err {
		log.Printf("Insert Syntax Error: %s\n\tError Query: %s : %s\n",
			err.Error(), object.String(), query)
		return nil, err
	}

	defer stmt.Close()
	//log.Printf("Executing query string ...")
	
	result, err := stmt.Exec(params...)
	if nil != err {
		log.Printf("Insert Execute Error: %s\nError Query: %s : %s\n",
			err.Error(), object.String(), query)
		return nil, err
	}
	//log.Printf("Returning result string ...")

	return result, nil
}

/**
 * Update existing row with key column
 */
func UpdateById(conn *sql.DB, object model.IModel) error {
	//log.Printf("Reading object values to update from interface type using reflection")


	rValue := reflect.ValueOf(object)
	rType := reflect.TypeOf(object)

	columns := []string{}
	var params []interface{}

	keyColumns := []string{}
	var keyParams []interface{}

	for idx := 0; idx < rValue.Elem().NumField(); idx++ {
		field := rType.Elem().Field(idx)
		value := rValue.Elem().Field(idx)

		/*if value.IsNil() ||
			COLUMN_INGNORE_FLAG == field.Tag.Get("ignore") {
			continue
		}*/

		column := field.Tag.Get("column")
		if COLUMN_PRIMARY == field.Tag.Get("key") {
			keyColumns = append(keyColumns, column+" = ?")
			keyParams = append(keyParams, value.Interface())

		} else {
			columns = append(columns, column+" = ?")
			params = append(params, value.Interface())
		}
	}

	for _, param := range keyParams {
		params = append(params, param)
	}

	var queryBuffer bytes.Buffer
	queryBuffer.WriteString("UPDATE ")
	queryBuffer.WriteString(object.Table())
	queryBuffer.WriteString(" SET ")
	queryBuffer.WriteString(strings.Join(columns, ", "))
	queryBuffer.WriteString(" WHERE ")
	queryBuffer.WriteString(strings.Join(keyColumns, ", "))
	queryBuffer.WriteString(";")

	query := queryBuffer.String()
	//	log.Println("Update statement is: %s", query)
	stmt, err := conn.Prepare(query)
	if nil != err {
		log.Printf("Update Syntax Error: %s\n\tError Query: %s : %s\n",
			err.Error(), object.String(), query)
		return err
	}

	defer stmt.Close()
	_, err = stmt.Exec(params...)
	if nil != err {
		log.Printf("Update Execute Error: %s\nError Query: %s : %s\n",
			err.Error(), object.String(), query)
	}

	return err
}


/**
 * Update existing row with key column
 */
func UpdateByEmail(conn *sql.DB, object model.IModel) error {
	log.Printf("Reading object values to update from interface type using reflection")


	rValue := reflect.ValueOf(object)
	rType := reflect.TypeOf(object)

	columns := []string{}
	var params []interface{}

	keyColumns := []string{}
	var keyParams []interface{}

	for idx := 0; idx < rValue.Elem().NumField(); idx++ {
		field := rType.Elem().Field(idx)
		value := rValue.Elem().Field(idx)

		/*if value.IsNil() ||
			COLUMN_INGNORE_FLAG == field.Tag.Get("ignore") {
			continue
		}*/

		column := field.Tag.Get("column")
		if COLUMN_PRIMARY == field.Tag.Get("key") {
			keyColumns = append(keyColumns, column+" = ?")
			keyParams = append(keyParams, value.Interface())

		} else {
			columns = append(columns, column+" = ?")
			params = append(params, value.Interface())
		}
	}

	for _, param := range keyParams {
		params = append(params, param)
	}

	var queryBuffer bytes.Buffer
	queryBuffer.WriteString("UPDATE ")
	queryBuffer.WriteString(object.Table())
	queryBuffer.WriteString(" SET ")
	queryBuffer.WriteString(strings.Join(columns, ", "))
	queryBuffer.WriteString(" WHERE ")
	queryBuffer.WriteString(strings.Join(keyColumns, ", "))
	queryBuffer.WriteString(";")

	query := queryBuffer.String()
	//	log.Println("Update statement is: %s", query)
	stmt, err := conn.Prepare(query)
	if nil != err {
		log.Printf("Update Syntax Error: %s\n\tError Query: %s : %s\n",
			err.Error(), object.String(), query)
		return err
	}

	defer stmt.Close()
	_, err = stmt.Exec(params...)
	if nil != err {
		log.Printf("Update Execute Error: %s\nError Query: %s : %s\n",
			err.Error(), object.String(), query)
	}

	return err
}


func GetById(conn *sql.DB, object model.IModel, id int64) (model.IModel, error) {
	//log.Printf("Reading object values from interface type using reflection")


	rValue := reflect.ValueOf(object)
	rType := reflect.TypeOf(object)

	columns := []string{}
	pointers := make([]interface{}, 0)

	for idx := 0; idx < rValue.Elem().NumField(); idx++ {
		field := rType.Elem().Field(idx)
		if COLUMN_INGNORE_FLAG == field.Tag.Get("ignore") {
			continue
		}

		column := field.Tag.Get("column")
		columns = append(columns, column)
		pointers = append(pointers, rValue.Elem().Field(idx).Addr().Interface())
	}

	var queryBuffer bytes.Buffer

	queryBuffer.WriteString("SELECT ")
	queryBuffer.WriteString(strings.Join(columns, ", "))
	queryBuffer.WriteString(" FROM ")
	queryBuffer.WriteString(object.Table())
	queryBuffer.WriteString(" WHERE id = ?")

	query := queryBuffer.String()
	//	log.Printf("GetById sql: %s\n", query)
	row, err := conn.Query(query, id)

	if nil != err {
		log.Printf("Error conn.Query: %s\n\tError Query: %s\n", err.Error(), query)
		return nil, err
	}

	defer row.Close()
	if row.Next() {
		if nil != err {
			log.Printf("Error row.Columns(): %s\n\tError Query: %s\n", err.Error(), query)
			return nil, err
		}

		err = row.Scan(pointers...)
		if nil != err {
			log.Printf("Error: row.Scan: %s\n", err.Error())
			return nil, err
		}
	} else {
		return nil, errors.New(fmt.Sprintf("Entry not found for id: %d", id))
	}

	return object, nil
}


func GetAll(conn *sql.DB, object model.IModel, limit, offset int64) ([]interface{}, error) {
	rValue := reflect.ValueOf(object)
	rType := reflect.TypeOf(object)
	columns := []string{}
	for idx := 0; idx < rValue.Elem().NumField(); idx++ {
		field := rType.Elem().Field(idx)
		if COLUMN_INGNORE_FLAG == field.Tag.Get("ignore") {
			continue
		}

		column := field.Tag.Get("column")
		columns = append(columns, column)
		
	}
	var queryBuffer bytes.Buffer
	var params []interface{}

	queryBuffer.WriteString("SELECT ")
	queryBuffer.WriteString(strings.Join(columns, ", "))
	queryBuffer.WriteString(" FROM ")
	queryBuffer.WriteString(object.Table())
	if 0 != limit && 0 != offset {
		queryBuffer.WriteString(" LIMIT ? OFFSET ?")
		params = append(params, limit)
		params = append(params, offset)
	}

	query := queryBuffer.String()
	row, err := conn.Query(query)// params...)
	if nil != err {
		log.Printf("Error conn.Query: %s\n\tError Query: %s\n", err.Error(), query)
		return nil, err
	}
	defer row.Close()
	objects := make([]interface{}, 0)
	
	cols, err := row.Columns() // Remember to check err afterwards
	
	
	for row.Next() {
		if nil != err {
			log.Printf("Error row.Columns(): %s\n\tError Query: %s\n", err.Error(), query)
			return nil, err
		}
		vals := make([]interface{}, len(cols))
		writeCols := make([]string, len(cols))
		for i, _ := range cols {
			vals[i] = &writeCols[i]
		}		
		err = row.Scan(vals...)
		if nil != err {

			log.Printf("Error: row.Scan: %s\n", err.Error())
			return nil, err
		}
		objects = append(objects, vals)
	}
	
	return objects, nil
}

func DeleteById(conn *sql.DB, object model.IModel, id int64) (sql.Result, error) {
	var queryBuffer bytes.Buffer
	queryBuffer.WriteString("DELETE FROM ")
	queryBuffer.WriteString(object.Table())
	queryBuffer.WriteString(" WHERE id = ?")

	query := queryBuffer.String()
	//	log.Println("Delete statement is: %s", query)
	stmt, err := conn.Prepare(query)
	if nil != err {
		log.Printf("Delete Syntax Error: %s\n\tError Query: %s : %s\n",
			err.Error(), object.String(), query)
		return nil, err
	}

	defer stmt.Close()
	result, err := stmt.Exec(id)
	if nil != err {
		log.Printf("Delete Execute Error: %s\nError Query: %s : %s\n",
			err.Error(), object.String(), query)
	}

	return result, err
}

func SoftDeleteById(conn *sql.DB, object model.IModel, id int64) error {
	var queryBuffer bytes.Buffer
	//log.Printf("Soft Deletion String")


	queryBuffer.WriteString("UPDATE ")
	queryBuffer.WriteString(object.Table())
	queryBuffer.WriteString(" SET deleted = 1  WHERE id = ?")

	query := queryBuffer.String()
	log.Println("Delete statement is: %s", query)
	stmt, err := conn.Prepare(query)
	if nil != err {
		log.Printf("Delete Syntax Error: %s\n\tError Query: %s : %s\n",
			err.Error(), object.String(), query)
		return err
	}

	defer stmt.Close()
	_, err = stmt.Exec(id)
	if nil != err {
		log.Printf("Delete Execute Error: %s\nError Query: %s : %s\n",
			err.Error(), object.String(), query)
	}

	return err
}
