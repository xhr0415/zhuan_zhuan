export const cur_list_data = (data)=>{
    return{
        type:'LIST_DATA',
        data
    }
}

export const alt_list = (obj)=>{
    return {
        type:'ALT_LIST',
        obj
    }
}