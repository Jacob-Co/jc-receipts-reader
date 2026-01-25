package reflection

import "reflect"

func Walk(anyStruct interface{}, walkFn func(string)) {
	val := getValue(anyStruct)

	if val.Kind() == reflect.Slice {
		for i := 0; i < val.Len(); i++ {
			Walk(val.Index(i).Interface(), walkFn)
		}
		return
	}

	for i := 0; i < val.NumField(); i++ {
		field := val.Field(i)
		switch field.Kind() {
		case reflect.String:
			walkFn(field.String())
		case reflect.Struct:
			Walk(field.Interface(), walkFn)
		}
	}
}

func getValue(anyStruct interface{}) reflect.Value {
	val := reflect.ValueOf(anyStruct)

	if val.Kind() == reflect.Pointer {
		val = val.Elem()
	}

	return val
}
