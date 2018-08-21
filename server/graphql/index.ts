import {importSchema} from 'graphql-import';
import {ApolloServer, Config, gql} from 'apollo-server-express';
import {SaveGameMutationArgs, UpdateMeMutationArgs} from '@graphql-model';

import {AccountService, GameService} from '../services';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

const resolvers = {
    Query: {
        me: (_: any) => AccountService.findLoggedUser(),
        game: (_: any) => GameService.findGame(),
    },

    Mutation: {
        updateMe: (args: UpdateMeMutationArgs) => AccountService.save(args),
        saveGame: (args: SaveGameMutationArgs) => GameService.save(args),
    },
};

export const createApolloServer = (config?: Omit<Config, 'resolvers' | 'typeDefs'>): ApolloServer => {
    return new ApolloServer({
        ...config,
        typeDefs: gql`
            ${importSchema('schema/root.graphql')}
        `,
        resolvers,
    });
};
