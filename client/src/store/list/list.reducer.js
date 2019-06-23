let reducer = (state={curData:[],seleData:[]},action)=>{
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'LIST_DATA':{
            newState.seleData = newState.curData = action.data.map((item,index)=>{
                return {
                    key:index,
                    ddh:item.id,
                    xdsj:item.date,
                    yhmc:item.customerName,
                    sjh:item.phone,
                    cplx:item.type,
                    dkje:item.money,
                    dkqx:item.handleState+'月',
                    dkll:item.interestRate+'%',
                    ddzt:getId(item.handleState),
                    kf:item.serviceName,
                }
            })
            return newState;
        }
        //筛选
        case 'ALT_LIST':{
            let {endValue,startValue,lilvEnd,lilvStart,moneyEnd,moneyStart,chu_li_state,pro_type} = action.obj;
            // console.log(action.obj)
            newState.curData = newState.seleData.filter(item=>{
                let date = new Date(item.xdsj).getTime();           //获取时间
                let dkll = parseFloat(item.dkll);                   //取整 贷款利率
                if(!startValue || !endValue){
                    if(chu_li_state == '全部'){
                        if(pro_type == '请选择'){
                            return item.dkje*10000 >= moneyStart && item.dkje*10000 <= moneyEnd
                                && dkll >= lilvStart && dkll <= lilvEnd;
                        }
                        else{
                                return item.dkje*10000 >= moneyStart && item.dkje*10000 <= moneyEnd
                                && dkll >= lilvStart && dkll <= lilvEnd
                                && pro_type == item.cplx;
                        }
                    }
                    else if(chu_li_state !== ''){
                        if(pro_type != '请选择'){
                                return item.dkje*10000 >= moneyStart && item.dkje*10000 <= moneyEnd
                                && dkll >= lilvStart && dkll <= lilvEnd
                                && item.ddzt == chu_li_state
                                && pro_type == item.cplx;
                        }
                        else{
                                return item.dkje*10000 >= moneyStart && item.dkje*10000 <= moneyEnd
                                && dkll >= lilvStart && dkll <= lilvEnd
                                && item.ddzt == chu_li_state;
                        }
                    }
                    else if(pro_type !== '请选择'){
                                return item.dkje*10000 >= moneyStart && item.dkje*10000 <= moneyEnd
                                && dkll >= lilvStart && dkll <= lilvEnd
                                && pro_type == item.cplx;
                    }
                    else{
                                return item.dkje*10000 >= moneyStart && item.dkje*10000 <= moneyEnd
                                && dkll >= lilvStart && dkll <= lilvEnd;
                    }
                }
                if(chu_li_state == '全部'){
                    if(pro_type == '请选择'){
                        return date > startValue && date < endValue 
                            && item.dkje*10000 >= moneyStart && item.dkje*10000 <= moneyEnd
                            && dkll >= lilvStart && dkll <= lilvEnd;
                    }
                    else{
                        return date > startValue && date < endValue 
                            && item.dkje*10000 >= moneyStart && item.dkje*10000 <= moneyEnd
                            && dkll >= lilvStart && dkll <= lilvEnd
                            && pro_type == item.cplx;
                    }
                }
                else if(chu_li_state !== ''){
                    if(pro_type != '请选择'){
                        return date > startValue && date < endValue 
                            && item.dkje*10000 >= moneyStart && item.dkje*10000 <= moneyEnd
                            && dkll >= lilvStart && dkll <= lilvEnd
                            && item.ddzt == chu_li_state
                            && pro_type == item.cplx;
                    }
                    else{
                        return date > startValue && date < endValue 
                            && item.dkje*10000 >= moneyStart && item.dkje*10000 <= moneyEnd
                            && dkll >= lilvStart && dkll <= lilvEnd
                            && item.ddzt == chu_li_state;
                    }
                }
                else if(pro_type !== '请选择'){
                    return date > startValue && date < endValue 
                            && item.dkje*10000 >= moneyStart && item.dkje*10000 <= moneyEnd
                            && dkll >= lilvStart && dkll <= lilvEnd
                            && pro_type == item.cplx;
                }
                else{
                    return date > startValue && date < endValue 
                            && item.dkje*10000 >= moneyStart && item.dkje*10000 <= moneyEnd
                            && dkll >= lilvStart && dkll <= lilvEnd;
                }
            })
            return newState;
        }
        default :{
            return newState;
        }
    }
    //通过handleState判断是什么状态
    function getId(id){
        switch(id){
            case 1:{
                return '未处理'
            }
            case 2:{
                return '补全中'
            }
            case 3:{
                return '已完成'
            }
            case 4:{
                return '返佣中'
            }
            default:{
                return '暂无状态'
            }
        }
    }
}
export default reducer;