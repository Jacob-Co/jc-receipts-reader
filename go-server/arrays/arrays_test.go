package arrays

import (
	"slices"
	"testing"
)

func TestArrays(t *testing.T) {
	t.Run("Should get sum of 6 numbers", func(t *testing.T) {
		numbers := []int{1, 2, 3, 4, 5, 6}

		got := Sum(numbers)
		want := 21

		if got != want {
			t.Errorf("got %v, want %v, for %v", got, want, numbers)
		}
	})
}

func TestSumAll(t *testing.T) {
	t.Run("Should get sum of 6 numbers", func(t *testing.T) {
		numbers1 := []int{1, 2, 3, 4, 5, 6}
		numbers2 := []int{11, 11}
		numbers3 := []int{100, 11}

		got := SumAll(numbers1, numbers2, numbers3)
		want := []int{21, 22, 111}

		if !slices.Equal(got, want) {
			t.Errorf("got %v, want %v, for %v", got, want, [][]int{numbers1, numbers2, numbers3})
		}
	})
}

func TestSumAllTails(t *testing.T) {

	checkSum := func(t testing.TB, got []int, want []int, testArgs [][]int) {
		t.Helper()
		if !slices.Equal(got, want) {
			t.Errorf("got %v, want %v, for %v", got, want, testArgs)
		}
	}

	t.Run("Summation of all sets except first element", func(t *testing.T) {
		numbers1 := []int{1, 2, 3, 4, 5, 6}
		numbers2 := []int{2, 11, 11}
		numbers3 := []int{2, 100, 11}

		got := SumAllTails(numbers1, numbers2, numbers3)
		want := []int{20, 22, 111}

		checkSum(t, got, want, [][]int{numbers1, numbers2, numbers3})
	})

	t.Run("If set is empty return 0 for that set", func(t *testing.T) {
		numbers1 := []int{}
		numbers2 := []int{}
		numbers3 := []int{}

		got := SumAllTails(numbers1, numbers2, numbers3)
		want := []int{0, 0, 0}

		checkSum(t, got, want, [][]int{numbers1, numbers2, numbers3})
	})

	t.Run("If set is length 1 return 0 for that set", func(t *testing.T) {
		numbers1 := []int{1}
		numbers2 := []int{2}
		numbers3 := []int{3}

		got := SumAllTails(numbers1, numbers2, numbers3)
		want := []int{0, 0, 0}

		checkSum(t, got, want, [][]int{numbers1, numbers2, numbers3})
	})
}

func BenchmarkRepeat(b *testing.B) {
	for b.Loop() {
		numbers1 := []int{1, 2, 3, 4, 5, 6}
		numbers2 := []int{11, 11}
		numbers3 := []int{100, 11}

		SumAll(numbers1, numbers2, numbers3)
	}
}
