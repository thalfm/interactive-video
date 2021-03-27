import {createStore, combineReducers} from 'redux'
import {reducer as upload} from "./upload"

const store = createStore(
    combineReducers({
        upload
    })
)

export default store