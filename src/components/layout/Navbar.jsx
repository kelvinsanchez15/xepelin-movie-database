import * as React from "react";
import { Box, AppBar, Toolbar, Button, useScrollTrigger } from "@mui/material";

import Link from "../Link";

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
  return (
    <Box component="nav" sx={{ flexGrow: 1 }}>
      <ElevationScroll>
        <AppBar elevation={0}>
          <Toolbar sx={{ justifyContent: "flex-end" }}>
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
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}
