import {
  Avatar,
  Box,
  Button,
  Container,
  Input,
  Typography,
} from "@mui/material";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setUserInfo,setLoading } from "../store/userSlice";

const Modal = ({ onClose }: any) => {
  const { displayName } = useAppSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<undefined | string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleChangeAvatar = async (e: any) => {
    e.preventDefault();
    dispatch(setLoading({loading:true, error:undefined}))
    if (auth.currentUser && displayName && selectedFile) {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      await uploadBytesResumable(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: downloadURL,
      });
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        photoURL: downloadURL,
      });
      dispatch(setUserInfo({ ...auth.currentUser }));
      dispatch(setLoading({loading:false, error:undefined}))
      onClose();
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          padding: 1,
        }}
        onSubmit={handleChangeAvatar}
      >
        <Typography component="h1" variant="h5">
          Смена аватара
        </Typography>
        <Input
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={onSelectFile}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Выбрать фото
          </Button>
        </label>
        <Avatar
          sx={{ width: 100, height: 100 }}
          src={selectedFile ? preview : ""}
        />
        <Button type="submit" fullWidth variant="contained">
          Изменить
        </Button>
      </Box>
    </Container>
  );
};

export default Modal;
