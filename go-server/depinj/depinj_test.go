package depinj

import (
	"bytes"
	"testing"
)

func TestDepinj(t *testing.T) {
	t.Run("Should write greeting to provided output", func(t *testing.T) {
		buf := bytes.Buffer{}
		Greet(&buf, "Chris")
		got := buf.String()
		want := "Hello, Chris"

		if got != want {
			t.Errorf("got %s, want %s", got, want)
		}
	})
}

func BenchmarkTestInj(b *testing.B) {
	for b.Loop() {
		buf := bytes.Buffer{}
		Greet(&buf, "Chris")
	}
}
