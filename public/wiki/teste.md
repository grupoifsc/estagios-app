
<h1 align="center">
  <br>
  <br>
  (Not Amazon) Bookstore API
  <br>
</h1>

<h4 align="center">A simple bookstore API built with Spring Boot</h4>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#install">Install</a> •
  <a href="#endpoints">Endpoints</a> •
  <a href="#credits">Credits</a> •
  <a href="pt-BR.md">PT-BR</a>
</p>

- - -

This project is ideal if you need a ready-to-use api to start building your frontend projects. It may also be useful if you want a starting point to learn and play around with Spring Boot. Developed as a web services learning exercise (CTDS / IFSC / 2023.1) 

## Features

* CRUD and filter endpoints
  - Create, read, update and delete your books
* Repricing endpoints
  - Reprice your books by given percentage rates
* Mock Datasource
  - You may add any other datasource or continue with a mock non persinting default
* Ready-to-use UI
  - Basic UI built with pure php, good for beginners learning to interact with APIs
* UI Language: Portuguese (PT-BR)



## Install

First, be sure you have the following installed on your machine: 
- [Java SDK 8+](https://openjdk.org/projects/jdk/17/)
- [Maven](https://maven.apache.org/)
- [PHP 8+](https://www.php.net/)
- [php-curl](https://www.php.net/)
- [lib-curl](https://curl.se/)

After that, from your command line:

```bash
# Clone this repository
$ git clone https://github.com/juhachmann/not_amazon_bookstore_api

# Go into the repository
$ cd not_amazon_bookstore_api

# Run the bash script
$ ./bookstore.sh
```

Open you browser and navigate to **_localhost:8000_**


You may also want to serve the backend and frontend independently: 

```bash
# Go into the repository backend source
$ cd not_amazon_bookstore_api/backend

# Install and serve your backend
$ mvn spring-boot:run

# Open another terminal

# Go into the repository frontend source
$ cd not_amazon_bookstore_api/frontend

# Serve yout frontend
$ php -S localhost:8000
```

Or open and run from your favorite IDEs


## Endpoints

| Method | Endpoint | Description | Request Body | 
|------|-------|-----------|-----|
| POST | /books | create new book | [Book](#Book) (without id)| 
| GET | /books | see all books |  |
| GET | /books?contains= | filter by contains |  | 
| GET | /books?author= | filter by author | | 
| GET | /books?title= | filter by title | |
| GET | /books?isbn= | find by ISBN  | 
| GET | /books/{id} | find by id | | 
| PUT | /books/{id} | update book | [Book](#Book) (without id) | 
| DELETE | /books/{id} | delete book | | 
| DELETE | /books | delete ALL books | | 
| PUT | /reprices/{rate} | adjust all prices  | | 
| PUT | /reprices/{rate}/books/{id} | adjust price  | |

### Book

```json
{
  "id" : 1,
  "isbn": "isbn",
  "author": "Author Name",
  "title": "Book Title",
  "publisher": "Publisher Name",
  "price": 100.99,
  "imageUrl": "image/url.png"
}
```

### curl for endpoints

```bash
# Ajdust base url and port if needed

curl -XGET 'localhost:8081/books'

curl -XGET 'localhost:8081/books?contains='

curl -XGET 'localhost:8081/books?author='

curl -XGET 'localhost:8081/books?title='

curl -XGET 'localhost:8081/books?isbn='

curl -XGET 'localhost:8081/books/{id}'

curl -XDELETE 'localhost:8081/books'

curl -XDELETE 'localhost:8081/books/{id}'

curl -XPUT 'localhost:8081/reprices/{rate}'

curl -XPUT 'localhost:8081/reprices/{rate}/books/{id}'

curl -XPUT -H "Content-type: application/json" -d '{
	"isbn" : "isbn",
	"author" : "Author Name",
	"title" : "Book Title",
	"publisher" : "Publisher Name",
	"price" : 100.99,
	"imageUrl" : "image/url.png"
}' 'localhost:8081/books/id'

curl -XPOST -H "Content-type: application/json" -d '{
	"isbn" : "isbn",
	"author" : "Author Name",
	"title" : "Book Title",
	"publisher" : "Publisher Name",
	"price" : 100.99,
	"imageUrl" : "image/url.png"
}' 'localhost:8081/books'
```

## Credits

This software uses the following 3rd party packages and tools:

- [SpringBoot](https://spring.io/projects/spring-boot)
- [CurlBuilder](https://curlbuilder.com)
- [CodeBeautify](https://codebeautify.org/curl-to-php-online)
- [Bootstrap](https://getbootstrap.com/)