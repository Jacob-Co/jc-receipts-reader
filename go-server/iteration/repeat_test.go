package iteration

import (
	"testing"
)

func TestRepeat(t *testing.T) {
	t.Run("Should output given word and how many times", func(t *testing.T) {
		got := Repeat("a", 10)
		want := "aaaaaaaaaa"

		if got != want {
			t.Errorf("got %q, want %q", got, want)
		}
	})
}

func BenchmarkRepeat(b *testing.B) {
	for b.Loop() {
		Repeat("makeup", 1000)
	}
}
