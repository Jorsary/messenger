import {
  Avatar,
  Button,
  Grid,
  Popover,
  TextField,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Wrapper from "../components/layout/Wrapper";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { auth, db } from "../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import stringToColor from "../utlis/stringToColor";
interface ISettingsForm {
  nickname: string;
}


const UserSettings = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [load, setLoad] = useState(false);
  const dispatch = useAppDispatch()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ISettingsForm>({
    mode: "onSubmit",
  });

  const handleUpdateProfile = async (data: any) => {
    setLoad(true);
    try{if (currentUser) {
      await updateProfile(currentUser,{ displayName: data.nickname});
      await updateDoc(doc(db, "users", currentUser.uid), {
        displayName: data.nickname,
      });
      setLoad(false);
      const res = currentUser?.reload
    }}catch(err){
      console.log(err)
    }
  };

  
  
  return (
      <Wrapper>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {!load ? <><Avatar
            aria-describedby={id}
            onClick={(e) => handleClick(e)}
            sx={{
              maxWidth: 250,
              maxHeight: 250,
              width: "50vw",
              height: "50vw",
              bgcolor: stringToColor(`${currentUser?.displayName}`),
            }}
            alt={`${currentUser?.displayName}`}
            src={`${currentUser?.photoURL}`}
          />
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {currentUser?.displayName}
          </Typography>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit((data) => {
                handleUpdateProfile(data);
                reset();
              })}
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={!!errors.nickname}
                    id="Nickname"
                    label={`Ваш текущий ник ${currentUser?.displayName}`}
                    autoFocus
                    {...register("nickname", {
                      required: "Поле не может быть пустым",
                      minLength: {
                        value: 4,
                        message: "Не короче 4 символов",
                      },
                      maxLength: {
                        value: 10,
                        message: "Не длинее 10 символов",
                      },
                    })}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Изменить информацию
              </Button>
            </Box>
          </Box>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Modal setLoading={setLoad} onClose={handleClose}/>
          </Popover></> : <Loader/>}
        </Box>
      </Wrapper>
    );
};

export default UserSettings;
