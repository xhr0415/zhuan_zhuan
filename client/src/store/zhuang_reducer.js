import routeData from '../views/home/routeData'

let State = {
    leftData:[],
    header_data:[{title:'首页',path:'/home'}]
}

let reducer = (state=State,action)=>{
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        //左边列表数据
        case 'INIT':{
            newState.leftData = routeData;
            return newState;
        }
        //登录信息
        case 'USER_INFO':{
            newState.userInfo = action.info;
            return newState;
        }
        //点击左边
        case 'CLK_LEFT':{
            let ind = newState.header_data.findIndex(item=>item.path === action.data.path);
            if(ind !== -1){
                newState.header_data.splice(ind,1);
            }
            newState.header_data.unshift(action.data);
            return newState;
        }
        //点击头部删除
        case 'HEADER_DEL':{
            newState.header_data.splice(action.index,1);
            return newState;
        }
        default:{
            return newState;
        }
    }
}

export default reducer;