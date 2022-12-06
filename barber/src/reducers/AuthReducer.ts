import { createSlice, configureStore } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: false
  },
  reducers: {
    login: state => {
      state.value = true;
    },
    signout: state => {
      state.value = false
    }
  }
})

export const { login, signout } = authSlice.actions

export const auth = configureStore({
  reducer: authSlice.reducer
});