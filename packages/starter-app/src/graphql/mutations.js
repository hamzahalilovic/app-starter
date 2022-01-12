/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage($body: String!, $username: String!) {
    createMessage(body: $body, username: $username) {
      messageId
      body
      createdAt
      username
    }
  }
`;
