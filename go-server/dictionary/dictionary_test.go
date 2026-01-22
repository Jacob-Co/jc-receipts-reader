package dictionary

import (
	"testing"
)

func TestDictionary(t *testing.T) {
	t.Run("Should return stored definition", func(t *testing.T) {
		dictionary := NewDictionary()
		pencilDefinition := "Tool for writing"
		dictionary.Store("Pencil", pencilDefinition)

		got, err := dictionary.Search("Pencil")
		want := pencilDefinition

		assertNoError(t, err)
		assertString(t, got, want)
	})

	t.Run("Should error if definition is not found", func(t *testing.T) {
		dictionary := NewDictionary()
		pencilDefinition := "Tool for writing"
		dictionary.Store("Pencil", pencilDefinition)

		_, err := dictionary.Search("Test")
		want := ErrDefinitionNotFound

		assertError(t, err, want)
	})
}

func assertNoError(t *testing.T, got error) {
	t.Helper()
	if got != nil {
		t.Fatal("Should not return an error")
	}
}

func assertError(t *testing.T, got, want error) {
	t.Helper()
	if got == nil {
		t.Fatal("Expected an error")
	}

	if got != want {
		t.Errorf("got %s, want %s", got, want)
	}
}

func assertString(t *testing.T, got, want string) {
	t.Helper()
	if got != want {
		t.Errorf("got %s, want %s", got, want)
	}
}
