import React, { Component } from 'react'
import { Layout, Menu,Icon } from 'antd';
import 'antd/dist/antd.css'
import RouteViews from '../../router/routerFn'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as zhuang_action from '../../store/zhuang_action'
import '../../static/font/iconfont.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Home extends Component {
    state = {
        collapsed: false,
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
    
    render() {
        let {leftData,Info,header_data} = this.props;
        return (
            <div className="home">
                <Layout style={{ minHeight: '100vh' }}>
                    {/* 左边数据 */}
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="user_info" >
                            <div className="top">
                                <span>
                                    <img src={'http://localhost:8000'+Info.facePhoto} alt="" />
                                </span>
                            </div>
                            <div className="bottom">
                                北京乐智慧代理
                            </div>
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" onClick={()=>{this.props.history.push('/home')}}>
                            <Icon type="pie-chart" />
                            <span >首页</span>
                            </Menu.Item>
                            {
                                leftData.map((item,index)=>{
                                    return <SubMenu
                                            key={index}
                                            title={
                                                <span>
                                                <Icon type="user" />
                                                <span>{item.title}</span>
                                                </span>
                                            }
                                            >
                                                {
                                                    item.children.map((ele,key)=>{
                                                        return <Menu.Item key={index+''+key} onClick={()=>{
                                                            this.props.history.push({
                                                                pathname:ele.path
                                                            })
                                                            this.clk_leftList(ele);
                                                        }} >{ele.title}</Menu.Item>
                                                    })
                                                }
                                            </SubMenu>
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout>

                    {/* 头部 */}
                    <Header style={{ background: '#fff', padding: 0 }} >
                        {
                            header_data.map((item,index)=>{
                                return <div className="header-list" key={index}>
                                    <span onClick={()=>{
                                        this.props.history.push(item.path)
                                    }}>{item.title}</span>
                                    <span className="iconfont header-list-del" onClick={()=>{this.clk_header_list(index)}}>&#xe60d;</span>
                                </div>
                            })
                        }
                    </Header>
                    
                    {/* 内容 */}
                    <Content className="content">
                        <RouteViews route={this.props.route}></RouteViews>
                    </Content>
                    
                    {/* 尾部 */}
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
    componentDidMount(){
        this.props.init();          //获取数据
    }
    //点击左边列表
    clk_leftList(item){
        this.props.clk_left(item);
    }
    //头部列表点击删除
    clk_header_list(index){
        this.props.header_del(index);
    }
}
export default connect((state)=>{
    return {
        leftData:state.zhuan_reducer.leftData,
        Info:state.zhuan_reducer.userInfo,
        header_data:state.zhuan_reducer.header_data,
    }
},
(dispatch)=>{
    return bindActionCreators(zhuang_action,dispatch)
})(Home);