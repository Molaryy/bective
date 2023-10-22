package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()
	router(r)
	err := r.Run()

	if err != nil {
		return
	}
}
