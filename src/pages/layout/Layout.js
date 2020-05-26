import React, {Fragment} from 'react'
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