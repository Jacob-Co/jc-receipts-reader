package countdown

import (
	"bytes"
	"testing"
	"time"
)

func TestCountdown(t *testing.T) {
	t.Run("outputs countdown", func(t *testing.T) {
		buf := bytes.Buffer{}
		Countdown(&buf, func(d time.Duration) {})
		got := buf.String()
		want := "3\n2\n1\nGo"

		if got != want {
			t.Errorf("got %s, want %s", got, want)
		}
	})

	t.Run("should call pause func in between counts", func(t *testing.T) {

		firstWrite := "3\n"
		secondWrite := "3\n2\n"
		thirdWrite := "3\n2\n1\n"

		buf := bytes.Buffer{}
		numOfCalls := 0
		checkPause := func(d time.Duration) {
			numOfCalls += 1
			switch numOfCalls {
			case 1:
				if buf.String() != firstWrite {
					t.Error("Did not call after first write")
				}
			case 2:
				if buf.String() != secondWrite {
					t.Error("Did not call after second write")
				}
			case 3:
				if buf.String() != thirdWrite {
					t.Error("Did not call after third write")
				}
			default:
				t.Error()
			}

		}

		Countdown(&buf, checkPause)
		got := numOfCalls
		want := 3

		if got != want {
			t.Errorf("got %v, want %v", got, want)
		}
	})
}
