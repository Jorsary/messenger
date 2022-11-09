import { createSlice } from '@reduxjs/toolkit'

interface ThemeState{
  darkMode:boolean
}

const data = localStorage.getItem("themeMode");

const initialState:ThemeState = {
  darkMode: data ? JSON.parse(data) : false
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state){
      state.darkMode=!state.darkMode
      localStorage.setItem("themeMode", JSON.stringify(state.darkMode));
    }
  }
});

export const {setTheme} = themeSlice.actions

export default themeSlice.reducer