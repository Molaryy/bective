package types

import "gorm.io/gorm"

type TodoHandler struct {
	DB *gorm.DB
}

func NewTodo(db *gorm.DB) TodoHandler {
	return TodoHandler{db}
}
