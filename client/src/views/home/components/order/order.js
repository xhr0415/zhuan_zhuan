import React, { Component } from 'react'
import {DatePicker,Table,InputNumber,Radio ,Select } from 'antd'
import axios from 'axios';
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import * as list_action from '../../../../store/list/list.action'
import {bindActionCreators} from 'redux'
import '../../../../static/font/iconfont.css';
import columns from './columns'
const {Option} = Select;

let chu_li_state = '';    //处理状态
let pro_type = '请选择'     //产品类型

class order extends Component {
    state = {
        startValue: null,                   //开始时间
        endValue: null,                     //结束时间
        endOpen: false,
        btnData:[
            {
                title:'未处理',
                id:1
            },
            {
                title:'补全中',
                id:2
            },
            {
                title:'已完成',
                id:3
            },
            {
                title:'返佣中',
                id:4
            }
        ],
        optionData:['信用贷','押房贷','房乐贷','车乐贷'],
        serNameData:["李大维",'李小冉','李莉','张玲','李家豪'],
        moneyStart:0,                         //开始金钱
        moneyEnd:10000000,                    //结束金钱
        lilvStart:0.86,                       //开始利率
        lilvEnd:1.34,                         //结束利率
    };
    render() {
        let {startValue,endOpen,endValue,btnData,optionData,serNameData,moneyStart,moneyEnd,lilvStart,lilvEnd} = this.state; 
        let {list_data} = this.props;
        return (
            <div className="order">
                <div className="ipt">
                    <input typex="text" placeholder="订单号/用户名/手机号" />
                </div>

                <div className="nav1">
                    {/* 时间 */}
                    <span>
                        处理时间：
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={startValue}
                                placeholder="Start"
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                                />
                                <span className="gang">一</span>
                                <DatePicker
                                disabledDate={this.disabledEndDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={endValue}
                                placeholder="End"
                                onChange={this.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                                onOk={()=>{this.time_ok()}}                 //点击ok
                            />
                    </span>
                    {/* 金钱范围 */}
                    <span className="moneybox">
                        金钱范围：<input type="text" placeholder={moneyStart} onChange={(e)=>{
                            this.setState({
                                moneyStart:e.target.value
                            })
                        }} />
                            <span className="gang">一</span>
                            <input type="text" placeholder={moneyEnd} onChange={(e)=>{
                                this.setState({
                                    moneyEnd:e.target.value
                                })
                            }} onBlur={()=>{
                                this.time_ok();         //调用筛选
                            }}/>
                    </span>
                    {/* 利率范围 */}
                    <span className="moneybox">
                        利率范围：
                        <InputNumber
                        defaultValue={0.86}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        onChange={(val)=>{
                            this.setState({
                                lilvStart:val
                            })
                        }}
                        />
                        <span className="gang">一</span>
                        <InputNumber
                        defaultValue={1.34}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        onChange={(val)=>{
                            this.setState({
                                lilvEnd:val
                            })
                        }}
                        onBlur={()=>{
                            this.time_ok();             //调用筛选
                        }}
                        />
                    </span>
                </div>
                
                <div className="nav2">
                    {/* 处理状态 */}
                    <span>
                        处理状态：
                        <Radio.Group defaultValue="全部" buttonStyle="solid">
                            <Radio.Button key="全部" value="全部" style={{borderRadius:'50px',marginLeft:10}} onClick={()=>{
                                chu_li_state="全部"
                                this.time_ok();                 //调用筛选
                            }}>全部</Radio.Button>
                            {
                                btnData.map(item=>{
                                    return <Radio.Button key={item.id} value={item.title}
                                            style={{borderRadius:'50px',marginLeft:10}}
                                            onChange={(e)=>{
                                                chu_li_state=e.target.value;
                                                this.time_ok();                 //调用筛选
                                            }}>
                                                {item.title}
                                            </Radio.Button>
                                })
                            }
                        </Radio.Group>
                    </span>
                    {/* 产品类型 */}
                    <span className="moneybox">
                        产品类型：
                        <Select defaultValue="请选择" style={{ width: 120 }} onChange={(val)=>{
                            pro_type = val;
                            this.time_ok();         //调用筛选
                        }}>
                            <Option key={"请选择"}>请选择</Option>
                            {
                                optionData.map((item,index)=>{
                                    return <Option key={index} value={item}>{item}</Option>
                                })
                            }
                        </Select>
                    </span>
                    {/* 客服名称 */}
                    <span className="moneybox">
                        客服名称：
                        <Select defaultValue="0" style={{ width: 120 }}>
                            <Option key={0}>请选择</Option>
                            {
                                serNameData.map((item,index)=>{
                                    return <Option key={index} value={item}>{item}</Option>
                                })
                            }
                        </Select>
                    </span>
                </div>
               
                <Table columns={columns} dataSource={list_data} pagination={{
                    showTotal:a=>`共${a}条`
                }}></Table>
            </div>
        )
    }   
    componentDidMount(){
        this.getList(this.props.match.params.id);
    }
    componentWillReceiveProps(nextProps){       //最新的props
        let oldname = this.props.match.params.id;
        let newname = nextProps.match.params.id;
        if(oldname!==newname){
            this.getList(nextProps.match.params.id);
        }
    }
    //请求数据
    getList(id){
        let order = this.getID(id);
        axios.get('/api/list',{
            headers:{
                'authorization':Cookies.get('sessionid')
            },
            params:{
                order
            }
        }).then(res=>{
            this.props.cur_list_data(res.data.data);            //调用store
        })
    }
    //获取当前路径的id
    getID(id){
        switch (id){
            case 'dk':{
                return 1;
            }
            case 'zd':{
                return 2;
            }
            case 'bx':{
                return 3;
            }
            default:{
                return 1
            }
        }
    }

    //时间选择完毕点击ok
    time_ok(){
        if(!this.state.startValue){
            this.filterList({
                moneyStart:this.state.moneyStart,
                moneyEnd:this.state.moneyEnd,
                lilvStart:this.state.lilvStart,
                lilvEnd:this.state.lilvEnd,
                chu_li_state,
                pro_type,
            });
        }
        else{
            this.filterList({
                startValue:new Date(this.state.startValue._d).getTime(),
                endValue:new Date(this.state.endValue._d).getTime(),
                moneyStart:this.state.moneyStart,
                moneyEnd:this.state.moneyEnd,
                lilvStart:this.state.lilvStart,
                lilvEnd:this.state.lilvEnd,
                chu_li_state,
                pro_type,
            });
        }
        
    }
    //筛选
    filterList(obj){
        this.props.alt_list(obj);
    }

    disabledStartDate = startValue => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
      };
    
      disabledEndDate = endValue => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
          return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
      };
    
      onChange = (field, value) => {
        this.setState({
          [field]: value,
        });
      };
      //起始时间
      onStartChange = value => {
        this.onChange('startValue', value);
      };
      //结束时间
      onEndChange = value => {
        this.onChange('endValue', value);
    };
    
      handleStartOpenChange = open => {
        if (!open) {
          this.setState({ endOpen: true });
        }
      };
    
      handleEndOpenChange = open => {
        this.setState({ endOpen: open });
      };
    
}
export default connect((state)=>{
    return {
        list_data:state.list_reducer.curData
    }
},(dispatch)=>{
    return bindActionCreators(list_action,dispatch)
})(order);