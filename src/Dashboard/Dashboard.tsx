import { Fragment, ReactElement, useEffect, useState } from "react";
import Header from "./Header/Header";
import { Box, Toolbar, Container } from "@mui/material";
import { CONTEXT, getContext } from "../utils/shared_defines";
import Menu from "./Menu/Menu";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "./Header/Header";

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

export default function Dashboard(): ReactElement {
  const [context, setContext] = useState(CONTEXT.INTRO);
  const [openDrawer, setOpenDrawer] = useState(false);
  let contextChild: ReactElement = getContext(context);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  useEffect(() => {
    contextChild = getContext(context);
  }, [context]);

  return (
    <Fragment>
      <Header open={openDrawer} handleDrawerOpen={handleDrawerOpen} />
      <Box sx={{ display: "flex" }}>
        <Menu
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          setContext={setContext}
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
              {contextChild}
            </Container>
          </Box>
        </Main>
      </Box>
    </Fragment>
  );
}
