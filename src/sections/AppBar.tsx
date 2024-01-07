"use client";
import { Box, IconButton, InputBase } from "@mui/material";
import { useTheme } from "next-themes";
import { MdNotificationsNone, MdSearch } from "react-icons/md";
import { IoPersonCircleOutline, IoSettingsOutline } from "react-icons/io5";
import SearchIcon from "@mui/icons-material/Search";
import ThemeSwitcher from "@/components/UI/ThemeSwitcher";

const AppBar = () => {
  const theme = useTheme();

  return (
    <div className=" bg-dark_bg ">
      {/* SEARCH BAR */}
      <Box className={`flex`}>
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon className="text-light_primary dark:text-dark_primary" />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box className={`flex bg-dark_bg`}>
        <IconButton type="button" sx={{ p: 1 }}>
          <ThemeSwitcher />
        </IconButton>
        <IconButton type="button" sx={{ p: 1 }}>
          <MdNotificationsNone />
        </IconButton>
        <IconButton type="button" sx={{ p: 1 }}>
          <IoSettingsOutline />
        </IconButton>
        <IconButton type="button" sx={{ p: 1 }}>
          <IoPersonCircleOutline />
        </IconButton>
      </Box>
    </div>
  );
};

export default AppBar;
