import React, { Component } from 'react'
import {HashRouter} from 'react-router-dom'
import RouterViews from './routerFn';
import routes from './routers'

class Index extends Component {
    render() {
        return (
            <HashRouter>
                <RouterViews route={routes}></RouterViews>
            </HashRouter>
        )
    }
}
export default Index;