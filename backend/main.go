package main

import (
	"github.com/Molaryy/bective/db"
	"github.com/Molaryy/bective/utils"
	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDb()

	r := gin.Default()
	router(r)
	utils.CheckError(r.Run(":8080"))
}
