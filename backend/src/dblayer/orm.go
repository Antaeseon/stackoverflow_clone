package dblayer

import (
	"errors"
	"fmt"

	"../models"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type DBORM struct {
	*gorm.DB
}

func NewORM(dbname, con string) (*DBORM, error) {
	db, err := gorm.Open(dbname, con+"?parseTime=true")
	return &DBORM{
		DB: db,
	}, err
}

func (db *DBORM) GetCustomerByName(firstname string, lastname string) (customer models.Customer, err error) {
	return customer, db.Where(&models.Customer{FirstName: firstname, LastName: lastname}).Find(&customer).Error
}

func (db *DBORM) GetCustomerByID(id int) (customer models.Customer, err error) {
	return customer, db.First(&customer, id).Error
}

func (db *DBORM) AddUser(customer models.Customer) (models.Customer, error) {
	fmt.Println("회원가입 변환 전 : ", customer.Pass)
	hashPassword(&customer.Pass)
	fmt.Println("회원가입 변환 후 : ", customer.Pass)
	customer.LoggedIn = true
	err := db.Create(&customer).Error
	customer.Pass = ""
	return customer, err
}

func hashPassword(s *string) error {
	if s == nil {
		return errors.New("Reference provided for hashing password is nil")
	}
	sBytes := []byte(*s)
	hashedBytes, err := bcrypt.GenerateFromPassword(sBytes, bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	*s = string(hashedBytes[:])
	return nil
}

func (db *DBORM) SignInUser(email, pass string) (customer models.Customer, err error) {

	result := db.Table("Customers").Where(&models.Customer{Email: email})
	fmt.Println(result.Rows())

	err = result.First(&customer).Error
	if err != nil {
		return customer, err
	}
	fmt.Println("asdfasdf123", customer.Email)
	if !checkPassword(customer.Pass, pass) {
		return customer, ErrINVALIDPASSWORD
	}

	customer.Pass = ""
	err = result.Update("loggedin", 1).Error
	if err != nil {
		return customer, err
	}
	//return the new customer row
	customer.LoggedIn = true
	return customer, result.Find(&customer).Error
}

func checkPassword(existingHash, incomingPass string) bool {
	//this method will return an error if the hash does not match the provided password string
	fmt.Println(existingHash, " 흠흠 ", incomingPass)
	return bcrypt.CompareHashAndPassword([]byte(existingHash), []byte(incomingPass)) == nil
}

func (db *DBORM) SignOutUserById(id int) error {
	customer := models.Customer{
		Model: gorm.Model{
			ID: uint(id),
		},
	}
	return db.Table("Customers").Where(&customer).Update("loggedin", 0).Error
}
