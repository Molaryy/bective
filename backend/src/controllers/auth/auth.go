package auth

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func AuthUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "do ypu really wanna authenticate",
	})
}
