package concurrency

type WebsiteChecker func(string) bool
type result struct {
	Url     string
	IsFound bool
}

func CheckWebsites(wc WebsiteChecker, urls []string) map[string]bool {
	results := make(map[string]bool)
	resultChannel := make(chan result)

	for _, url := range urls {
		go func() {
			resultChannel <- result{url, wc(url)}
		}()
	}

	for range urls {
		r := <-resultChannel
		results[r.Url] = r.IsFound
	}

	return results
}
