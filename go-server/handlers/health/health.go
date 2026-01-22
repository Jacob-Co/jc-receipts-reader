package health

import (
	"encoding/json"
	"net/http"
)

type Handler struct{}

func (h Handler) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	okayStatus := struct {
		Status string `json:"status"`
	}{
		Status: "okay",
	}

	resStatus, _ := json.Marshal(okayStatus)
	res.Header().Set("Content-Type", "application/json")
	res.Write(resStatus)
}
