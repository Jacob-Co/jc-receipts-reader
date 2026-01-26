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
			{
				"arrays",
				[2]Profile{
					{"John", 31},
					{"Marry", 28},
				},
				[]string{"John", "Marry"},
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

	t.Run("Should work for maps where orders is not guaranteed", func(t *testing.T) {
		walkFnCalls := []string{}
		walkFnSpy := func(field string) {
			walkFnCalls = append(walkFnCalls, field)
		}
		testMap := map[string]string{
			"Sheep": "bleat",
			"Cow":   "moo",
		}
		Walk(testMap, walkFnSpy)

		assertContains(t, walkFnCalls, "bleat")
		assertContains(t, walkFnCalls, "moo")
	})

	t.Run("Should work for channels", func(t *testing.T) {
		testChan := make(chan Profile)

		go func() {
			testChan <- Profile{"Jacob", 31}
			testChan <- Profile{"Isabel", 31}
			close(testChan)
		}()
		walkFnCalls := []string{}
		walkFnSpy := func(field string) {
			walkFnCalls = append(walkFnCalls, field)
		}
		want := []string{"Jacob", "Isabel"}

		Walk(testChan, walkFnSpy)

		if !slices.Equal(walkFnCalls, want) {
			t.Errorf("got %v, want %v", walkFnCalls, want)
		}
	})

	t.Run("Should for work for functions", func(t *testing.T) {
		aFunction := func() (Profile, Profile) {
			return Profile{"Berlin", 33}, Profile{"Katowice", 44}
		}

		var got []string
		want := []string{"Berlin", "Katowice"}

		Walk(aFunction, func(input string) {
			got = append(got, input)
		})

		if !slices.Equal(got, want) {
			t.Errorf("got %v, want %v", got, want)
		}
	})
}

func assertContains(t *testing.T, strSlice []string, strCheck string) {
	t.Helper()
	if !slices.Contains(strSlice, strCheck) {
		t.Errorf("missing %s inside %v", strCheck, strSlice)
	}
}

type Person struct {
	Name    string
	Profile Profile
}

type Profile struct {
	Addr string
	Age  int
}
