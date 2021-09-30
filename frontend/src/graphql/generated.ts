import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Post = {
  __typename?: 'Post';
  authorId: Scalars['Int'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  publish: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  userId?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  posts: Array<Post>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  posts: Array<Post>;
  profile?: Maybe<Profile>;
};

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: number, email: string, name?: Maybe<string>, posts: Array<{ __typename?: 'Post', id: number, createdAt: any, updatedAt: any, title: string, content?: Maybe<string>, publish: boolean, authorId: number }>, profile?: Maybe<{ __typename?: 'Profile', id: number, bio?: Maybe<string>, userId?: Maybe<number> }> }> };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, createdAt: any, updatedAt: any, title: string, content?: Maybe<string>, publish: boolean, authorId: number }> };


export const AllUsersDocument = gql`
    query allUsers {
  allUsers {
    id
    email
    name
    posts {
      id
      createdAt
      updatedAt
      title
      content
      publish
      authorId
    }
    profile {
      id
      bio
      userId
    }
  }
}
    `;
export const PostsDocument = gql`
    query posts {
  posts {
    id
    createdAt
    updatedAt
    title
    content
    publish
    authorId
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    allUsers(variables?: AllUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllUsersQuery>(AllUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allUsers');
    },
    posts(variables?: PostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostsQuery>(PostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'posts');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;