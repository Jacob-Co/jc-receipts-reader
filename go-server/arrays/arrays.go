package arrays

func Sum(numbers []int) int {
	acc := 0
	for _, i := range numbers {
		acc += i
	}
	return acc
}

func SumAll(numberSets ...[]int) []int {
	accSet := make([]int, len(numberSets))
	for i, set := range numberSets {
		accSet[i] = Sum(set)
	}
	return accSet
}

func SumAllTails(numberSets ...[]int) []int {
	accSet := make([]int, len(numberSets))
	for i, set := range numberSets {
		if len(set) < 1 {
			accSet[i] = 0
			continue
		}
		accSet[i] = Sum(set[1:])
	}
	return accSet
}
