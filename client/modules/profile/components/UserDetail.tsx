import * as React from 'react';
import {Fragment} from 'react';

import {branch, compose, lifecycle, mapProps, renderComponent, withHandlers, withState} from 'recompose';
import {graphql} from 'react-apollo';
import {Refresh as RefreshIcon} from '@material-ui/icons';
import {Button, Grid, LinearProgress, Typography} from '@material-ui/core';

import {AccountQueries} from '../graphql';

interface Props {
    readonly newProp: string;
    readonly onChange: () => void;
    readonly onAnotherChange: (color: string) => void;
    color: string;
    initColor: string;
    readonly setColor: (color: string) => void;
    readonly setInitColor: (initColor: string) => void;
    data: any;
    firstName: string;
    lastName: string;
}

interface State {}

interface ColorState {
    color: string;
    readonly setColor: (color: string) => void;
    readonly setInitColor: (initColor: string) => void;
}

const Loader = () => <div>Loader..</div>;
const Error = () => <div style={{color: 'red'}}>Error..</div>;

const decorate = compose<Props, {}>(
    graphql(AccountQueries.gql.me),
    mapProps<Props, Props>((props) => {
        const newProp: string = 'a jeho mapProps properta s barvou ala withState';
        const firstName: string = props.data.me.firstName;
        const lastName: string = props.data.me.lastName;
        return {
            ...props,
            newProp,
            firstName,
            lastName,
        };
    }),
    withState<ColorState, State, 'color', 'setColor'>('color', 'setColor', 'white'),
    withState<ColorState, State, 'initColor', 'setInitColor'>('initColor', 'setInitColor', 'blue'),
    withHandlers<Props, {}>({
        onChange: ({setColor}) => () => {
            setColor('green');
        },
        onAnotherChange: ({setColor}) => (color) => {
            setColor(color);
        },
    }),
    lifecycle<Props, {}>({
        componentDidMount() {
            this.props.setInitColor('yellow');
        },
        componentWillUnmount() {
            console.log('komponenta se louci');
        },
    }),
    branch<Props>((props) => props.color === 'red', renderComponent(Loader)),
    branch<Props>((props) => props.color === 'brown', renderComponent(Error)),
);

export const UserDetail = decorate(({data, onChange, onAnotherChange, newProp, color, initColor, firstName, lastName}) => {
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
                        <Grid item>
                            <Button onClick={() => onAnotherChange('brown')} disabled={data.loading}>
                                <RefreshIcon style={{color: 'brown'}} />
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
                    data.me && (
                        <Grid item xs={12}>
                            <Typography variant="title">Logged user</Typography>
                            <Typography>
                                <span style={{color: initColor}}>
                                    {firstName} {lastName}
                                </span>{' '}
                                <span style={{color}}>{newProp}</span>
                            </Typography>
                        </Grid>
                    )}
            </Grid>
        </Fragment>
    );
});
