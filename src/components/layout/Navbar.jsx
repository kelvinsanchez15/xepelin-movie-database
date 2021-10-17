import * as React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Box, AppBar, Toolbar, Button, useScrollTrigger } from "@mui/material";

import Link from "../Link";
import { useAuth } from "../../hooks/useAuth";
import { logoutCurrentUser } from "../../app/authSlice";
import { clearFavoritesMovies } from "../../app/favoritesMoviesSlice";

function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    sx: { backgroundColor: trigger ? "#141414" : "transparent" },
  });
}

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useAuth();

  const onLogOut = () => {
    dispatch(logoutCurrentUser());
    dispatch(clearFavoritesMovies());
    router.push("/signin");
  };

  return (
    <Box component="nav" sx={{ flexGrow: 1 }}>
      <ElevationScroll>
        <AppBar elevation={0}>
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            {!user ? (
              <>
                <Button
                  component={Link}
                  href="/signin"
                  variant="contained"
                  sx={{ mr: 2 }}
                >
                  Entrar
                </Button>
                <Button component={Link} href="/signup" variant="contained">
                  Registrarse
                </Button>
              </>
            ) : (
              <Button onClick={onLogOut} variant="contained">
                Salir
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}
