import {Game, SaveGameMutationArgs} from '@graphql-model';
const mongoose = require("mongoose");
// const graphql = require('graphql')
//
// const {
//     GraphQLObjectType,
//     GraphQLString,
//     GraphQLID,
//     GraphQLInt,
// } = graphql
const LoadGameModel = require('../models/game');
console.log(LoadGameModel);

const GameModel = mongoose.model('game');
// export const GameType = new GraphQLObjectType({
//     name: 'GameType',
//     fields: () => ({
//         _id: { type: GraphQLID },
//         perex: { type: GraphQLString },
//         ranking: { type: GraphQLInt },
//         platsform: 'PC',
//     })
// })

// const fakeGame: Game = {
//     _id: '1',
//     title: 'World of Warcraft: Battle of Azeroth',
//     perex:
//         'World of Warcraft: Battle for Azeroth is the upcoming seventh expansion pack for the massively multiplayer online role-playing game (MMORPG) World of Warcraft, following Legion. It was announced at BlizzCon 2017, and will be released on August 13, 2018.',
//     ranking: 84,
//     platform: 'PC',
// };

export const GameService = {
    findGame(): Game {
        return GameModel.find({});
    },
    save({input}: SaveGameMutationArgs) {
        console.log(input);
        GameModel.save(input);
    },
};

