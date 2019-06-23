import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import zhuan_reducer from './zhuang_reducer'
import list_reducer from './list/list.reducer'

let reducer = combineReducers({
    zhuan_reducer,
    list_reducer
})

let store = createStore(reducer,applyMiddleware(thunk));

export default store;