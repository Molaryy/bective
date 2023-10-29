package db

import (
	"fmt"
	"github.com/Molaryy/bective/models"
	"github.com/Molaryy/bective/utils"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

func getDbUrl() string {
	dbUsr := os.Getenv("POSTGRES_USER")
	dbHost := os.Getenv("POSTGRES_HOST")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")

	return fmt.Sprintf("postgres://%s:%s@%s:5432/%s", dbUsr, dbPassword, dbHost, dbName)
}

func InitDb() *gorm.DB {
	dbURL := getDbUrl()
	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}
	utils.CheckError(db.AutoMigrate(&models.Todo{}))
	return db
}
