import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLogin: false,
  user: null,
  roll: null,
}




const auth = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, {payload}) => {
      return {
        ...state,
        user: payload,
        isLogin: true,
      }
    },
    logout: (state, {payload}) => {
      return {
        ...state,
        user: null,
        isLogin: false,
      }
    }
  }
})

export const { login, logout } = auth.actions;
export default auth.reducer;