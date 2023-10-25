package main

import (
	"fmt"
	"github.com/Molaryy/bective/types"
	"github.com/Molaryy/bective/utils"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
)

func getDbUrl() string {
	dbUsr := utils.GetEnvFileValue("../.env", "POSTGRES_USER")
	dbHost := utils.GetEnvFileValue("../.env", "POSTGRES_HOST")
	dbPassword := utils.GetEnvFileValue("../.env", "POSTGRES_PASSWORD")
	dbName := utils.GetEnvFileValue("../.env", "POSTGRES_DB")

	return fmt.Sprintf("postgres://%s:%s@%s:5432/%s", dbUsr, dbPassword, dbHost, dbName)
}

func InitDb() *gorm.DB {
	dbURL := getDbUrl()
	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	utils.CheckError(db.AutoMigrate(&types.Todo{}))
	return db
}
