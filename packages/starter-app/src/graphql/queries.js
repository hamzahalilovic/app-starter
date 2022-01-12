/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessages = /* GraphQL */ `
  query GetMessages($filter: String) {
    getMessages(filter: $filter) {
      messageId
      body
      createdAt
      username
    }
  }
`;

export const getHeader = `query getHeader {
  getHeader {
    country
    desktop
    language
    smarttv
    mobile
    tablet
  }
}
`;
