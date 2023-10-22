package main

import (
	"bective/types"
	"github.com/gin-gonic/gin"
	"net/http"
)

func RouteNotFound(c *gin.Context) {
	c.JSON(http.StatusNotFound, gin.H{"message": "Page not found"})
}

func todosHandler(r *gin.Engine) {
	todo := new(types.Todo)
	r.GET("/todos", todo.GetTodos)
	r.POST("/todo", todo.CreateTodo)
}

func router(r *gin.Engine) {

	r.POST("/auth", AuthController)
	todosHandler(r)
	r.NoRoute(RouteNotFound)
}
