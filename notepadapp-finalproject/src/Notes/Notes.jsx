import React from 'react'
import { Grid, Card, CardHeader, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    marg: {
        marginLeft:'500px'
    }
})
function Notes() {
    const classes = useStyles();
    return (
        <>
            <h1>Notes</h1>
        </>
    )
}

export default Notes
