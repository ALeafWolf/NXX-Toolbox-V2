export default (graphqlError, { store, error, redirect, route }) => {
    console.log({ graphqlError })

    const { networkError, message, gqlError, graphqlErrors } = graphqlError
    // handle error

    return error({ statusCode: 503, message: message })
}
