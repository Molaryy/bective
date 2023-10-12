package todos

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetTodos(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"todos": "these are the todos",
	})
}

func CreateTodo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"todos": "You just created a todo",
	})
}
