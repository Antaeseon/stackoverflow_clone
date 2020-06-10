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
	r.GET("/", h.GetMainPage)
	//get products
	r.GET("/products", h.GetProducts)
	//get promos
	r.GET("/promos", h.GetPromos)

	r.GET("/persons", GET)

	userGroup := r.Group("/user")
	{
		userGroup.POST("/:id/signout", h.SignOut)
		userGroup.GET("/:id/orders", h.GetOrders)
	}

	usersGroup := r.Group("/users")
	{
		usersGroup.POST("/charge", h.Charge)
		usersGroup.POST("/signin", h.SignIn)
		usersGroup.POST("", h.AddUser)
	}
	return r.Run(address)
}
