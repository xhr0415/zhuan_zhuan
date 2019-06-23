import React, { Component } from 'react'
import '../../../static/font/iconfont.css';

export default class index extends Component {
    state = {
        data:[
            {
                title:'累计订单',
                num:2805,
                back:'#FF8761',
            },
            {
                title:'新订单',
                num:30556,
                back:'#57BDDE'
            },
            {
                title:'处理中',
                num:2503,
                back:'#B198DC'
            },
            {
                title:'驳回',
                num:285,
                back:'#FF8761'
            },
            {
                title:'已完成',
                num:2628,
                back:'#6CC7BE'
            }
        ]
    }
    render() {
        let {data} = this.state;
        return (
            //首页
            <div className="home_index">
                <div className="header">
                    <div className="header-top">
                        <h3>交易总览</h3>
                    </div>
                    <div className="header-bottom">
                        {
                            data.map((item,index)=>{
                                return <div className="header-content" key={index}>
                                            <div className="left iconfont" style={{background:item.back}}>&#xe621;</div>
                                            <div className="right">
                                                <p style={{color:item.back}}>{item.title}</p>
                                                <p>{item.num}</p>
                                            </div>
                                        </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
