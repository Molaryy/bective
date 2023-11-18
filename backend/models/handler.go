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

func updateTodoFields(storedTodo *Todo, updatedTodo Todo) {
	storedValue := reflect.ValueOf(storedTodo).Elem()
	updatedValue := reflect.ValueOf(updatedTodo)

	for i := 0; i < storedValue.NumField(); i++ {
		field := storedValue.Type().Field(i)
		fieldName := field.Name
		storedFieldValue := storedValue.FieldByName(fieldName)
		updatedFieldValue := updatedValue.FieldByName(fieldName)

		if !reflect.DeepEqual(updatedFieldValue.Interface(), reflect.Zero(field.Type).Interface()) {
			storedFieldValue.Set(updatedFieldValue)
		}
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

	fmt.Println(updatedTodo)
	fmt.Println(storedTodo)
	if statusCode != http.StatusAccepted {
		c.JSON(statusCode, gin.H{
			"message": fmt.Sprintf("Todo with id %v could't be found\n", todoId),
		})
		return
	}
	updateTodoFields(&storedTodo, updatedTodo)
	// h.DB.Save(&storedTodo)
	fmt.Println(storedTodo)
	c.JSON(statusCode, gin.H{
		"todo": storedTodo,
	})
}
