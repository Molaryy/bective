package main

import (
	"github.com/Molaryy/bective/db"
	"github.com/Molaryy/bective/middleware"
	"github.com/Molaryy/bective/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func RouteNotFound(c *gin.Context) {
	c.JSON(http.StatusNotFound, gin.H{"message": "The page that you are trying to reach doesn't exist"})
}

func todosHandler(r *gin.Engine) {
	DB := db.InitDb()
	handler := models.New(DB)

	r.POST("/todo", handler.AddTodo)
	r.DELETE("/todo/:id", handler.DeleteTodo)
	r.GET("/todos", handler.GetAllTodos)
	r.GET("/todo/:id", handler.GetTodo)
	r.PATCH("/todo/:id", handler.UpdateTodo)
}

func authHandler(r *gin.Engine) {
	r.POST("/register", middleware.AuthController)
}

func router(r *gin.Engine) {
	r.Use(middleware.CORSMiddleware())
	authHandler(r)
	todosHandler(r)
	r.NoRoute(RouteNotFound)
}
