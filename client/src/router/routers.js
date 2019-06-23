import {Home,Login,Order,Index} from '../views/index'
import islogin from '../components/islogin'

let routers = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:islogin(Home),
        children:[
            {
                path:'/home',
                redirect:'/home/index',
            },
            {
                path:'/home/index',
                component:Index
            },
            {
                path:'/home/order/:id',
                component:Order
            }
        ]
    },
    {
        path:'/login',
        component:Login
    }
]

export default routers;