import gql from 'graphql-tag';

/**
 * All account queries
 */
export const GameQueries = {
    gql: {
        game: gql`
            query {
                game {
                    id
                    title
                    perex
                    ranking
                    platform
                }
            }
        `,
    },
};
