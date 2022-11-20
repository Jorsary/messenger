import { memo, useEffect, useState } from "react";
import { Backdrop, Card, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import CloseIcon from "@mui/icons-material/Close";
import { handleCloseImagePopup } from "../../store/popupsSlice";

function ImagePopup() {
  const { imageIsOpen, imageLink } = useAppSelector((state) => state.popups);
  const dispatch = useAppDispatch();
  return (
    <Backdrop
    
      sx={{  zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={imageIsOpen}
      onClick={() => {
        dispatch(handleCloseImagePopup());
      }}
    >
      <Card>
        <img
          style={{ width: "60vw", maxWidth: 600 }}
          className="popup__image"
          src={imageLink}
        />
        <CloseIcon
          fontSize={"large"}
          sx={{
            color:'white',
            display: imageIsOpen ? "inline-block" : "none",
            position: "absolute",
            cursor: "pointer",
          }}
        />
      </Card>
    </Backdrop>
  );
}

export default memo(ImagePopup);
