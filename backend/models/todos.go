package models

type Todo struct {
	Id          int    `json:"id" gorm:"primary_key;"`
	Title       string `json:"title"`
	Description string `json:"description"`
	StartDate   string `json:"startDate"`
	EndDate     string `json:"endDate"`
}
