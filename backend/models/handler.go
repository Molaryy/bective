package models

import (
	"fmt"
	"github.com/Molaryy/bective/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"reflect"
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
		fmt.Printf("Todo with id: %v could't be found\n", todoId)
	}
	h.DB.Delete(&todo)
	c.JSON(statusCode, gin.H{
		"message": fmt.Sprintf("Successfully deleted with id: %v", todoId),
	})
}

func (h Handler) GetAllTodos(c *gin.Context) {
	var todos []Todo
	statusCode := http.StatusAccepted

	if result := h.DB.Find(&todos); result.Error != nil || len(todos) == 0 {
		statusCode = http.StatusNotFound
		fmt.Println("Couldn't find todos")
	}

	c.JSON(statusCode, gin.H{
		"todos": todos,
	})
}

func (h Handler) GetTodo(c *gin.Context) {
	var todo Todo
	todoId, _ := strconv.Atoi(c.Param("id"))
	statusCode := http.StatusAccepted

	if result := h.DB.First(&todo, todoId); result.Error != nil {
		fmt.Printf("Todo with id: %v could't be found\n", todoId)
		statusCode = http.StatusNotFound
	}

	if statusCode == http.StatusAccepted {
		c.JSON(statusCode, gin.H{
			"todo": todo,
		})
	} else {
		c.JSON(statusCode, gin.H{
			"message": fmt.Sprintf("Todo with id %v could't be found\n", todoId),
		})
	}
}

func (h Handler) UpdateTodo(c *gin.Context) {
	var updatedTodo Todo
	var storedTodo Todo
	todoId, _ := strconv.Atoi(c.Param("id"))
	statusCode := http.StatusAccepted

	utils.CheckError(c.Bind(&updatedTodo))
	if result := h.DB.First(&storedTodo, todoId); result.Error != nil {
		fmt.Printf("Todo with id: %v could't be found\n", todoId)
		statusCode = http.StatusNotFound
	}

	if statusCode == http.StatusAccepted {
		updatedTodoValue := reflect.ValueOf(updatedTodo)
		updatedTodoType := updatedTodoValue.Type()
		storedTodoValue := reflect.ValueOf(storedTodo)
		storedTodoType := storedTodoValue.Type()
		for i := 0; i < updatedTodoType.NumField(); i++ {
			if updatedTodoType.Field(i).Name == storedTodoType.Field(i).Name {
				fieldValue := updatedTodoValue.Field(i).Interface()
				if str, ok := fieldValue.(string); ok && str != "" {
					storedField := storedTodoValue.FieldByName(updatedTodoType.Field(i).Name)
					storedField.Set(reflect.ValueOf(fieldValue))
				}
			}
		}
		fmt.Println(storedTodo)
		c.JSON(statusCode, gin.H{
			"todo": storedTodo,
		})
		// h.DB.Save(&storedTodo)
	} else {
		c.JSON(statusCode, gin.H{
			"message": fmt.Sprintf("Todo with id %v could't be found\n", todoId),
		})
	}
}
