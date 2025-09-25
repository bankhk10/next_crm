"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo, useState, useTransition } from "react";

import {
  Button,
  Avatar,
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import type { SessionUser } from "@/lib/auth";
import { logout } from "@/app/actions/auth";

type NavItem = {
  label: string;
  icon: ReactNode;
  href?: string;
  children?: NavItem[];
};

type DashboardShellProps = {
  children: ReactNode;
  user: SessionUser;
};

const REPORTS_CHILDREN: NavItem[] = [
  { label: "รายงานภาพรวม", href: "/dashboard/reports/overview" },
  { label: "รายงานการขาย", href: "/dashboard/reports/sales" },
  { label: "รายงานการเงิน", href: "/dashboard/reports/finance" },
  { label: "รายงานกิจกรรม", href: "/dashboard/reports/activity" },
];

const NAV_ITEMS: NavItem[] = [
  {
    label: "รายงาน",
    icon: <AssessmentOutlinedIcon fontSize="small" />,
    children: REPORTS_CHILDREN,
  },
  { label: "กิจกรรม", icon: <EventNoteOutlinedIcon fontSize="small" />, href: "/dashboard/activities" },
  { label: "ปฏิทิน", icon: <CalendarMonthOutlinedIcon fontSize="small" />, href: "/dashboard/calendar" },
  { label: "แผนที่", icon: <MapOutlinedIcon fontSize="small" />, href: "/dashboard/map" },
  { label: "สินค้า", icon: <Inventory2OutlinedIcon fontSize="small" />, href: "/dashboard/products" },
  { label: "การขาย", icon: <PointOfSaleOutlinedIcon fontSize="small" />, href: "/dashboard/sales" },
  { label: "การตลาด", icon: <CampaignOutlinedIcon fontSize="small" />, href: "/dashboard/marketing" },
  { label: "ลูกค้า", icon: <PeopleOutlineOutlinedIcon fontSize="small" />, href: "/dashboard/customers" },
  { label: "พนักงาน", icon: <Diversity3OutlinedIcon fontSize="small" />, href: "/dashboard/employees" },
];

function NavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    if (item.href) {
      return pathname === item.href;
    }

    if (item.children?.length) {
      return item.children.some((child) => pathname.startsWith(child.href ?? ""));
    }

    return false;
  }, [item, pathname]);

  const [open, setOpen] = useState(isActive || item === NAV_ITEMS[0]);

  const handleToggle = () => {
    if (item.children) {
      setOpen((prev) => !prev);
    }
  };

  const baseStyles = {
    borderRadius: 2,
    color: "common.white",
    px: depth ? 3 : 2.5,
    py: 1,
    gap: 1.5,
    minHeight: 44,
    textTransform: "none" as const,
    fontWeight: isActive ? 600 : 500,
    bgcolor: isActive ? "rgba(255,255,255,0.18)" : "transparent",
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.1)",
    },
  };

  if (item.children?.length) {
    return (
      <Box>
        <ListItemButton onClick={handleToggle} sx={baseStyles}>
          <ListItemIcon sx={{ minWidth: 0, color: "inherit" }}>{item.icon}</ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{ fontWeight: isActive ? 600 : 500, fontSize: 14 }}
          />
          {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 1.5 }}>
            {item.children.map((child) => (
              <NavLink key={child.label} item={child} depth={depth + 1} />
            ))}
          </List>
        </Collapse>
      </Box>
    );
  }

  const Component = item.href ? Link : "button";

  return (
    <ListItemButton
      component={Component as any}
      href={item.href}
      sx={baseStyles}
      selected={isActive}
    >
      <ListItemIcon sx={{ minWidth: 0, color: "inherit" }}>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
    </ListItemButton>
  );
}

export default function DashboardShell({ children, user }: DashboardShellProps) {
  const [isLoggingOut, startLogout] = useTransition();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f1f3f6" }}>
      <Box
        component="nav"
        sx={{
          width: 260,
          bgcolor: "#c62828",
          color: "common.white",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          py: 3,
          px: 2,
          gap: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: "common.white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Typography variant="h5" fontWeight={800} color="error.main">
              ตร.
            </Typography>
          </Box>
          <Stack spacing={0.5}>
            <Typography variant="subtitle1" fontWeight={700}>
              ตราช่างใหญ่
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.85 }}>
              ระบบบริหารจัดการ
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </List>
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          component="header"
          sx={{
            bgcolor: "#d32f2f",
            color: "common.white",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1,
            px: { xs: 2, md: 4 },
            py: 2,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton size="small" sx={{ color: "inherit" }}>
              <NotificationsNoneOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "inherit" }}>
              <SettingsOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "inherit" }}>
              <HelpOutlineOutlinedIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.4)" }} />
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box textAlign="right">
                <Typography variant="body2" fontWeight={600}>
                  {user.name ?? user.email}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Admin
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 36, height: 36 }}>
                {user.name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
              </Avatar>
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={() => startLogout(() => logout())}
                disabled={isLoggingOut}
                startIcon={<LogoutOutlinedIcon fontSize="small" />}
                sx={{
                  color: "common.white",
                  borderColor: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "common.white",
                    bgcolor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                ออกจากระบบ
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
          <Box
            sx={{
              bgcolor: "common.white",
              borderRadius: 3,
              minHeight: "calc(100vh - 160px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              p: { xs: 2.5, md: 4 },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
