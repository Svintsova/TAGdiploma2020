import React, {Fragment, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import NavBar from './navBar/NavBar'

export const Layout = ({children}) => {
    return (
        <Fragment>
            <NavBar/>

            <div className="row">
                {children}
            </div>

        </Fragment>
    )
}