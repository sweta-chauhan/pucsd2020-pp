package handler

import (
	"encoding/json"
	"net/http"
)

type IHTTPHandler interface {
	GetHTTPHandler() []*HTTPHandler
	GetByID(http.ResponseWriter, *http.Request)
	Create(http.ResponseWriter, *http.Request)
	Update(http.ResponseWriter, *http.Request)
	Delete(http.ResponseWriter, *http.Request)
	GetAll(http.ResponseWriter, *http.Request)
}



type HTTPHandler struct {
	Authenticated bool
	Method        string
	Path          string
	Func          func(http.ResponseWriter, *http.Request)
}

type response struct {
	Status  int         `json:"status,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Message string      `json:"message,omitempty"`
}

func (hdlr *HTTPHandler) GetHTTPHandler() []HTTPHandler {
	return []HTTPHandler{}
}

func (hdlr *HTTPHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	return
}

func (hdlr *HTTPHandler) Create(w http.ResponseWriter, r *http.Request) {
	return
}

func (hdlr *HTTPHandler) Update(w http.ResponseWriter, r *http.Request) {
	return
}

func (hdlr *HTTPHandler) Delete(w http.ResponseWriter, r *http.Request) {
	return
}

func (hdlr *HTTPHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	return
}

func WriteJSONResponse(w http.ResponseWriter,
	r *http.Request,
	payload interface{},
	code int,
	err error) {
	resp := &response{
		Status: code,
		Data:   payload,
	}

	if nil != err {
		resp.Message = err.Error()
	}

	response, _ := json.Marshal(resp)
	//w.Header().Set("Content-Type", "application/json")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.WriteHeader(code)
	w.Write(response)
	return
}
