import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { auth, db } from "../firebase/firebase";
import { useAppSelector } from "../hooks/redux-hooks";

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

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IAuthForm>({
    mode: "onSubmit",
  });

  function generateRecaptcha(number: string) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const onSubmit = async (data: IAuthForm) => {
    try {
      setLoading(true)
      const response = await generateRecaptcha(data.phone);
      setResult(response);
      setFlag(true);
      setNumber(data.phone);
    } catch (err) {
      console.log(err);
    }
    reset();
    setLoading(false)
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
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
            sx={{ mt: 1 }}
          >
            <TextField
              error={!!errors.phone?.message}
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Номер телефона"
              autoComplete="phone"
              autoFocus
              {...register("phone", {
                required: "Поле не может быть пустым",
                pattern: {
                  value:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                  message: "Некорректный номер телефона",
                },
              })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Запомнить меня"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <Loader/> : 'Войти'}
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
            sx={{ mt: 1, textAlign: "center" }}
          >
            На ваш телефон отправлен код
            <TextField
              error={!!errors.otp?.message}
              margin="normal"
              required
              fullWidth
              id="otp"
              label="6-значный код"
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
    </Container>
  );
}
