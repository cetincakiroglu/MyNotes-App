import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext'

function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to='/Login' />
            }}
            ></Route>
        </>
    )
}

export default PrivateRoute
