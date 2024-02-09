import { Grid } from "@mui/material";
import { Fragment, ReactElement } from "react";

export default function Introduction (): ReactElement {
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    Ciao
                </Grid>
                <Grid item xs={4}>
                    Ciao
                </Grid>
            </Grid>
        </Fragment>
    );
}