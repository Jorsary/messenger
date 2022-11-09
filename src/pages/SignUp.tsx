import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { doc, setDoc } from "firebase/firestore";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { useAppSelector } from "../hooks/redux-hooks";
interface IAuthForm {
  email: string;
  password: string;
  displayName: string;
}

export default function SignUp() {
  const [createUserWithEmailAndPassword, user, loading] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);
  const { currentUser, loadingUser } = useAppSelector((state) => state.user);

  const handleRegister = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      await createUserWithEmailAndPassword(email, password);

      if (auth.currentUser) {
        await updateProfile({ displayName });
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          displayName,
          email,
          photoURL: null,
        });
        await setDoc(doc(db, "userChats", auth.currentUser.uid), {});
        push("/");
      }
    } catch (error) {
      console.dir(error);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IAuthForm>({
    mode: "all",
  });

  const onSubmit = (data: IAuthForm) => {
    handleRegister(data.email, data.password, data.displayName);
  };
  const push = useNavigate();

  if (currentUser) {
    return <Navigate to="/" />;
  }
  if (loading || loadingUser) {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Никнейм"
                autoComplete="nickname"
                {...register("displayName", {
                  required: "Поле не может быть пустым",
                  pattern: {
                    value: /[A-Za-z0-9]/g,
                    message: "Некорректный никнейм",
                  },
                  minLength: {
                    value: 6,
                    message: `Минимальная длина 6 символов`,
                  },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Адрес эл. почты"
                autoComplete="email"
                {...register("email", {
                  required: "Поле не может быть пустым",
                  pattern: {
                    value:
                      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    message: "Некорректный email",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Пароль"
                type="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Поле не может быть пустым",
                  pattern: {
                    value: /[A-Za-z0-9]/g,
                    message: "Некорректный password",
                  },
                  minLength: {
                    value: 6,
                    message: `Минимальная длина 6 символов`,
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
            Зарегестрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => push("/signin")}
                variant="body2"
              >
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
