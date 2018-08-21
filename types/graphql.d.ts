/* tslint:disable */
import {GraphQLResolveInfo} from 'graphql';

export type Resolver<Result, Args = any> = (parent: any, args: Args, context: any, info: GraphQLResolveInfo) => Promise<Result> | Result;

export interface Query {
    me?: Account | null;
    game?: Game | null;
}

export interface Account {
    id: string;
    firstName: string;
    lastName: string;
}

export interface Game {
    _id: string;
    title: string;
    perex: string;
    ranking: number;
    platform: string;
}

export interface Mutation {
    updateMe?: Account | null;
    saveGame?: Game | null;
}

export interface MeUpdateInput {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
}

export interface GameSaveInput {
    title?: string | null;
    perex?: string | null;
    ranking?: number | null;
    platform?: string | null;
}
export interface UpdateMeMutationArgs {
    input?: MeUpdateInput | null;
}
export interface SaveGameMutationArgs {
    input?: GameSaveInput | null;
}

export namespace QueryResolvers {
    export interface Resolvers {
        me?: MeResolver;
        game?: GameResolver;
    }

    export type MeResolver<R = Account | null> = Resolver<R>;
    export type GameResolver<R = Game | null> = Resolver<R>;
}

export namespace AccountResolvers {
    export interface Resolvers {
        id?: IdResolver;
        firstName?: FirstNameResolver;
        lastName?: LastNameResolver;
    }

    export type IdResolver<R = string> = Resolver<R>;
    export type FirstNameResolver<R = string> = Resolver<R>;
    export type LastNameResolver<R = string> = Resolver<R>;
}

export namespace GameResolvers {
    export interface Resolvers {
        _id?: IdResolver;
        title?: TitleResolver;
        perex?: PerexResolver;
        ranking?: RankingResolver;
        platform?: PlatformResolver;
    }

    export type IdResolver<R = string> = Resolver<R>;
    export type TitleResolver<R = string> = Resolver<R>;
    export type PerexResolver<R = string> = Resolver<R>;
    export type RankingResolver<R = number> = Resolver<R>;
    export type PlatformResolver<R = string> = Resolver<R>;
}

export namespace MutationResolvers {
    export interface Resolvers {
        updateMe?: UpdateMeResolver;
        saveGame?: SaveGameResolver;
    }

    export type UpdateMeResolver<R = Account | null> = Resolver<R, UpdateMeArgs>;
    export interface UpdateMeArgs {
        input?: MeUpdateInput | null;
    }

    export type SaveGameResolver<R = Game | null> = Resolver<R, SaveGameArgs>;
    export interface SaveGameArgs {
        input?: GameSaveInput | null;
    }
}
