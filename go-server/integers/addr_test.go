package integers

import (
	"fmt"
	"testing"
)

func TestAdd(t *testing.T) {
	t.Run("Return 4 for 2 and 2", func(t *testing.T) {
		get := Add(2, 2)
		want := 4

		if get != want {
			t.Errorf("Get %q, Want %q", get, want)
		}
	})
}

func ExampleAdd() {
	sum := Add(4, 10)
	fmt.Print(sum)
	//output: 14
}
