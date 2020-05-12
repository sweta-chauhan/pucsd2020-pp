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

type GroupAccessEntry struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewGroupAccessEntryHandler(conn *sql.DB) *GroupAccessEntry {
	return &GroupAccessEntry{
		repo: user.NewGroupAccessEntryRepository(conn),
	}
}

func (groupaccess *GroupAccessEntry) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "groupaccess/{id}", Func: groupaccess.GetByID},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPost, Path: "groupaccess", Func: groupaccess.Create},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPut, Path: "groupaccess/{id}", Func: groupaccess.Update},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodDelete, Path: "groupaccess/{id}", Func: groupaccess.Delete},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "groupaccess", Func: groupaccess.GetAll},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPatch, Path: "groupaccess/{id}", Func: groupaccess.Update},
	}
}
func (groupaccess *GroupAccessEntry) GetByID(w http.ResponseWriter, r *http.Request) {
	var grp interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		
		grp, err = groupaccess.repo.GetByID(r.Context(), id)
		break
	}
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (groupaccess *GroupAccessEntry) Create(w http.ResponseWriter, r *http.Request) {
	var grp model.GroupAccessEntry	
	err := json.NewDecoder(r.Body).Decode(&grp)
	for {
		if nil != err {
			break
		}
		_, err = groupaccess.repo.Create(r.Context(), grp)
		break
	}
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (groupaccess *GroupAccessEntry) Update(w http.ResponseWriter, r *http.Request) {
	var iUsr interface{}
	id,_ := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	grp := model.GroupAccessEntry{}
	err := json.NewDecoder(r.Body).Decode(&grp)
	for {
		if nil != err {
			break
		}
		grp.Id = id
		if nil != err {
			break
		}
		iUsr, err = groupaccess.repo.Update(r.Context(), grp)
			if nil != err {
				break
			}
			grp = iUsr.(model.GroupAccessEntry)
			break
		}
		handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (groupaccess *GroupAccessEntry) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		err = groupaccess.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "GroupAccessEntry deleted successfully"
		break
	}
	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (groupaccess *GroupAccessEntry) GetAll(w http.ResponseWriter, r *http.Request) {
	grps, err := groupaccess.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, grps, http.StatusOK, err)
}
