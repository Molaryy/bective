package main

import (
	"fmt"
	"os"
)

func InitDb() {
	dbUsr := os.Getenv("POSTGRES_USER")
	dbURL := "postgres://pg:pass@localhost:5432/crud"

	fmt.Println(dbUsr)
	fmt.Println(dbURL)
}
