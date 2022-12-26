<script>

    import { query } from "svelte-apollo";
    import {gql, InMemoryCache} from "@apollo/client/core";
    import { ApolloClient } from "@apollo/client/core";
    import { setClient } from "svelte-apollo";
    const client = new ApolloClient({
        uri: "http://localhost:89/graphql",
        cache: new InMemoryCache()
    });
    setClient(client);

    const USER = gql`
        query {
              user(id: 1) {
                id
                name
                email
                created_at
              }
        }
`;


    const user = query(USER);
    console.log(user.refetch());
</script>