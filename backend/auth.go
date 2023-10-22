package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func AuthController(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "do ypu really wanna authenticate",
	})
}
