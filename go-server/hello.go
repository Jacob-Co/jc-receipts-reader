package main

const (
	spanish = "Spanish"
	french  = "French"

	defaultGreeting = "Hello"
	spanishGreeting = "Hola"
	frenchGreeting  = "Bonjour"
)

func Hello(name string, language string) string {
	if name == "" {
		name = " World"
	} else {
		name = ", " + name
	}

	return getGreeting(language) + name
}

func getGreeting(language string) (greeting string) {
	switch language {
	case spanish:
		greeting = spanishGreeting
	case french:
		greeting = frenchGreeting
	default:
		greeting = defaultGreeting
	}
	return
}

// func main() {
// 	fmt.Print(Hello("Jacob"))
// }
