import { Fragment, ReactElement, useState } from "react";
import Header from "../Dashboard/Header/Header";
import { Box, Toolbar, Container } from "@mui/material";
import Menu from "../Dashboard/Menu/Menu";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../Dashboard/Header/Header";
import CurrentWeather from "./CurrentWeather";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default function CurrentWeatherView(): ReactElement {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  return (
    <Fragment>
      <Header open={openDrawer} handleDrawerOpen={handleDrawerOpen} />
      <Box sx={{ display: "flex" }}>
        <Menu
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
        <Main open={openDrawer}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, overflow: "auto" }}>
              <CurrentWeather />
            </Container>
          </Box>
        </Main>
      </Box>
    </Fragment>
  );
}
