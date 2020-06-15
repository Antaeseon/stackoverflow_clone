package rest

import (
	"github.com/gin-gonic/gin"
)

func RunAPI(address string) error {
	//Get gin's default engine
	r := gin.Default()
	//Define a handler
	h, _ := NewHandler()
	//load homepage

	userGroup := r.Group("/user")
	{
		userGroup.POST("/:id/signout", h.SignOut)
	}

	usersGroup := r.Group("/users")
	{
		usersGroup.POST("/signin", h.SignIn)
		usersGroup.POST("", h.AddUser)
	}
	return r.Run(address)
}
