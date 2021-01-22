import { CombineReducers } from 'redux'
import { user } from './user'

const Reducers = CombineReducers({
    userState: user,
})

export default Reducers