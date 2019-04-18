import ApolloClient from "apollo-boost";
import url from "url";
let currentUrl = url.parse(window.location.href);
// console.log("currentUrl: ", currentUrl);
let graphQlUrl = `${currentUrl.protocol}//${currentUrl.host}/graphql`;
console.log(`GraphQL Endpoint: ${graphQlUrl}`);

const client = new ApolloClient({
  uri: graphQlUrl
});

export default client;
