export const init = ()=>{
    return (dispatch)=>{
        dispatch({
            type:'INIT',
        })
    }
}

export const userInfo = (info)=>{
    return {
        type:'USER_INFO',
        info
    }
}

export const clk_left = (data)=>{
    return {
        type:'CLK_LEFT',
        data
    }
}

export const header_del = (index)=>{
    return {
        type:'HEADER_DEL',
        index
    }
}