package dictionary

type dictionary struct {
	lookup map[string]string
}

func NewDictionary() dictionary {
	return dictionary{map[string]string{}}
}

func (d *dictionary) Store(word string, definition string) {
	d.lookup[word] = definition
}

func (d *dictionary) Search(word string) (string, error) {
	definition, ok := d.lookup[word]

	if !ok {
		return definition, ErrDefinitionNotFound
	}

	return definition, nil
}

var ErrDefinitionNotFound = DictionaryError("Definition Not Found")

type DictionaryError string

func (dE DictionaryError) Error() string {
	return string(dE)
}
