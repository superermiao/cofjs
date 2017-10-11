import navigationGo from '../actions/NavigationActionsMethod'
export const userfn=function (params,type) {
    console.log('存储的数据为'+params);
    storage.save({
       key:'user',
       data:params,
       expires:null,
   })
    return {
        type:type,
        user:params
    }
}