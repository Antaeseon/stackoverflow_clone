// package main

// import (
// 	"log"

// 	"../rest"
// )

// func main() {
// 	log.Println("Main log....")
// 	log.Fatal(rest.RunAPI(":8000"))
// }

/* 신규 */
package main

import (
	"bytes"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	cors "github.com/itsjamie/gin-cors"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

type Person struct {
	Id        int    `json:"id"`
	FirstName string `json:"first_name" form:"first_name"`
	LastName  string `json:"last_name" form:"last_name"`
}

type board struct {
	Userid  int    `json:"userid"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

func (p Person) get() (person Person, err error) {

	row := db.QueryRow("SELECT id, first_name, last_name FROM person WHERE id=?", p.Id)
	err = row.Scan(&person.Id, &person.FirstName, &person.LastName)
	if err != nil {
		return
	}
	return
}

func (p Person) getAll() (persons []Person, err error) {
	rows, err := db.Query("SELECT id, first_name, last_name FROM person")
	if err != nil {
		return
	}
	for rows.Next() {
		var person Person
		rows.Scan(&person.Id, &person.FirstName, &person.LastName)
		persons = append(persons, person)
	}
	defer rows.Close()
	return
}

func (p Person) add() (Id int, err error) {
	stmt, err := db.Prepare("INSERT INTO person(first_name, last_name) VALUES (?, ?)")
	if err != nil {
		return
	}
	rs, err := stmt.Exec(p.FirstName, p.LastName)
	if err != nil {
		return
	}
	id, err := rs.LastInsertId()
	if err != nil {
		log.Fatalln(err)
	}
	Id = int(id)
	defer stmt.Close()
	return
}

func (p Person) update() (rows int, err error) {
	stmt, err := db.Prepare("UPDATE person SET first_name=?, last_name=? WHERE id=?")
	if err != nil {
		log.Fatalln(err)
	}
	rs, err := stmt.Exec(p.FirstName, p.LastName, p.Id)
	if err != nil {
		log.Fatalln(err)
	}

	row, err := rs.RowsAffected()
	if err != nil {
		log.Fatalln(err)
	}
	rows = int(row)
	defer stmt.Close()
	return
}

func (p Person) del() (rows int, err error) {
	stmt, err := db.Prepare("DELETE FROM person WHERE id=?")
	if err != nil {
		log.Fatalln(err)
	}

	rs, err := stmt.Exec(p.Id)
	if err != nil {
		log.Fatalln(err)
	}
	row, err := rs.RowsAffected()
	if err != nil {
		log.Fatalln(err)
	}
	defer stmt.Close()
	rows = int(row)
	return
}

func main() {
	var err error
	db, err = sql.Open("mysql", "root:1234@tcp(127.0.0.1:3306)/stackoverflow")
	if err != nil {
		log.Fatal(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal(err.Error())
	}

	router := gin.Default()

	router.Use(cors.Middleware(cors.Config{
		Origins:         "*",
		Methods:         "GET, PUT, POST, DELETE",
		RequestHeaders:  "Origin, Authorization, Content-Type",
		ExposedHeaders:  "",
		MaxAge:          50 * time.Second,
		Credentials:     true,
		ValidateHeaders: false,
	}))

	router.GET("/persons", func(c *gin.Context) {
		p := Person{}
		persons, err := p.getAll()
		if err != nil {
			log.Fatalln(err)
		}
		c.JSON(http.StatusOK, gin.H{
			"result": persons,
			"count":  len(persons),
		})

	})

	router.GET("/person/:id", func(c *gin.Context) {
		var result gin.H
		id := c.Param("id")

		Id, err := strconv.Atoi(id)
		if err != nil {
			log.Fatalln(err)
		}

		p := Person{
			Id: Id,
		}
		person, err := p.get()
		if err != nil {
			result = gin.H{
				"result": nil,
				"count":  0,
			}
		} else {
			result = gin.H{
				"result": person,
				"count":  1,
			}

		}
		c.JSON(http.StatusOK, result)
	})
	// curl http://127.0.0.1:8000/person -X POST -d '{"first_name": "rsj", "last_name": "你好"}' -H "Content-Type: application/json"
	router.POST("/person", func(c *gin.Context) {

		var p Person
		err := c.Bind(&p)
		if err != nil {
			log.Fatalln(err)
		}

		Id, err := p.add()
		if err != nil {
			log.Fatalln(err)
		}
		fmt.Println(Id)
		name := p.FirstName + " " + p.LastName
		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf(" %s successfully created", name),
		})

	})
	//  curl http://127.0.0.1:8000/person/1 -X PUT -d "first_name=admin&last_name=reg"
	router.PUT("/person/:id", func(c *gin.Context) {
		var (
			p      Person
			buffer bytes.Buffer
		)

		id := c.Param("id")
		Id, err := strconv.Atoi(id)
		if err != nil {
			log.Fatalln(err)
		}

		err = c.Bind(&p)
		if err != nil {
			log.Fatalln(err)
		}
		p.Id = Id
		rows, err := p.update()
		if err != nil {
			log.Fatalln(err)
		}
		fmt.Println(rows)
		buffer.WriteString(p.FirstName)
		buffer.WriteString(" ")
		buffer.WriteString(p.LastName)
		name := buffer.String()

		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("Successfully update to %s", name),
		})

	})

	router.DELETE("/person/:id", func(c *gin.Context) {
		id := c.Param("id")

		Id, err := strconv.ParseInt(id, 10, 10)
		if err != nil {
			log.Fatalln(err)
		}
		p := Person{Id: int(Id)}
		rows, err := p.del()
		if err != nil {
			log.Fatalln(err)
		}
		fmt.Println("delete rows ", rows)

		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("Successfully deleted user: %s", id),
		})
	})

	router.Run(":8000")

}
