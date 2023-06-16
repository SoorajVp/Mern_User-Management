import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { imageUploadReducer, userLoginReducer } from './UserReducer';
import { adminLoginReducer } from './AdminReducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    imageUpload: imageUploadReducer,
    adminLogin: adminLoginReducer
})

const initialState = {};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;