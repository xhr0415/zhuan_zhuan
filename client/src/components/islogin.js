import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import * as zhuang_action from '../store/zhuang_action'
import { bindActionCreators } from 'redux';

const islogin = (Home)=>{
    class isLogin extends Component {
        state = {
            open:false
        }
        render() {
            let {open} = this.state;
            return (
                    open && <Home {...this.props}></Home>
            )
        }
        componentDidMount(){
            axios.get('/api/islogin',{
                headers:{
                    'authorization':Cookies.get('sessionid')
                }
            }).then(res=>{
                // console.log(res.data.info)
                this.props.userInfo(res.data.info);
                this.setState({
                    open:true
                })
            }).catch(res=>{
                if(res.response.status){
                    this.props.history.push('/login')
                }
            })
        }
    }
    return connect((state)=>{
        return {}
    },(dispatch)=>{
        return bindActionCreators(zhuang_action,dispatch);
    })(isLogin);
}

export default islogin;