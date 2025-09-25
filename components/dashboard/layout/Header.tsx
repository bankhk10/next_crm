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
import { useAuth, SessionUser } from "@/context/AuthContext";

type HeaderProps = {
  user: SessionUser | null;
  onMenuClick: () => void;
};

const AVATAR_STYLE = {
  bgcolor: "rgba(255,255,255,0.25)",
  width: 36,
  height: 36,
};

const ACTION_ICON_STYLE = { color: "inherit" } as const;

function resolveUserInitial(user: SessionUser | null) {
  const source = user?.name || user?.email;
  return source?.charAt(0).toUpperCase() ?? null;
}

function resolveUserName(user: SessionUser | null) {
  return user?.name || user?.email || "";
}

export default function Header({ user, onMenuClick }: HeaderProps) {
  const { logout } = useAuth();
  const userInitial = resolveUserInitial(user);
  const displayName = resolveUserName(user);

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
        <IconButton edge="start" onClick={onMenuClick} sx={{ display: { md: "none" }, ...ACTION_ICON_STYLE }}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton size="small" sx={ACTION_ICON_STYLE}>
            <NotificationsNoneOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" sx={ACTION_ICON_STYLE}>
            <LanguageOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" sx={ACTION_ICON_STYLE} onClick={logout}>
            <LogoutOutlinedIcon />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.4)" }} />

          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={AVATAR_STYLE}>
              {userInitial ? userInitial : <AccountCircleIcon fontSize="small" />}
            </Avatar>
            {displayName && (
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {displayName}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
