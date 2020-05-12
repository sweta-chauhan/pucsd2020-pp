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

type ResourceType struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewResourceTypeHandler(conn *sql.DB) *ResourceType {
	return &ResourceType{
		repo: user.NewResourceTypeRepository(conn),
	}
}

func (rtype *ResourceType) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "rtype/{id}", Func: rtype.GetByID},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPost, Path: "rtype", Func: rtype.Create},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPut, Path: "rtype/{id}", Func: rtype.Update},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodDelete, Path: "rtype/{id}", Func: rtype.Delete},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "rtype", Func: rtype.GetAll},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPatch, Path: "rtype/{id}", Func: rtype.Update},
	}
}
func (rtype *ResourceType) GetByID(w http.ResponseWriter, r *http.Request) {
	var grp interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		
		grp, err = rtype.repo.GetByID(r.Context(), id)
		break
	}
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (rtype *ResourceType) Create(w http.ResponseWriter, r *http.Request) {
	var grp model.ResourceType	
	err := json.NewDecoder(r.Body).Decode(&grp)
	for {
		if nil != err {
			break
		}
		_, err = rtype.repo.Create(r.Context(), grp)
		break
	}
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (rtype *ResourceType) Update(w http.ResponseWriter, r *http.Request) {
	var iUsr interface{}
	id,_ := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	grp := model.ResourceType{}
	err := json.NewDecoder(r.Body).Decode(&grp)
	for {
		if nil != err {
			break
		}
		grp.Id = id
		if nil != err {
			break
		}
		iUsr, err = rtype.repo.Update(r.Context(), grp)
			if nil != err {
				break
			}
			grp = iUsr.(model.ResourceType)
			break
		}
		handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (rtype *ResourceType) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		err = rtype.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "ResourceType deleted successfully"
		break
	}
	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (rtype *ResourceType) GetAll(w http.ResponseWriter, r *http.Request) {
	grps, err := rtype.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, grps, http.StatusOK, err)
}