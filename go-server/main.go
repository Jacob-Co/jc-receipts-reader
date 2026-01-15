package main

import (
	"log"
	"net/http"

	"github.com/Jacob-Co/jc-receipts-reader/handlers/health"
)

func main() {
	http.Handle("/health", health.Handler{})
	log.Fatal(http.ListenAndServe(":3001", nil))
}
