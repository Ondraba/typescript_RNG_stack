import * as React from 'react';
import {Fragment} from 'react';

import {branch, compose, lifecycle, mapProps, renderComponent, withHandlers, withState} from 'recompose';
import {graphql} from 'react-apollo';
import {Refresh as RefreshIcon} from '@material-ui/icons';
import {Button, Grid, LinearProgress, Typography} from '@material-ui/core';

import {GameQueries} from '../graphql';

// class MeQuery extends Query<GraphQLQuery> {}

interface InnerProps {
    readonly newProp: string;
    readonly onChange: () => void;
    color: string;
    readonly setColor: (color: string) => void;
    data: any;
    firstName: string;
    lastName: string;
}

interface Props {}
interface State {}

interface ColorState {
    color: string;
    readonly setColor: (color: string) => void;
}

const Loader = () => <div>Loader..</div>;

const decorate = compose<InnerProps, {}>(
    graphql(GameQueries.gql.game),
    mapProps<Props, InnerProps>((props) => {
        const newProp: string = 'test';
        // const title: string = props.data.me.firstName;
        // const lastName: string = props.data.me.lastName;
        return {
            ...props,
            newProp,
            // firstName,
            // lastName,
        };
    }),
    withState<ColorState, State, 'color', 'setColor'>('color', 'setColor', 'black'),
    withHandlers<InnerProps, {}>({
        onChange: ({setColor}) => () => {
            setColor('green');
        },
    }),
    lifecycle<InnerProps, ColorState>({
        componentDidMount() {
            // console.log('lifecycle activated' + this.props.newProp);
        },
    }),
    branch<InnerProps>((props) => props.color === 'red', renderComponent(Loader)),
);

export const GameDetail = decorate(({data, onChange}) => {
    return (
        <Fragment>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="space-between">
                        <Grid item>
                            <Typography variant="display1">Profile</Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={onChange} disabled={data.loading}>
                                <RefreshIcon />
                                &nbsp;&nbsp;Refresh
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {data.loading && (
                    <Grid item xs={12}>
                        <LinearProgress />
                    </Grid>
                )}
                {data &&
                    data.game && (
                        <Grid item xs={12}>
                            <Typography variant="title">Logged user</Typography>
                            <Typography>{data.game.title}</Typography>
                        </Grid>
                    )}
            </Grid>
        </Fragment>
    );
});
