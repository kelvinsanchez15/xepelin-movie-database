import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Link from "../src/components/Link";
import { useRouter } from "next/router";
import { useLoginMutation } from "../src/app/services/auth";

export default function Signin() {
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login({ email, password }).unwrap();
      router.push("/");
    } catch (error) {
      console.log(error);
      setOpenErrorSnackbar(true);
    }
  };

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleCloseErrorSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnackbar(false);
  };

  return (
    <ThemeProvider
      theme={(theme) =>
        createTheme({
          ...theme,
          palette: {
            mode: "dark",
            primary: {
              ...theme.palette.primary,
            },
          },
        })
      }
    >
      <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              Inicia sesión
            </Typography>
            <Typography component="h2" variant="h6" sx={{ mb: 6 }}>
              ¡Qué bueno tenerte de vuelta!
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                sx={{ mb: 3 }}
                variant="filled"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleChangeEmail}
                disabled={isLoading}
              />
              <TextField
                sx={{ mb: 3 }}
                variant="filled"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChangePassword}
                disabled={isLoading}
              />

              <Button
                type="submit"
                disabled={isLoading}
                fullWidth
                variant="contained"
                size="extra-large"
                sx={{ mb: 2 }}
              >
                Entrar
              </Button>
              <Typography component="h2" variant="body2">
                ¿Aún no tienes cuenta?{" "}
                <Link
                  sx={{ color: "#fff", textDecorationColor: "#fff" }}
                  href="/signup"
                >
                  Regístrate
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>

        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseErrorSnackbar}
        >
          <Alert onClose={handleCloseErrorSnackbar} severity="error">
            Ups! Hubo un problema al intentar entrar
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
