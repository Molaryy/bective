package models

import (
	"fmt"
	"github.com/Molaryy/bective/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

type Handler struct {
	DB *gorm.DB
}

func New(db *gorm.DB) Handler {
	return Handler{db}
}

func (h Handler) AddTodo(c *gin.Context) {
	var todo Todo

	utils.CheckError(c.ShouldBindJSON(&todo))
	fmt.Println(todo)
	if result := h.DB.Create(&todo); result.Error != nil {
		fmt.Println(result.Error)
	}
	c.JSON(http.StatusCreated, gin.H{
		"created": todo,
	})
}

func (h Handler) DeleteTodo(c *gin.Context) {
	var todo Todo
	todoId, _ := strconv.Atoi(c.Param("id"))
	statusCode := http.StatusAccepted

	if result := h.DB.First(&todo, todoId); result.Error != nil {
		fmt.Println(result.Error)
	}
	h.DB.Delete(&todo)
	c.JSON(statusCode, gin.H{
		"message": "Successfully deleted",
	})
}
