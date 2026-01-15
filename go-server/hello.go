package main

func Hello(name string) string {
	if name == "" {
		return "Hello World"
	}

	return "Hello, " + name
}

// func main() {
// 	fmt.Print(Hello("Jacob"))
// }
