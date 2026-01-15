package main

import (
	"testing"
)

func TestHello(t *testing.T) {
	t.Run("Should greet name if present", func(t *testing.T) {
		got := Hello("Chris")
		want := "Hello, Chris"

		assertCorrectMessage(t, got, want)
	})

	t.Run("Should greet Hello World if empty string", func(t *testing.T) {
		got := Hello("")
		want := "Hello World"

		assertCorrectMessage(t, got, want)
	})
}

func assertCorrectMessage(t testing.TB, got string, want string) {
	t.Helper()
	if got != want {
		t.Errorf("got %q want %q", got, want)
	}
}
