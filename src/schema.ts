import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeResolver } from "graphql-scalars";
import { Context } from "./context";

const typeDefs = `
type Post {
  id: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  content: String
  publish: Boolean!
  author: User!
  authorId: Int!
}

type Profile {
  id: Int!
  bio: String!
  user: User
  userId: Int
}

type User {
  id: Int!
  email: String!
  name: String
  posts: [Post!]!
  profile: Profile
}

type Query {
  allUsers: [User!]!
}

scalar DateTime
`;

const resolvers = {
  Query: {
    allUsers: (_parent: any, _args: any, context: Context) => {
      return context.prisma.user.findMany();
    },
  },
  DateTime: DateTimeResolver,
  Post: {
    author: (parent: { id?: number }, _args: any, context: Context) => {
      return context.prisma.post
        .findUnique({
          where: { id: parent?.id },
        })
        .author();
    },
  },
  User: {
    posts: (parent: { id?: number }, _args: any, context: Context) => {
      return context.prisma.user
        .findUnique({
          where: { id: parent?.id },
        })
        .posts();
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});
