package models

import "gorm.io/gorm"

type User struct {
	Id       int    `json:"id" gorm:"primary_key;"`
	Username string `json:"username" gorm:"size:255;not null;unique"`
	Password string `json:"password" gorm:"size:255;not null;"`
	Email    string `json:"email" gorm:"not null;unique;"`
}

func (u *User) SaveUser() (*User, error) {
	var DB *gorm.DB
	var err error

	err = DB.Create(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}
