const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const Author = require("./models/Author");
const Book = require("./models/Book");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

require("./db");

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

/*
  you can remove the placeholder query once your first own has been implemented 
*/

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

`;

const resolvers = {
  Query: {
    booksCount: async () => {
      const books = await Book.find({});
      return books.length;
    },
    authorsCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },
    allBook: async () => {
      const bookList = await Book.find({});
      const all = bookList.map(async (book) => {
        const author = await Author.findById(book.author.toString());
        return {
          id: book._id.toString(),
          title: book.title,
          published: book.published,
          genres: book.genres,
          author,
        };
      });
      return all;
    },

    allAuthors: async () => {
      const authors = await Author.find({});
      const result = authors.map(async (author) => {
        const allBooks = await Book.find({});
        const booksCount = allBooks.filter(
          (book) => book.author.toString() === author.id
        );

        return {
          name: author.name,
          born: author.born,
          booksCount: booksCount.length,
        };
      });

      return result;
    },
    authorsList: async () => Author.find({}),
    getGenres: async (root, args) => {
      const authorsQuery = args.author;
      const genresQuery = args.genres;

      const savedBooks = await Book.find({});
      const author = await Author.findOne({ name: args.author });
      const authors = await Author.find({});

      if (authorsQuery && genresQuery) {
        if (!author) {
          throw new GraphQLError("Author not found!");
        }
        const authorId = author._id.toString();

        return savedBooks.filter(
          (book) =>
            book.author.toString() === authorId &&
            book.genres.includes(genresQuery)
        );
      } else if (authorsQuery) {
        if (!author) {
          throw new GraphQLError("Author not found!");
        }
        const authorId = author._id.toString();
        const result = savedBooks.filter(
          (book) => book.author.toString() === authorId
        );
        return result;
      } else if (genresQuery) {
        const result = savedBooks.filter((book) =>
          book.genres.includes(genresQuery)
        );
        const final = result.map((b) => {
          const author = authors.find((a) => {
            return a._id.toString() === b.author.toString();
          });

          return {
            title: b.title,
            genres: b.genres,
            published: b.published,
            id: b.id,
            author,
          };
        });

        return final;
      }
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError(
          "You have no permission to perform this action",
          {
            extensions: {
              code: "AUTHENTICATION_FAILED",
            },
          }
        );
      }
      const authorExists = await Author.findOne({ name: args.author });

      let author;

      if (!authorExists) {
        const newAuthor = new Author({ name: args.author });
        await newAuthor.save();
        author = newAuthor;
      }

      try {
        const newBook = new Book({ ...args, author: authorExists || author });
        await newBook.save();
        return newBook;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      const authorExists = await Author.findOne({ name: args.name });

      if (!authorExists) {
        throw new GraphQLError("Author not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }

      if (!currentUser) {
        throw new GraphQLError(
          "You have no permission to perform this action",
          {
            extensions: {
              code: "AUTHENTICATION_FAILED",
            },
          }
        );
      }

      if (args.setBornTo) {
        await Author.findByIdAndUpdate(authorExists._id.toString(), {
          born: args.setBornTo,
        });
      } else {
        throw new GraphQLError("setBornTo field cannot be empty", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.setBornTo,
          },
        });
      }
      return { name: args.name, born: args.setBornTo };
    },
    addAuthor: async (root, args) => {
      const newAuthor = new Author({ ...args });
      try {
        await newAuthor.save();
        return newAuthor;
      } catch (error) {
        if (error) {
          throw new GraphQLError(error.message);
        }
      }
    },
    createUser: async (root, args) => {
      const body = { ...args };
      const newUser = new User(body);
      await newUser.save().catch((error) => {
        throw new GraphQLError("Creating a new User failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      });
      return newUser;
    },
    login: async (root, args) => {
      const userExists = await User.findOne({ username: args.username });

      if (!userExists || args.password !== "secret") {
        throw new GraphQLError("Invalid Username/ password", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: userExists.username,
        favouriteGenre: userExists.favouriteGenre,
        id: userExists.id,
      };

      const token = { value: jwt.sign(userForToken, process.env.SECRET) };
      return token;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);

      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
