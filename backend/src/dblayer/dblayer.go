package dblayer

import (
	"errors"

	"../models"
)

type DBLayer interface {
	GetCustomerByName(string, string) (models.Customer, error)
	GetCustomerByID(int) (models.Customer, error)
	AddUser(models.Customer) (models.Customer, error)
	SignInUser(username, password string) (models.Customer, error)
	SignOutUserById(int) error
}

var ErrINVALIDPASSWORD = errors.New("Invalid password")
