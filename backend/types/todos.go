package types

import (
	"encoding/json"
	"github.com/Molaryy/bective/utils"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"net/http"
	"os"
)

var todos Todos

type Todo struct {
	Id          int    `json:"id" gorm:"primaryKey"`
	Title       string `json:"title"`
	Description string `json:"description"`
	StartData   string `json:"startData"`
	EndData     string `json:"endData"`
}

type Todos struct {
	Todos []Todo `json:"todos"`
}

func (t *Todo) GetTodos(c *gin.Context) {

	fileBytes := utils.JsonToBytes("data/data.json")
	c.JSON(http.StatusOK, todos.FileToTodos(fileBytes))
}

func (h TodoHandler) CreateTodo(c *gin.Context) {
	fileBytes := utils.JsonToBytes("data/data.json")
	statusCode := http.StatusOK
	message := "You just created a todo"
	var todo Todo

	if len(todos.Todos) == 0 {
		utils.CheckError(json.Unmarshal(fileBytes, &todos))
	}

	if err := c.ShouldBindWith(&todo, binding.JSON); err != nil {
		statusCode = http.StatusUnprocessableEntity
		message = "Incorrect body"
	}

	todos.Todos = append(todos.Todos, todo)

	file, _ := json.MarshalIndent(todos.Todos, "", "")
	utils.CheckError(os.WriteFile("data/data.json", file, 0644))

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
