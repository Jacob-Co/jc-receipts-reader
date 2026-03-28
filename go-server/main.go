package main

import (
	// "log"
	"net/http"

	"github.com/Jacob-Co/jc-receipts-reader/depinj"
)

func main() {
	// http.Handle("GET /health", health.Handler{})
	// log.Fatal(http.ListenAndServe(":3001", nil))

	x := http.HandlerFunc(HandleGreet)
	http.ListenAndServe(":5000", x)

}

func HandleGreet(w http.ResponseWriter, r *http.Request) {
	depinj.Greet(w, "Jacob")
}
