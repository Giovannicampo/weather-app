import { Fragment, ReactElement, ReactNode } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Drawer } from "@mui/material";
import { drawerWidth } from "../Header/Header";
import { CONTEXT, PATH, themePalette } from "../../utility/shared_defines";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import UpdateIcon from "@mui/icons-material/Update";
import HistoryIcon from "@mui/icons-material/History";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

enum INDEX {
  INTRO,
  CURRENT,
  FORECAST,
  HISTORY,
  SAVED,
}

enum SECTION {
  INTRO = "Introduction",
  CURRENT = "Current weather",
  FORECAST = "Forecast",
  HISTORY = "History",
  SAVED = "Saved",
}

interface MenuProps {
  openDrawer: boolean;
  setOpenDrawer: (flag: boolean) => void;
}

export default function Menu(props: MenuProps): ReactElement {
  const open = props.openDrawer;
  const setOpen = props.setOpenDrawer;

  const navigate = useNavigate();
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerSections: SECTION[] = [
    SECTION.INTRO,
    SECTION.CURRENT,
    SECTION.FORECAST,
    SECTION.HISTORY,
    SECTION.SAVED,
  ];

  const drawerIcons = (index: INDEX): ReactNode => {
    switch (index) {
      case INDEX.INTRO:
        return <CloudQueueIcon />;
      case INDEX.CURRENT:
        return <WbSunnyIcon />;
      case INDEX.FORECAST:
        return <UpdateIcon />;
      case INDEX.HISTORY:
        return <HistoryIcon />;
      case INDEX.SAVED:
        return <SaveAltIcon />;
    }
  };

  const handleOnClick = (index: INDEX): void => {
    switch (index) {
      case INDEX.INTRO:
        navigate(PATH.INTRO);
        break;
      case INDEX.CURRENT:
        navigate(PATH.CURRENT);
        break;
      case INDEX.FORECAST:
        navigate(PATH.FORECAST);
        break;
      case INDEX.HISTORY:
        navigate(PATH.HISTORY);
        break;
      case INDEX.SAVED:
        navigate(PATH.SAVED);
        break;
    }
  };

  return (
    <Fragment>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: themePalette.palette.primary.main,
            color: themePalette.palette.secondary.main,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerSections.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleOnClick(index)}>
                <ListItemIcon>{drawerIcons(index)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Fragment>
  );
}
