package http

import (
	
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"github.com/go-chi/chi"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/handler"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/model"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/repository"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/repository/user"
)

type Data struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewDataHandler(conn *sql.DB) *Data {
	return &Data{
		repo: user.NewDataRepository(conn),
	}
}

func (user *Data) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "data/{id}", Func: user.GetByID},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPost, Path: "data", Func: user.Create},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPut, Path: "data/{id}", Func: user.Update},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodDelete, Path: "data/{id}", Func: user.Delete},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "data", Func: user.GetAll},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPatch, Path: "data/{id}", Func: user.Update},
	}
}
func (user *Data) GetByID(w http.ResponseWriter, r *http.Request) {
	//log.Printf("Handler")
	var usr interface{}
	//log.Printf("Creating User object and Parsing and getting urlpattern")
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		
		usr, err = user.repo.GetByID(r.Context(), id)
		break
	}
	handler.WriteJSONResponse(w, r, usr, http.StatusOK, err)
}

func (user *Data) Create(w http.ResponseWriter, r *http.Request) {
	var usr model.Data	
	err := json.NewDecoder(r.Body).Decode(&usr)
	for {
		if nil != err {
			break
		}
		//log.Printf("Now calling Create function Create function with req.context and usr object")

		_, err = user.repo.Create(r.Context(), usr)
		
		break
	}
	handler.WriteJSONResponse(w, r, usr, http.StatusOK, err)
}

func (user *Data) Update(w http.ResponseWriter, r *http.Request) {
	//log.Printf("Handler")
	//log.Printf("PATCH/PUT call")
	//log.Printf("Creating usr object defined in handler/http")
	var iUsr interface{}
	id,_ := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	//log.Printf("Update by Id called")
	usr := model.Data{}
	err := json.NewDecoder(r.Body).Decode(&usr)
	//log.Printf("Decoding request in usr object")
	for {
		if nil != err {
			break
		}
		usr.Id = id
		if nil != err {
			break
		}

		usr.Is_active_on_social_media = 0
		//log.Printf("Now calling Update function with req.context and usr object")	
		iUsr, err = user.repo.Update(r.Context(), usr)
			if nil != err {
				break
			}
			usr = iUsr.(model.Data)
			break
		}
		handler.WriteJSONResponse(w, r, usr, http.StatusOK, err)
}

func (user *Data) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		//log.Printf("Now calling  delete with req.context and usr object")
		err = user.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "User deleted successfully"
		break
	}
	//log.Printf("Writing response to JSON")
	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (user *Data) GetAll(w http.ResponseWriter, r *http.Request) {
	//log.Printf("Calling Getall Function")	
	usrs, err := user.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, usrs, http.StatusOK, err)
}
