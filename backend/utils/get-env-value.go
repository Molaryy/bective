package utils

import (
	"log"
	"os"
	"strings"
)

func GetEnvFileValue(envPath string, key string) string {
	var valueToReturn string = ""
	data, err := os.ReadFile(envPath)

	if err != nil {
		panic(err)
	}
	arrayFile := strings.Split(string(data), "\n")

	for _, line := range arrayFile {
		splitedString := strings.Split(line, "=")

		if len(splitedString) == 2 && splitedString[0] == key {
			valueToReturn = strings.TrimSuffix(splitedString[1], "\n")
		}
	}
	if valueToReturn == "" {
		log.Fatal("Nothing found for the key ", key)
	}
	return valueToReturn
}
