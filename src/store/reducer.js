import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLogin: false,
  user: null,
  roll: null,
  pages: ['Ali']
}

const generatePage = (user) => {
  if (!user) return (
    [
      {
        name: "Home",
        link: "/"
      },
      {
        name: "About Us",
        link: "/aboutus"
      },
      {
        name: "Contact",
        link: "/contact"
      }
    ]
  )
  if (user.roll === 'user') return (
    [
      {
        name: "Home",
        link: "/"
      },
      {
        name: "Contribute",
        link: "/contribute"
      },
      {
        name: "About Us",
        link: "/aboutus"
      },
      {
        name: "Contact",
        link: "/contact"
      }
    ]
  )
  else if (user.roll == 'admin') return (
    [
      {
        name: "Home",
        link: "/"
      },
      {
        name: "Contribute",
        link: "/contribute"
      },
      {
        name: "Dataset",
        link: "/dataset"
      },
      {
        name: "About Us",
        link: "/aboutus"
      },
      {
        name: "Contact",
        link: "/contact"
      }
    ]
  ) 
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
        // pages:generatePage(state.user)
      }
    },
    logout: (state, {payload}) => {
      return {
        ...state,
        user: null,
        isLogin: false,
        // pages:generatePage(state.user)
      }
    }
  }
})

export const { login, logout } = auth.actions;
export default auth.reducer;