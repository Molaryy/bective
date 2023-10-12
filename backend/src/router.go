package main

import (
	"bective/src/controllers/auth"
	"github.com/gin-gonic/gin"
)

func router(r *gin.Engine) {
	r.GET("/", helloController)
	r.POST("/auth", auth.AuthUser)
}
