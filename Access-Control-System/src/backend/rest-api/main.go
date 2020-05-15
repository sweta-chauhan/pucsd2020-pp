package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/config"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/driver"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/handler"
	httpHandler "github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/handler/http"
)
var (
	handlers = []handler.IHTTPHandler{}
)

func init() {

	log.SetFlags(log.LstdFlags | log.Lshortfile)

	log.SetFlags(log.LstdFlags | log.Lshortfile)
	dbConn, err := driver.NewMysqlConnection(config.Config().Database)
	
	if nil != err {
		log.Printf("Error while creating db connectiion:%s", err.Error())
		os.Exit(1)
	}
	handlers = []handler.IHTTPHandler{
				httpHandler.NewUserHandler(dbConn),
				httpHandler.NewGroupHandler(dbConn),
				httpHandler.NewResourceHandler(dbConn),
				httpHandler.NewGroupUserHandler(dbConn),
				httpHandler.NewGroupAccessEntryHandler(dbConn),
				httpHandler.NewUserAccessEntryHandler(dbConn),
				httpHandler.NewPermissionHandler(dbConn),
				httpHandler.NewResourceTypeHandler(dbConn),
	}
}

func createRouterGroup(router *chi.Mux) {
	router.Group(func(r chi.Router) {
		for _, hdlr := range handlers {
			for _, hlr := range hdlr.GetHTTPHandler() {
				path := fmt.Sprintf("/webapi/v1/%s", hlr.Path)
				switch hlr.Method {
				case http.MethodGet:
					r.Get(path, hlr.Func)
				case http.MethodPost:
					r.Post(path, hlr.Func)
				case http.MethodPut:
					r.Put(path, hlr.Func)
				case http.MethodDelete:
					r.Delete(path, hlr.Func)
				case http.MethodPatch:
					r.Patch(path, hlr.Func)
				default:
					log.Println("Invalid method")
				}
			}
		}
	})
}


func main() {
	router := chi.NewRouter()
	router.Use(middleware.Recoverer)
	router.Use(middleware.Logger)
	createRouterGroup(router)
	http.ListenAndServe(fmt.Sprintf("%s:%d",
		config.Config().Host, config.Config().Port),router)
}
