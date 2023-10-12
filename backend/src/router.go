package main

import (
	"bective/src/controllers/auth"
	"bective/src/controllers/todos"
	"github.com/gin-gonic/gin"
	"net/http"
)

func RouteNotFound(c *gin.Context) {
	c.JSON(http.StatusNotFound, gin.H{"message": "Page not found"})
}

func router(r *gin.Engine) {
	r.POST("/auth", auth.AuthController)
	r.GET("/todos", todos.GetTodos)
	r.POST("/todo", todos.GetTodos)

	r.NoRoute(RouteNotFound)
}
