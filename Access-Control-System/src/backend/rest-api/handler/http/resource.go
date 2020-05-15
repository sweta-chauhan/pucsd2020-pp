package http

import (
	
	"database/sql"
	"encoding/json"
	"net/http"
	"fmt"
	"strconv"
	"github.com/go-chi/chi"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/handler"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/model"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/repository"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/repository/user"
)

type Resource struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewResourceHandler(conn *sql.DB) *Resource {
	return &Resource{
		repo: user.NewResourceRepository(conn),
	}
}

func (resource *Resource) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "resource/{id}", Func: resource.GetByID},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPost, Path: "resource", Func: resource.Create},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPut, Path: "resource/{id}", Func: resource.Update},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodDelete, Path: "resource/{id}", Func: resource.Delete},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "resource", Func: resource.GetAll},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPatch, Path: "resource/{id}", Func: resource.Update},
	}
}
func (resource *Resource) GetByID(w http.ResponseWriter, r *http.Request) {
	var grp interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		
		grp, err = resource.repo.GetByID(r.Context(), id)

		break
	}
	//grp.="Hello Welcome to this world."
	
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (resource *Resource) Create(w http.ResponseWriter, r *http.Request) {
	var grp model.Resource	
	err := json.NewDecoder(r.Body).Decode(&grp)
	for {
		if nil != err {
			break
		}
		_, err = resource.repo.Create(r.Context(), grp)
		break
	}
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (resource *Resource) Update(w http.ResponseWriter, r *http.Request) {
	var iUsr interface{}
	id,_ := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	grp := model.Resource{}
	err := json.NewDecoder(r.Body).Decode(&grp)
	fmt.Println(grp)
	for {
		if nil != err {
			break
		}
		grp.Id = id
		if nil != err {
			break
		}
		iUsr, err = resource.repo.Update(r.Context(), grp)
			if nil != err {
				break
			}
			grp = iUsr.(model.Resource)
			break
		}
		handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (resource *Resource) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		_, err = resource.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "Resource deleted successfully"
		break
	}
	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (resource *Resource) GetAll(w http.ResponseWriter, r *http.Request) {
	grps, err := resource.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, grps, http.StatusOK, err)
}
