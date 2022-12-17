import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface PopupState {
  imageIsOpen: boolean;
  imageLink: string;
}
interface IPropPopup {
  imageIsOpen?: boolean;
  imageLink: string;
}
const initialState : PopupState = {
  imageIsOpen: false,
  imageLink: '',
};

const popupsSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    handleOpenImagePopup(state,action:PayloadAction<IPropPopup>){
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
