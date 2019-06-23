import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'

function routerFn({route=[]}){
    let arr = route.filter(item=>item.component);
    let redirectArr = route.filter(item=>item.redirect).map((item,index)=>{
        return <Redirect key={index} from={item.path} to={item.redirect}></Redirect>
    })
    return (
        <Switch>
            {
                arr.map((item,index)=>{
                    return <Route key={index} path={item.path} render={(props)=>{
                        return <item.component {...props} route={item.children}></item.component>
                    }}></Route>
                }).concat(redirectArr)
            }
        </Switch>
    )
} 

export default routerFn;