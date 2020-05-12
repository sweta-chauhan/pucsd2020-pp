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

type Permission struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewPermissionHandler(conn *sql.DB) *Permission {
	return &Permission{
		repo: user.NewPermissionRepository(conn),
	}
}

func (permission *Permission) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "permission/{id}", Func: permission.GetByID},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPost, Path: "permission", Func: permission.Create},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPut, Path: "permission/{id}", Func: permission.Update},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodDelete, Path: "permission/{id}", Func: permission.Delete},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "permission", Func: permission.GetAll},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPatch, Path: "permission/{id}", Func: permission.Update},
	}
}
func (permission *Permission) GetByID(w http.ResponseWriter, r *http.Request) {
	var grp interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		
		grp, err = permission.repo.GetByID(r.Context(), id)
		break
	}
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (permission *Permission) Create(w http.ResponseWriter, r *http.Request) {
	var grp model.Permission	
	err := json.NewDecoder(r.Body).Decode(&grp)
	for {
		if nil != err {
			break
		}
		_, err = permission.repo.Create(r.Context(), grp)
		break
	}
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (permission *Permission) Update(w http.ResponseWriter, r *http.Request) {
	var iUsr interface{}
	id,_ := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	grp := model.Permission{}
	err := json.NewDecoder(r.Body).Decode(&grp)
	for {
		if nil != err {
			break
		}
		grp.Id = id
		if nil != err {
			break
		}
		iUsr, err = permission.repo.Update(r.Context(), grp)
			if nil != err {
				break
			}
			grp = iUsr.(model.Permission)
			break
		}
		handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (permission *Permission) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		err = permission.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "Permission deleted successfully"
		break
	}
	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (permission *Permission) GetAll(w http.ResponseWriter, r *http.Request) {
	grps, err := permission.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, grps, http.StatusOK, err)
}
