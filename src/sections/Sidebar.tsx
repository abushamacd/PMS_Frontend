"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { ChevronLeft } from "@mui/icons-material";
import light_icon from "@/assets/light_icon.png";
import dark_icon from "@/assets/dark_icon.png";
import Image from "next/image";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Dashboard, CardMembership, ContactPage } from "@mui/icons-material";
import Link from "next/link";
import { useTheme } from "next-themes";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, open, bg, color }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: bg,
    color: color,
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { theme, setTheme } = useTheme();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Drawer
      sx={{}}
      // @ts-ignore
      bg={theme === "light" ? "#fff" : "#050B2F"}
      color={theme === "light" ? "#000000" : "#fff"}
      variant="permanent"
      open={open}
    >
      <Toolbar
        sx={{
          borderRight: "none !important",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
        }}
      >
        <div className={`text-sm flex text-[#259FD9]  flex-col text-center`}>
          <Link
            href="/"
            className="dark:text-dark_primary text-light_primary hover:dark:text-dark_text hover:text-light_text duration-300 text-2xl hidden md:block"
          >
            {theme === "light" ? (
              <Image
                className="h-[60px] w-[86px] p-2 ml-[50px]"
                alt="hero"
                src={light_icon}
              />
            ) : (
              <Image
                className="h-[60px] w-[86px] p-2 ml-[50px]"
                alt="hero"
                src={dark_icon}
              />
            )}
          </Link>
        </div>
        <IconButton
          sx={{
            marginRight: "-8px",
          }}
          onClick={toggleDrawer}
        >
          <ChevronLeft className="dark:text-dark_primary text-light_text hover:dark:text-dark_text hover:text-light_primary duration-300 border border-light_text hover:border-light_primary dark:hover:border-dark_text dark:border-dark_primary  rounded-full" />
        </IconButton>
      </Toolbar>

      <div className="text-sm pl-2 text-light_primary dark:text-dark_primary duration-300 mt-2">
        General
      </div>
      <List sx={{ padding: "10px" }} component="nav">
        <Link href={`/dashboard`}>
          <ListItemButton
            sx={{
              padding: {
                xs: "8px",
                md: "8px 16px",
              },
            }}
            style={{ borderBottom: `1px solid #259FD9` }}
          >
            <ListItemIcon>
              <Dashboard className="text-light_primary dark:text-dark_primary duration-300" />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: "15px" }}
              primary="Dashboard"
            />
          </ListItemButton>
        </Link>
        <Link href={`/profile`}>
          <ListItemButton
            sx={{
              padding: {
                xs: "8px",
                md: "8px 16px",
              },
            }}
            style={{ borderBottom: `1px solid #259FD9` }}
          >
            <ListItemIcon>
              <ContactPage className="text-light_primary dark:text-dark_primary duration-300" />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: "15px" }}
              primary="Profile"
            />
          </ListItemButton>
        </Link>
      </List>
      {/* Course */}
      <div className="text-sm pl-2 text-light_primary dark:text-dark_primary duration-300 mt-2">
        Course
      </div>
      <List sx={{ padding: "10px" }} component="nav">
        <Link href={`/create-course`}>
          <ListItemButton
            sx={{
              padding: {
                xs: "8px",
                md: "8px 16px",
              },
            }}
            style={{ borderBottom: `1px solid #259FD9` }}
          >
            <ListItemIcon>
              <CardMembership className="text-light_primary dark:text-dark_primary duration-300" />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: "15px" }}
              primary="Create Course"
            />
          </ListItemButton>
        </Link>
      </List>
    </Drawer>
  );
};
