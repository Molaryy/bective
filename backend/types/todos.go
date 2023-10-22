package types

import (
	"bective/utils"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"net/http"
	"os"
)

var todos Todos

type Todo struct {
	Id          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type Todos struct {
	Todos []Todo `json:"todos"`
}

func (t *Todo) GetTodos(c *gin.Context) {

	fileBytes := utils.JsonToBytes("data/data.json")
	c.JSON(http.StatusOK, todos.FileToTodos(fileBytes))
}

func (t *Todo) CreateTodo(c *gin.Context) {
	fileBytes := utils.JsonToBytes("data/data.json")
	statusCode := http.StatusOK
	message := "You just created a todo"
	var todo Todo
	file, err := os.OpenFile("data/data.json", os.O_WRONLY, 4)
	var todosBytes []byte

	defer file.Close()
	if err != nil {
		statusCode = http.StatusServiceUnavailable
		message = "Couldn't access data"
	}

	if len(todos.Todos) == 0 {
		utils.CheckError(json.Unmarshal(fileBytes, &todos))
	}

	if err := c.ShouldBindWith(&todo, binding.JSON); err != nil {
		statusCode = http.StatusUnprocessableEntity
		message = "Incorrect body"
	}

	todos.Todos = append(todos.Todos, todo)
	todosBytes, errJSON := json.Marshal(todos)
	if errJSON != nil {
		statusCode = http.StatusServiceUnavailable
		message = "Couldn't access data"
	}
	fmt.Println(todos.Todos)
	file.Write(todosBytes)

	c.JSON(statusCode, gin.H{
		"message": message,
	})
}

func (t *Todos) FileToTodos(fileByteValue []byte) Todos {
	if len(todos.Todos) == 0 {
		utils.CheckError(json.Unmarshal(fileByteValue, &todos))
	}
	return todos
}

func (t *Todos) TodosToFile() Todos {
	var todos Todos
	return todos
}
