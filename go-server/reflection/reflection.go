package reflection

import "reflect"

func Walk(anyStruct interface{}, walkFn func(string)) {
	val := reflect.ValueOf(anyStruct)

	walkValue := func(val reflect.Value) {
		Walk(val.Interface(), walkFn)
	}

	switch val.Kind() {
	case reflect.Pointer:
		walkValue(val.Elem())
	case reflect.Slice, reflect.Array:
		for i := 0; i < val.Len(); i++ {
			walkValue(val.Index(i))
		}
	case reflect.Struct:
		for i := 0; i < val.NumField(); i++ {
			walkValue(val.Field(i))
		}
	case reflect.String:
		walkFn(val.String())
	case reflect.Map:
		for _, key := range val.MapKeys() {
			walkValue(val.MapIndex(key))
		}
	case reflect.Chan:
		chanVal, isOpen := val.Recv()
		if isOpen {
			walkValue(chanVal)
			walkValue(val)
		}
	case reflect.Func:
		retVals := val.Call([]reflect.Value{})
		for _, retVal := range retVals {
			walkValue(retVal)
		}
	}
}
