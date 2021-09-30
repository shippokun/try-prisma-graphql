import path from "path";
import fs from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeResolver } from "graphql-scalars";
import { Context } from "./context";
import { Resolvers } from "../lib/generated/resolvers";

const typeDefs = fs.readFileSync(path.resolve(__dirname, "./schema.graphql"), {
  encoding: "utf-8",
});

const resolvers: Resolvers = {
  Query: {
    allUsers: (_parent: any, _args: any, context: Context) => {
      return context.prisma.user.findMany({
        include: { posts: true, profile: true },
      });
    },
    posts: (_parent: any, _args: any, context: Context) => {
      return context.prisma.post.findMany();
    },
    fetchPost: (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.post.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  DateTime: DateTimeResolver,
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
