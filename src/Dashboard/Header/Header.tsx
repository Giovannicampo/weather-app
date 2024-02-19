import { Fragment, ReactElement } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { themePalette } from "../../utility/shared_defines";
import logo from "../../assets/pics/logo1.png";
import "../../assets/css/header.css";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  textAlign: "center",
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(1),
  // Override media queries injected by theme.mixins.toolbar
  backgroundColor: themePalette.palette.primary.main,
  "@media all": {
    minHeight: 150,
  },
}));

interface HeaderProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

export default function Header(props: HeaderProps): ReactElement {
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          open={props.open}
          position="static"
          sx={{ flexGrow: 1 }}
        >
          <StyledToolbar>
          <IconButton
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(props.open && { display: 'none' }) }}
          >
            <MenuIcon sx={{color: "#b33904"}}/>
          </IconButton>
            <Box
              display="flex"
              width={window.innerWidth}
              height="inherit"
              alignItems="center"
              justifyContent="center"
            >
              <img
                style={{
                  height: "150px",
                  width: "150px",
                }}
                src={logo}
                alt="Logo"
              />
            </Box>
          </StyledToolbar>
        </AppBar>
      </Box>
    </Fragment>
  );
}
