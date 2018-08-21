import * as React from 'react';

import {GameDetail} from '../../client/modules/game';
import {Layout} from '../../client/modules/common';
import {Grid} from '@material-ui/core';

export default () => (
    <Layout>
        <Grid container spacing={8}>
            <Grid item xs={12}>
                <GameDetail />
            </Grid>
        </Grid>
    </Layout>
);
