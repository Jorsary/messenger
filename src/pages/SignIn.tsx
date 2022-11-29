import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { auth, db } from "../firebase/firebase";
import { useAppSelector } from "../hooks/redux-hooks";
import CircularProgress from "@mui/material/CircularProgress";
interface IAuthForm {
  phone: string;
  password: string;
  otp: string;
}

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}

export default function SignIn() {
  const [flag, setFlag] = useState(false);
  const [result, setResult] = useState<ConfirmationResult>();
  const [number, setNumber] = useState("");
  const { loadingUser } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>("");

  const { darkMode } = useAppSelector((state) => state.theme);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<IAuthForm>({
    mode: "onSubmit",
  });

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
    window.recaptchaVerifier.render();
  }, []);

  const onSubmit = async (data: IAuthForm) => {
    console.log(data.phone);
    try {
      setLoading(true);
      const response = await signInWithPhoneNumber(
        auth,
        `+${data.phone}`,
        window.recaptchaVerifier
      );
      setResult(response);
      setFlag(true);
      setNumber(data.phone);
    } catch (err: any) {
      setError(err);
      console.log(err);
    }
    reset();
    setLoading(false);
  };

  const verifyOtp = async (data: IAuthForm) => {
    setLoading(true);
    try {
      const res = await result?.confirm(data.otp);
      if (!res?.user.displayName && res?.user) {
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          phoneNumber: number,
        });
        await setDoc(doc(db, "userChats", res.user.uid), {});
      }
    } catch (err: any) {
      setError(err);
      console.log(err);
    }
    setLoading(false);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setError("");
  };

  if (auth.currentUser) {
    return <Navigate to="/" />;
  }
  if (loadingUser) {
    return (
      <Box sx={{ height: "80vh" }}>
        <Loader />
      </Box>
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box id="recaptcha-container"></Box>
      <Box
        sx={{
          paddingTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        {!flag ? (
          <Box
            component="form"
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
            })}
            noValidate
            sx={{ mt: 3 }}
          >
            <Controller
              control={control}
              name="phone"
              rules={{
                required: true,
                // pattern: {
                //   value:
                //     /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                //   message: "Некорректный номер телефона",
                // },
              }}
              render={({ field: { ref, ...field } }) => (
                <PhoneInput
                  {...field}
                  inputProps={{
                    ref,
                    required: true,
                    autoFocus: true,
                  }}
                  onEnterKeyPress={handleSubmit((data) => {
                    onSubmit(data);
                  })}
                  country="ru"
                  containerStyle={{ width: "100%" }}
                  countryCodeEditable={true}
                  specialLabel={"Player Mobile Number"}
                  inputStyle={{
                    backgroundColor: "transparent",
                    color: darkMode ? "white" : "black",
                    width: "100%",
                  }}
                  dropdownStyle={{
                    backgroundColor: darkMode ? "black" : "white",
                  }}
                  buttonStyle={{
                    color: "cyan",
                  }}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} color="info" /> : "Войти"}
            </Button>
            <Box id="recaptcha"></Box>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit((data) => {
              verifyOtp(data);
              reset();
            })}
            noValidate
            sx={{ mt: 1, textAlign: "center", maxWidth: 271 }}
          >
            На ваш телефон отправлен код
            <TextField
              error={!!errors.otp?.message}
              margin="normal"
              required
              fullWidth
              id="otp"
              placeholder="6-значный код"
              autoComplete="otp"
              autoFocus
              {...register("otp", {
                required: "Поле не может быть пустым",
                pattern: {
                  value: /^([0-9]{6})$|^([0-9]{6})$/im,
                  message: "Введите 6 значный код",
                },
              })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Подтвердить код
            </Button>
          </Box>
        )}
      </Box>
      <Snackbar onClose={handleClose} open={!!error} autoHideDuration={5000}>
        <MuiAlert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error.message}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}
