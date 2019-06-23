import React from 'react';
import Loadable from 'react-loadable';

function loading(){
    return <div>Loading...</div>
}

export const Home = Loadable({
    loader:()=>import('../views/home/Home'),
    loading:loading
})
export const Login = Loadable({
    loader:()=>import('../views/login/Login'),
    loading:loading
})
export const Order = Loadable({
    loader:()=>import('../views/home/components/order/order.js'),
    loading:loading
})
export const Index = Loadable({
    loader:()=>import('../views/home/components/index.js'),
    loading:loading
})

