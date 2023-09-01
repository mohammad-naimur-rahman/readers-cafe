import { configureStore } from '@reduxjs/toolkit'

import api from './api/apiSlice'

//* Redux is limited to dashboard only, because in dashboard it is better to have client side code
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
