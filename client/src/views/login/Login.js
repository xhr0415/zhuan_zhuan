import React, { Component } from 'react'
import '../../static/font/iconfont.css'
import axios from 'axios'
import cookie from 'js-cookie'

export default class Login extends Component {
    state = {
        user:'',
        psw:'',
        checkCode:'',
        mycheckCode:'',
        yzm:'获取验证码',
        flag:true
    }
    render() {
        let {user,psw,checkCode,yzm,mycheckCode} = this.state;
        return (
            <div className="login">
                {/* 图片盒子 */}
                <div className="mask"></div>

                {/* 文字 */}
                <div className="welcome">Welcome  </div>
                <div className="welcome-bottom">赚赚金融 开创信贷“1＋N”模式的综合互联网金融服务共享平台</div>

                {/* 内容盒子 */}
                <div className="content">
                    <div className="content-top">
                        <div className="logo">
                            <span className="iconfont">&#xe622;</span>
                        </div>
                        <div className="title">赚赚金融渠道管理系统</div>
                    </div>

                    <div className="content-bottom">
                        <div className="phone">
                            <input type="text" placeholder="注册邮箱/手机号" value={user} onChange={(e)=>{
                                this.setState({user:e.target.value})
                            }} />
                        </div>
                        <div className="psw">
                            <input type="text" placeholder="登录密码" value={psw} onChange={(e)=>{
                                this.setState({
                                    psw:e.target.value
                                })
                            }} />
                        </div>
                        <div className="ver">
                            <input type="text" placeholder="验证码" value={mycheckCode} onChange={(e)=>this.setState({mycheckCode:e.target.value})} />   
                            {/* 点击获取验证码                   */}
                            <span className="yzm" onClick={()=>{this.clk_yzm()}}>{yzm}</span>
                        </div>
                        <p className="wang">忘记密码</p>

                        <button onClick={()=>{                          //点击登录
                            this.setState({flag:true});
                            clearInterval(this.timer);
                            this.setState({yzm:'获取验证码'})

                            if(checkCode == mycheckCode){
                                axios.post('/api/login',{
                                    phone:user,
                                    password:psw,
                                    checkcode:mycheckCode
                                }).then(res=>{
                                    if(res.data.code==0){
                                        cookie.set('sessionid',res.data.sessionId,{              //存储
                                            expires:3
                                        })
                                        this.props.history.push('/home')
                                    }
                                    else{
                                        alert(res.data.message)
                                    }
                                }) 
                            }
                            else{
                                alert('验证码输入错误')
                            }
                        }}>登录</button>
                    </div>
                </div>

                {/* 底部 */}
                <div className="footer">
                    <span>Copyright@2016 ZHUANZHUANJINRONG ALL RIGHTS RESERVED. 赚赚金融 保留所有权利</span>
                    <span>隐私政策</span>
                    <span>条款与条约</span>
                </div>
            </div>
        )
    }
    //点击获取验证码
    clk_yzm(){
        let {flag,checkCode} = this.state;
        if(flag){
            this.setState({
                flag:false
            })
            let num = 60;
            this.timer = setInterval(()=>{
                num--;
                this.setState({
                    yzm:num
                })
                if(num<=0){
                    clearInterval(this.timer);
                    this.setState({yzm:'获取验证码'})
                }
            },1000)
            axios.get('/api/checkCode').then(res=>{
                console.log(res.data.Verification);
                alert(res.data.Verification)
                this.setState({checkCode:res.data.Verification})
            })
        }
    }
}
