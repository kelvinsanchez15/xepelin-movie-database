import * as React from "react";
import { Box, AppBar, Toolbar, Button, useScrollTrigger } from "@mui/material";

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
            <Button variant="contained" sx={{ mr: 2 }}>
              Entrar
            </Button>
            <Button variant="contained">Registrarse</Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}
