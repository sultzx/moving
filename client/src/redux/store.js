import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.js'
import { ordersReducer } from './slices/order.js'
import { commentReducer } from './slices/comment.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: ordersReducer,
        comment: commentReducer
    }
})

export default store