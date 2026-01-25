package concurrency

import (
	"reflect"
	"testing"
	"time"
)

func mockWebsiteChecker(url string) bool {
	return url != "waat://furhurterwe.geds"
}

func TestCheckWebsites(t *testing.T) {
	websites := []string{
		"http://google.com",
		"http://blog.gypsydave5.com",
		"waat://furhurterwe.geds",
	}

	want := map[string]bool{
		"http://google.com":          true,
		"http://blog.gypsydave5.com": true,
		"waat://furhurterwe.geds":    false,
	}

	got := CheckWebsites(mockWebsiteChecker, websites)

	if !reflect.DeepEqual(want, got) {
		t.Fatalf("wanted %v, got %v", want, got)
	}
}

func slowWebsiteChecker(url string) bool {
	time.Sleep(20 * time.Millisecond)
	return true
}

func BenchmarkCheckWebsite(b *testing.B) {
	testUrls := make([]string, 100)
	for i := range testUrls {
		testUrls[i] = "a url"
	}

	for b.Loop() {
		CheckWebsites(slowWebsiteChecker, testUrls)
	}
}
