# Library API 📚️

[![Felipe Silva](https://camo.githubusercontent.com/80631930a5c39268997fd1d2de66923da9dec2ff9aefedfc31851aaffe50798a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d61646525323062792d46656c69706525323053696c76612d3645343043393f7374796c653d666c61742d737175617265)](https://camo.githubusercontent.com/80631930a5c39268997fd1d2de66923da9dec2ff9aefedfc31851aaffe50798a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d61646525323062792d46656c69706525323053696c76612d3645343043393f7374796c653d666c61742d737175617265)

## Sobre o projeto

A ideia desse projeto foi criar uma simples API de uma livraria, que fosse possível criar, buscar, atualizar e deletar categorias, autores e os livros desses autores, com o intuito de praticar novos conhecimentos sobre testes automatizados (unitários e de integração) com [Jest](https://jestjs.io/pt-BR/) e a utilização de cache na aplicação com [Redis](https://redis.io/).

A aplicação foi construída em Typescript e Node.js com Express.js como framework, na parte de armazenamento dos dados foi utilizado Postgres com TypeORM para manipulação e Redis para armazenamento de cache, para a infraestrutura do projeto utilizei Docker para "contêinerizar" toda aplicação e evitar problemas. O projeto também contou com dezenas de testes unitários e de integração, garantindo bom funcionamento do código.  

## Rotas

```
// Category
[GET] /api/category/       (lista todas as categorias)
[POST] /api/category/      (cria uma nova categoria de livros)
[PUT] /api/category/:id    (atualiza uma categoria)
[DELETE] /api/category/:id (deleta uma categoria)

// Author
[GET] /api/author/:id    (busca um author pelo id)
[GET] /api/author/       (lista os autores existentes) (query params: limit, offset)
[POST] /api/author/      (cria um novo autor)
[PUT] /api/author/:id    (atualiza um autor)
[DELETE] /api/author/:id (deleta um autor)

// Book
[GET] /api/book/:id                (busca um livro pelo id)
[POST] /api/book/                  (cria um novo livro)
[GET] /api/book/author/:author_id  (lista todos os livros de um autor)
```

## Tecnologias e ferramentas

A aplicação foi construída utilizando:

- [Typescript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/pt-BR/)
- [Redis](https://redis.io/)

## Instalação e uso

Para clonar e rodar o projeto é necessário ter o [docker](https://www.docker.com/) e [docker-compose](https://docs.docker.com/compose/) instalados em sua máquina, após isso siga as instruções:

```bash
# Abra um terminal e copie este repositório com o comando:
$ git clone https://github.com/felpssc/library_api.git

# Entre na pasta raiz do projeto e suba o contâiner com:
$ docker-compose up --build -d

# Caso a aplicação não tenham iniciado, rode:
$ docker-compose start

# Acesse http://localhost:3000/api no seu navegador.
```

---

[![LinkedIn](https://img.shields.io/badge/-Felipe%20Silva-6E40C9?style=flat-square&logo=Linkedin&logoColor=white&link=https://https://www.linkedin.com/in/felipesilva-1/)](https://img.shields.io/badge/-Felipe%20Silva-6E40C9?style=flat-square&logo=Linkedin&logoColor=white&link=https://https://www.linkedin.com/in/felipesilva-1/)

[![Gmail](https://img.shields.io/badge/-carlosfelipesilva.fs@gmail.com-6E40C9?style=flat-square&logo=Gmail&logoColor=white&link)](mailto:carlosfelipesilva.fs@gmail.com)