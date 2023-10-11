package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func helloController(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func main() {
	r := gin.Default()
	router(r)
	err := r.Run()

	if err != nil {
		return
	}
}
