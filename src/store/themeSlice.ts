import { createSlice } from '@reduxjs/toolkit'

interface ThemeState{
  darkMode:boolean
}

const initialState:ThemeState = {
  darkMode: true
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state){
      state.darkMode=!state.darkMode
    }
  }
});

export const {setTheme} = themeSlice.actions

export default themeSlice.reducer