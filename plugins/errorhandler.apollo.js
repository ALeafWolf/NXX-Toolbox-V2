export default (graphqlError, { store, error, redirect, route }) => {
    console.log({ graphqlError })

    const { networkError, message, gqlError, graphqlErrors } = graphqlError
    console.log(message)
    // handle error

    return error({ statusCode: 503, message: message })
}