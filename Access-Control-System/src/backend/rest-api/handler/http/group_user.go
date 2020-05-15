package http

import (
	
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	//"fmt"
	"github.com/go-chi/chi"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/handler"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/model"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/repository"
	"github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api/repository/user"
)

type GroupUser struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewGroupUserHandler(conn *sql.DB) *GroupUser {
	return &GroupUser{
		repo: user.NewGroupUserRepository(conn),
	}
}

func (groupuser *GroupUser) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "groupuser/{id}", Func: groupuser.GetByID},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "groups/{uid}", Func: groupuser.GetByAnyCol},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPost, Path: "groupuser", Func: groupuser.Create},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodDelete, Path: "groupuser/{id}", Func: groupuser.Delete},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "groupuser", Func: groupuser.GetAll},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPatch, Path: "groupuser/{id}", Func: groupuser.Update},
		
	}
}
func (groupuser *GroupUser) GetByID(w http.ResponseWriter, r *http.Request) {
	var grp interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		
		grp, err = groupuser.repo.GetByID(r.Context(), id)
		break
	}
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (groupuser *GroupUser) GetByAnyCol(w http.ResponseWriter, r *http.Request) {
	var grp interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "uid"), 10, 64)
	for {
		if nil != err {
			break
		}
		grp, err = groupuser.repo.GetByAnyCol(r.Context(),"user_id",id)
		
		break
	}
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}
func (groupuser *GroupUser) Create(w http.ResponseWriter, r *http.Request) {
	var grp model.GroupUser	
	err := json.NewDecoder(r.Body).Decode(&grp)
	for {
		if nil != err {
			break
		}
		_, err = groupuser.repo.Create(r.Context(), grp)
		break
	}
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (groupuser *GroupUser) Update(w http.ResponseWriter, r *http.Request) {
	var iUsr interface{}
	id,_ := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	grp := model.GroupUser{}
	err := json.NewDecoder(r.Body).Decode(&grp)
	for {
		if nil != err {
			break
		}
		grp.Id = id
		if nil != err {
			break
		}
		iUsr, err = groupuser.repo.Update(r.Context(), grp)
			if nil != err {
				break
			}
			grp = iUsr.(model.GroupUser)
			break
		}
		handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (groupuser *GroupUser) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		_, err = groupuser.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "GroupUser deleted successfully"
		break
	}
	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (groupuser *GroupUser) GetAll(w http.ResponseWriter, r *http.Request) {
	grps, err := groupuser.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, grps, http.StatusOK, err)
}
