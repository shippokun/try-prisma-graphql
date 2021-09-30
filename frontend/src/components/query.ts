import { GraphQLClient } from "graphql-request";
import { getSdk } from "../graphql/generated";

const client = new GraphQLClient("http://localhost:4000/graphql");
const sdk = getSdk(client);

export async function getAllUsers() {
  const response = await sdk.allUsers();

  console.table(response.allUsers);

  return response.allUsers;
}
