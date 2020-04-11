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
	//log.Printf("Logger setup")
	dbConn, err := driver.NewMysqlConnection(config.Config().Database)
	
	if nil != err {
		log.Printf("Error while creating db connectiion:%s", err.Error())
		os.Exit(1)
	}
	//log.Printf("Passing dbConnection String to Handler")
	handlers = []handler.IHTTPHandler{
				httpHandler.NewDataHandler(dbConn),
				httpHandler.NewUserHandler(dbConn),
	}
}

func createRouterGroup(router *chi.Mux) {
	//log.Printf("Routing...")
	router.Group(func(r chi.Router) {
	//log.Printf("Cases basis http method check")

		for _, hdlr := range handlers { // register all handlers
			for _, hlr := range hdlr.GetHTTPHandler() {
				path := fmt.Sprintf("/webapi/v1/%s", hlr.Path)
				switch hlr.Method {
				case http.MethodGet:
					//log.Printf("Passing call to router for GET")
					r.Get(path, hlr.Func)
				case http.MethodPost:
					//log.Printf("Passing call to router for POST")

					r.Post(path, hlr.Func)
				case http.MethodPut:
					//log.Printf("Passing call to router for PUT")
					r.Put(path, hlr.Func)
				case http.MethodDelete:
					//log.Printf("Passing call to router for DELETE")
					r.Delete(path, hlr.Func)
				case http.MethodPatch:
					//log.Printf("Passing call to router for PATCH")
					r.Patch(path, hlr.Func)

				default:
					log.Println("Invalid method")
				}
			}
		}
	})
}

func main() {
	//log.Printf("Setting Up Router by creating object")
	router := chi.NewRouter()
	//log.Printf("Now using Recoverer")
	router.Use(middleware.Recoverer)
	//log.Printf("Now using Logger")
	router.Use(middleware.Logger)
	//log.Printf("Setting Up router")
	createRouterGroup(router)
	//log.Printf("to listen and serve getting configuration values")
	http.ListenAndServe(fmt.Sprintf("%s:%d",
		config.Config().Host, config.Config().Port), router)
}
