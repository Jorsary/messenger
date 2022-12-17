import CloseIcon from "@mui/icons-material/Close";
import { Backdrop, Card } from "@mui/material";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { handleCloseImagePopup } from "../../store/popupsSlice";

function ImagePopup() {
  const { imageIsOpen, imageLink } = useAppSelector((state) => state.popups);
  const dispatch = useAppDispatch();
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={imageIsOpen}
      onClick={() => {
        dispatch(handleCloseImagePopup());
      }}
    >
      <Card>
        <img alt={'картинка'} style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }} src={imageLink} />
        <CloseIcon
          fontSize={"large"}
          sx={{
            color: "white",
            display: imageIsOpen ? "inline-block" : "none",
            position: "absolute",
            cursor: "pointer",
            transition: "all .2s ease-in-out",
            "&:hover": {
              opacity: 0.6,
            },
          }}
        />
      </Card>
    </Backdrop>
  );
}

export default memo(ImagePopup);
