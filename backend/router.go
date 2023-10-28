package main

import (
	"github.com/Molaryy/bective/db"
	"github.com/Molaryy/bective/middlewares"
	"github.com/Molaryy/bective/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func RouteNotFound(c *gin.Context) {
	c.JSON(http.StatusNotFound, gin.H{"message": "Bruh not found"})
}

func todosHandler(r *gin.Engine) {
	DB := db.InitDb()
	handler := models.New(DB)

	r.POST("/todo", handler.AddTodo)
	r.DELETE("/todo/:id", handler.DeleteTodo)
}

func router(r *gin.Engine) {

	r.POST("/auth", middlewares.AuthController)
	todosHandler(r)
	r.NoRoute(RouteNotFound)
}
