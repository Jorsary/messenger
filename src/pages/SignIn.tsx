import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { app } from "../firebase/firebase";
import { SubmitHandler, useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "../hooks/redux-hooks";
import Loader from "../components/Loader";

interface IAuthForm {
  email: string;
  password: string;
}

export default function SignIn() {
  const {currentUser,loadingUser} = useAppSelector(state=>state.user)
  const push = useNavigate();
  const auth = getAuth(app);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(email, password);
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
    handleLogin(data.email, data.password);
  };

  

  if (currentUser) {
    return <Navigate to="/" />;
  }
  if (loading || loadingUser) {
    return (
      <Loader />
    );
  }
  return (
    <Container component="main" maxWidth="xs">
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
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Адрес эл. почты"
            autoComplete="email"
            autoFocus
            {...register("email", {
              required: "Поле не может быть пустым",
              pattern: {
                value:
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                message: "Некорректный email",
              },
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
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
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={() => push("/signup")} variant="body2">
                {"Нет аккаунта? Зарегистрироваться"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
