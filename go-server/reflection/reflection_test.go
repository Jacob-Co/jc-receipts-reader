package reflection

import (
	"slices"
	"testing"
)

func TestWalk(t *testing.T) {
	t.Run("Should call passed fn for all string fields in a given struct", func(t *testing.T) {
		tests := []struct {
			Name          string
			Input         interface{}
			ExpectedCalls []string
		}{
			{
				"struct with one string fields",
				struct{ Name string }{"Jacob"},
				[]string{"Jacob"},
			},
			{
				"struct with two string fields",
				struct {
					Name string
					Addr string
				}{"Jacob", "Trag"},
				[]string{"Jacob", "Trag"},
			},
			{
				"struct with a num field",
				struct {
					Name string
					Age  int
				}{
					"Jacob",
					31,
				},
				[]string{"Jacob"},
			},
			{
				"struct with a nested field",
				Person{
					"Jacob",
					Profile{
						"Fifi",
						31,
					},
				},
				[]string{"Jacob", "Fifi"},
			},
			{
				"pointer struct with a nested field",
				&Person{
					"Jacob",
					Profile{
						"Fifi",
						31,
					},
				},
				[]string{"Jacob", "Fifi"},
			},
			{
				"slices struct with a nested field",
				[]Person{
					{
						"Jacob",
						Profile{
							"Fifi",
							31,
						},
					},
					{
						"Isabel",
						Profile{
							"Fifi",
							27,
						},
					},
				},
				[]string{"Jacob", "Fifi", "Isabel", "Fifi"},
			},
		}

		for _, test := range tests {
			got := []string{}

			Walk(test.Input, func(field string) {
				got = append(got, field)
			})

			if !slices.Equal(got, test.ExpectedCalls) {
				t.Errorf("got %v, want %v", got, test.ExpectedCalls)
			}
		}
	})
}

type Person struct {
	Name    string
	Profile Profile
}

type Profile struct {
	Addr string
	Age  int
}
