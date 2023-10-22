package utils

import (
	"io"
	"os"
)

func JsonToBytes(filepath string) []byte {
	file, err := os.Open(filepath)

	if err != nil {
		panic(err)
	}
	fileByteValue, err := io.ReadAll(file)

	if err != nil {
		CheckError(file.Close())
		panic(err)
	}
	CheckError(file.Close())
	return fileByteValue
}
