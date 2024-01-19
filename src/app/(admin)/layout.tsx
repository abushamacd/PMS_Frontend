"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { ChevronRight } from "@mui/icons-material";
import Image from "next/image";
import light_icon from "@/assets/light_icon.png";
import dark_icon from "@/assets/dark_icon.png";
import { Sidebar } from "@/sections/Sidebar";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ThemeSwitcher from "@/components/UI/ThemeSwitcher";
import Notification from "@/components/UI/Notification";
import Link from "next/link";
import { useTheme } from "next-themes";
import UserProfile from "@/components/UI/UserProfile";
import ProtectedRoute from "@/utils/ProtectedRoute";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "none",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(true);
  const [toggle, setToggle] = React.useState("");
  const { theme, setTheme } = useTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ProtectedRoute>
      <Box sx={{ display: "flex" }}>
        <AppBar
          className="!bg-light_bg dark:!bg-dark_bg"
          position="absolute"
          open={open}
        >
          <Toolbar
            style={{ padding: "0px 10px " }}
            sx={{
              pr: "8px", // keep right padding when drawer closed
            }}
          >
            <Link href="/">
              <Typography
                sx={{
                  marginRight: "10px",
                  ...(open && { display: "none" }),
                }}
              >
                {theme === "light" ? (
                  <Image
                    className="h-[40px] w-[50px]"
                    alt="hero"
                    src={light_icon}
                  />
                ) : (
                  <Image
                    className="h-[40px] w-[50px]"
                    alt="hero"
                    src={dark_icon}
                  />
                )}
              </Typography>
            </Link>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginLeft: "10px",
                ...(open && { display: "none" }),
              }}
            >
              <ChevronRight className="dark:text-dark_primary text-light_text hover:dark:text-dark_text hover:text-light_primary duration-300 border border-light_text hover:border-light_primary dark:hover:border-dark_text dark:border-dark_primary  rounded-full" />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {/* You can write here */}
            </Typography>
            <Box display="flex">
              <IconButton>
                <ThemeSwitcher layout="admin" />
              </IconButton>
              <IconButton
                onClick={() => {
                  setToggle("notification");
                }}
              >
                <NotificationsOutlinedIcon className="dark:text-dark_primary text-light_text hover:dark:text-dark_text hover:text-light_primary duration-300" />
              </IconButton>
              <IconButton
                onClick={() => {
                  setToggle("userProfile");
                }}
              >
                <PersonOutlinedIcon className="dark:text-dark_primary text-light_text hover:dark:text-dark_text hover:text-light_primary duration-300" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Sidebar open={open} setOpen={setOpen} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container
            style={{ padding: "15px" }}
            className="bg-light_secondary dark:bg-dark_secondary"
            maxWidth="xl"
          >
            <div
              style={{ height: `calc(100vh - 94px)` }}
              className="bg-light_bg dark:bg-dark_bg rounded-lg p-4 overflow-auto"
            >
              {children}
            </div>
          </Container>
          {toggle === "notification" && (
            <Notification toggle={toggle} setToggle={setToggle} />
          )}
          {toggle === "userProfile" && (
            <UserProfile toggle={toggle} setToggle={setToggle} />
          )}
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
