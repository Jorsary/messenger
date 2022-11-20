import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface PopupState {
  imageIsOpen?: boolean;
  imageLink: string;
}
const initialState = {
  imageIsOpen: false,
  imageLink: '',
};

const popupsSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    handleOpenImagePopup(state,action:PayloadAction<PopupState>){
      state.imageIsOpen=true
      state.imageLink=action.payload.imageLink
    },
    handleCloseImagePopup(state){
      state.imageIsOpen=false
      state.imageLink=''
    }
  },
});

export const {handleOpenImagePopup,handleCloseImagePopup} = popupsSlice.actions;

export default popupsSlice.reducer;
