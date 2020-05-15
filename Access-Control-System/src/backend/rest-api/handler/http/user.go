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

type User struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewUserHandler(conn *sql.DB) *User {
	return &User{
		repo: user.NewUserRepository(conn),
	}
}

func (user *User) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "user/{id}", Func: user.GetByID},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPost, Path: "user", Func: user.Create},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPut, Path: "user/{id}", Func: user.Update},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodDelete, Path: "user/{id}", Func: user.Delete},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "user", Func: user.GetAll},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPatch, Path: "user/{id}", Func: user.Update},
	}
}
func (user *User) GetByID(w http.ResponseWriter, r *http.Request) {
	var usr interface{}
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

func (user *User) Create(w http.ResponseWriter, r *http.Request) {
	var usr model.User	
	err := json.NewDecoder(r.Body).Decode(&usr)
	for {
		if nil != err {
			break
		}
		_, err = user.repo.Create(r.Context(), usr)
		break
	}
	handler.WriteJSONResponse(w, r, usr, http.StatusOK, err)
}

func (user *User) Update(w http.ResponseWriter, r *http.Request) {
	var iUsr interface{}
	id,_ := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	usr := model.User{}
	err := json.NewDecoder(r.Body).Decode(&usr)
	for {
		if nil != err {
			break
		}
		usr.Id = id
		if nil != err {
			break
		}
		iUsr, err = user.repo.Update(r.Context(), usr)
			if nil != err {
				break
			}
			usr = iUsr.(model.User)
			break
		}
		handler.WriteJSONResponse(w, r, usr, http.StatusOK, err)
}

func (user *User) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		_, err = user.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "User deleted successfully"
		break
	}
	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (user *User) GetAll(w http.ResponseWriter, r *http.Request) {
	usrs, err := user.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, usrs, http.StatusOK, err)
}
