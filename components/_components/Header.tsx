"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Divider,
  Avatar,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "@/context/AuthContext";

export default function Header({
  user,
  onMenuClick,
}: {
  user: any;
  onMenuClick: () => void;
}) {
  const { logout } = useAuth();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        color: "common.white",
        px: { xs: 2, md: 4 },
        py: 1.5,
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        {/* Hamburger menu (mobile only) */}
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { md: "none" }, color: "inherit" }}
        >
          <MenuIcon />
        </IconButton>

        {/* Spacer (แทน flex-1 เดิม) */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right actions */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton size="small" sx={{ color: "inherit" }}>
            <NotificationsNoneOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" sx={{ color: "inherit" }}>
            <LanguageOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            sx={{ color: "inherit" }}
            onClick={logout}
          >
            <LogoutOutlinedIcon />
          </IconButton>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "rgba(255,255,255,0.4)" }}
          />

          {/* User info */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,0.25)",
                width: 36,
                height: 36,
              }}
            >
              {user?.name?.[0]?.toUpperCase() ??
                user?.email?.[0]?.toUpperCase() ??
                <AccountCircleIcon />}
            </Avatar>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {user?.name}
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
