package countdown

import (
	"io"
	"time"
)

type Pause func(time.Duration)

func Countdown(out io.Writer, pause Pause) {
	timeInterval := 1 * time.Millisecond
	out.Write([]byte("3\n"))
	pause(timeInterval)
	out.Write([]byte("2\n"))
	pause(timeInterval)
	out.Write([]byte("1\n"))
	pause(timeInterval)
	out.Write([]byte("Go"))
}
