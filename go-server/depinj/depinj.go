package depinj

import (
	"io"
)

func Greet(writer io.Writer, name string) {
	writer.Write([]byte("Hello, " + name))
	// fmt.Fprintf(writer, "Hello, %s", name)
}
