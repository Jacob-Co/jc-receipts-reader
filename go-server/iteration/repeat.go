package iteration

import (
	"strings"
)

func Repeat(word string, times int) string {
	repeatedWord := strings.Builder{}
	var i int = 0
	for ; i < times; i++ {
		repeatedWord.WriteString(word)
	}

	return repeatedWord.String()
}
