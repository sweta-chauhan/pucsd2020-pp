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

type UserAccessEntry struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewUserAccessEntryHandler(conn *sql.DB) *UserAccessEntry {
	return &UserAccessEntry{
		repo: user.NewUserAccessEntryRepository(conn),
	}
}

func (useraccess *UserAccessEntry) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "useraccess/{id}", Func: useraccess.GetByID},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPost, Path: "useraccess", Func: useraccess.Create},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPut, Path: "useraccess/{id}", Func: useraccess.Update},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodDelete, Path: "useraccess/{id}", Func: useraccess.Delete},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodGet, Path: "useraccess", Func: useraccess.GetAll},
		&handler.HTTPHandler{Authenticated: false, Method: http.MethodPatch, Path: "useraccess/{id}", Func: useraccess.Update},
	}
}
func (useraccess *UserAccessEntry) GetByID(w http.ResponseWriter, r *http.Request) {
	var grp interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		
		grp, err = useraccess.repo.GetByID(r.Context(), id)
		break
	}
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (useraccess *UserAccessEntry) Create(w http.ResponseWriter, r *http.Request) {
	var grp model.UserAccessEntry	
	err := json.NewDecoder(r.Body).Decode(&grp)
	for {
		if nil != err {
			break
		}
		_, err = useraccess.repo.Create(r.Context(), grp)
		break
	}
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (useraccess *UserAccessEntry) Update(w http.ResponseWriter, r *http.Request) {
	var iUsr interface{}
	id,_ := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	grp := model.UserAccessEntry{}
	err := json.NewDecoder(r.Body).Decode(&grp)
	for {
		if nil != err {
			break
		}
		grp.Id = id
		if nil != err {
			break
		}
		iUsr, err = useraccess.repo.Update(r.Context(), grp)
			if nil != err {
				break
			}
			grp = iUsr.(model.UserAccessEntry)
			break
		}
		handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}

func (useraccess *UserAccessEntry) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
	for {
		if nil != err {
			break
		}
		_, err = useraccess.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "UserAccessEntry deleted successfully"
		break
	}
	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (useraccess *UserAccessEntry) GetAll(w http.ResponseWriter, r *http.Request) {
	grps, err := useraccess.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, grps, http.StatusOK, err)
}
