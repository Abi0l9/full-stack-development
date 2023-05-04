const typeDefs = `
    type AllAuthors {
        name: String!
		    born: String
        favouriteGenre: String
        booksCount: Int!
    }

    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }

    type Token {
      value: String!
    }

  type Query {
    booksCount: Int!
    authorsCount: Int!
    allBook: [Book!]!
    allAuthors: [AllAuthors!]!
    getGenres(author: String, genres: String) : [Book!]
    authorsList: [Author]!
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!) : Book
    editAuthor(name: String!, setBornTo: Int!) : Author
    addAuthor(name: String!, born: Int!) : Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Author {
    name: String!
    id: ID!
    born: String
    favouriteGenre: String
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Subscription {
    bookAdded: Book!
}

`;

module.exports = typeDefs;
