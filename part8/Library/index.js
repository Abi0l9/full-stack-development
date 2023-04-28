const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const Author = require("./models/Author");
const Book = require("./models/Book");

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

  type Query {
    booksCount: Int!
    authorsCount: Int!
    allBook: [Book!]!
    allAuthors: [AllAuthors!]!
    allBooks(author: String, genres: String) : [Book!]
    authorsList: [Author]
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!) : [Book!]!
    editAuthor(name: String!, setBornTo: Int!) : Author
    addAuthor(name: String!, born: Int!) : Author
  }

  type Author {
    name: String!
    id: ID!
    born: String
  }

  type Book {
    title: String!
    published: String!
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
    allBook: async () => Book.find({}),

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
    allBooks: (root, args) => {
      const authorsQuery = args.author;
      const genresQuery = args.genres;

      if (authorsQuery && genresQuery) {
        return books.filter(
          (book) =>
            book.author === args.author && book.genres.includes(genresQuery)
        );
      } else if (authorsQuery) {
        return books.filter((book) => book.author === args.author);
      } else if (genresQuery) {
        return books.filter((book) => book.genres.includes(genresQuery));
      }
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const body = { ...args, id };
      const authorExists = authors.find(
        (author) => author.name === args.author
      );
      if (!authorExists) {
        authors = authors.concat({ name: args.author, born: null, id });
      }

      books = books.concat(body);
      return books;
    },
    editAuthor: (root, args) => {
      const authorExists = authors.find((author) => author.name === args.name);
      console.log(args);

      if (!authorExists) return null;

      const updatedAuthor = { ...authorExists, born: args.setBornTo };
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      );
      return updatedAuthor;
    },
    addAuthor: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.name });

      if (authorExists) return null;

      const newAuthor = new Author({ ...args });
      try {
        await newAuthor.save();
      } catch (error) {
        console.log(error);
      }

      return newAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
