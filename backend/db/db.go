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
	envPath := "../.env"
	dbUsr := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")

	if dbUsr == "" {
		dbUsr = utils.GetEnvFileValue(envPath, "POSTGRES_USER")
	}
	if dbPassword == "" {
		dbPassword = utils.GetEnvFileValue(envPath, "POSTGRES_PASSWORD")
	}
	if dbName == "" {
		dbName = utils.GetEnvFileValue(envPath, "POSTGRES_DB")
	}
	return fmt.Sprintf("postgres://%s:%s@database:5432/%s", dbUsr, dbPassword, dbName)
}

func InitDb() *gorm.DB {
	dbURL := getDbUrl()
	fmt.Println(dbURL)
	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}
	utils.CheckError(db.AutoMigrate(&models.Todo{}))
	return db
}
