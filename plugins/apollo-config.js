import { onError } from "apollo-link-error";

export default function (ctx) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  return {
    link: errorLink,
    // required
    httpEndpoint: "http://localhost:1337/graphql",
    httpLinkOptions: {
      credentials: "same-origin",
    },
  };
}
