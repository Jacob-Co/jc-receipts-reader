package racer

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

func TestRacer(t *testing.T) {
	t.Run("should return fastest url", func(t *testing.T) {
		slowServer := createDelayedMockServer(20 * time.Millisecond)
		defer slowServer.Close()

		fastServer := createDelayedMockServer(0 * time.Second)
		defer fastServer.Close()

		slowUrl := slowServer.URL
		fastUrl := fastServer.URL
		want := fastUrl
		got, err := Racer(fastUrl, slowUrl, 10*time.Second)

		ensureNoErr(t, err)
		if got != want {
			t.Errorf("got: %s, want %s", got, want)
		}
	})

	t.Run("should timeout if exceeds max wait time", func(t *testing.T) {
		slowServer := createDelayedMockServer(20 * time.Millisecond)
		defer slowServer.Close()

		fastServer := createDelayedMockServer(20 * time.Millisecond)
		defer fastServer.Close()

		slowUrl := slowServer.URL
		fastUrl := fastServer.URL
		want := ErrTimeout
		_, err := Racer(fastUrl, slowUrl, 10*time.Microsecond)

		if err != want {
			t.Errorf("got: %s, want %s", err, want)
		}

	})
}

func ensureNoErr(t *testing.T, err error) {
	t.Helper()
	if err != nil {
		t.Fatal("Unexpected Error")
	}
}

func createDelayedMockServer(delay time.Duration) *httptest.Server {
	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(delay)
		w.WriteHeader(http.StatusOK)
	}))
	return mockServer
}
