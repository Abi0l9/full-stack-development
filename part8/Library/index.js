const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const Author = require("./models/Author");
const Book = require("./models/Book");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const { getToken } = require("./utils/middleware");

const id = uuid();

require("./db");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/*
  you can remove the placeholder query once your first own has been implemented 
*/

const typeDefs = `
    type AllAuthors {
        name: String!
		    born: String
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
    allBooks(author: String, genres: String) : [Book!]
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
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: String!
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

    allAuthors: () => {
      const result = authors.map((author) => {
        const booksCount = books.filter((book) => book.author === author.name);
        return {
          name: author.name,
          born: author.born,
          booksCount: booksCount.length,
        };
      });

      return result;
    },
    authorsList: async () => Author.find({}),
    allBooks: async (root, args) => {
      const authorsQuery = args.author;
      const genresQuery = args.genres;

      const savedBooks = await Book.find({});
      const author = await Author.findOne({ name: args.author });
      if (!author) {
        throw new GraphQLError("Author not found!");
      }
      const authorId = author._id.toString();

      if (authorsQuery && genresQuery) {
        return savedBooks.filter(
          (book) =>
            book.author.toString() === authorId &&
            book.genres.includes(genresQuery)
        );
      } else if (authorsQuery) {
        return savedBooks.filter((book) => book.author.toString() === authorId);
      } else if (genresQuery) {
        return savedBooks.filter((book) => book.genres.includes(genresQuery));
      }
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.name });

      if (!authorExists) {
        throw new GraphQLError("Author not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
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
