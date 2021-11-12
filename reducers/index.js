
import TokenReducer from './token'
import MontantReducers from './MontantReducers'
import ProfileReducer from './ProfileReducer'
import { combineReducers } from 'redux'

const AllReducers = combineReducers({

    TokenReducer: TokenReducer,
    MontantReducers: MontantReducers,
    ProfileReducer: ProfileReducer
})

export default AllReducers