const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import {SaveGameMutationArgs} from '@graphql-model';

const GameSchema = new Schema({
    _id: String,
    title: String,
    perex: String,
    ranking: Number,
    platform: String,
});

GameSchema.statics.save = (input: SaveGameMutationArgs): any => {
    if (!input) {
        throw new Error("Game save error!");
    }
    const _game = new GameSchema({ input });

    return _game.save((err) => {
        if (err) throw err;
    });
};

mongoose.model('game', GameSchema);