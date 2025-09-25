"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useAuth } from "@/context/AuthContext";


// --- Nav items ---
const navItems = [
  {
    href: "/dashboard",
    label: "รายงาน",
    icon: <AssessmentOutlinedIcon fontSize="small" />,
    children: [
      { href: "/dashboard", label: "รายงานภาพรวม" },
      { href: "/dashboard/sales-report", label: "รายงานการขาย" },
      { href: "/dashboard/marketing-report", label: "รายงานการตลาด" },
      { href: "/dashboard/activity-report", label: "รายงานกิจกรรม" },
    ],
  },
  { href: "/dashboard/activities", label: "กิจกรรม", icon: <EventNoteOutlinedIcon fontSize="small" /> },
  { href: "/dashboard/calendar", label: "ปฏิทิน", icon: <CalendarMonthOutlinedIcon fontSize="small" /> },
  { href: "/dashboard/map", label: "แผนที่", icon: <MapOutlinedIcon fontSize="small" /> },
  { href: "/dashboard/products", label: "สินค้า", icon: <Inventory2OutlinedIcon fontSize="small" /> },
  {
    href: "/dashboard/sales",
    label: "การขาย",
    icon: <PointOfSaleOutlinedIcon fontSize="small" />,
    children: [
      { href: "/dashboard/sales/orders", label: "รายการขาย" },
      { href: "/dashboard/sales/quotations", label: "ใบเสนอราคา" },
    ],
  },
  { href: "/dashboard/marketing", label: "การตลาด", icon: <CampaignOutlinedIcon fontSize="small" /> },
  { href: "/dashboard/customers/list", label: "ลูกค้า", icon: <PeopleOutlineOutlinedIcon fontSize="small" /> },
  { href: "/dashboard/employee", label: "พนักงาน", icon: <Diversity3OutlinedIcon fontSize="small" /> },
  { href: "/dashboard/roles", label: "สิทธิ์", icon: <SecurityOutlinedIcon fontSize="small" /> },
];

// Role restrictions
const roleMenuRestrictions: Record<string, string[]> = {
  MARKETING_MANAGER: ["/dashboard/sales"],
  MARKETING_HEAD: ["/dashboard", "/dashboard/sales"],
  MARKETING_EMPLOYEE: ["/dashboard", "/dashboard/sales"],
  SALES_MANAGER: ["/dashboard/marketing"],
  SALES_HEAD: ["/dashboard", "/dashboard/marketing"],
  SALES_EMPLOYEE: ["/dashboard", "/dashboard/marketing"],
};

// Type restrictions
const typeMenuRestrictions: Record<string, string[]> = {
  User: ["/dashboard/employee", "/dashboard/roles"],
  GM: ["/dashboard/roles"],
  Admin: [],
};

// --- NavLink component ---
function NavLink({
  item,
  depth = 0,
  isOpen,
  onToggle,
  onLinkClick,
}: {
  item: any;
  depth?: number;
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  if (item.children) {
    return (
      <>
        <ListItemButton
          onClick={onToggle}
          sx={{
            borderRadius: 2,
            pl: depth ? 4 : 2,
            bgcolor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 32 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.label} />
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child: any) => (
              <Link key={child.href} href={child.href} onClick={onLinkClick}>
                <ListItemButton
                  sx={{
                    pl: 6,
                    fontSize: 14,
                    borderRadius: 2,
                    color: pathname === child.href ? "white" : "rgba(255,255,255,0.7)",
                    bgcolor: pathname === child.href ? "rgba(255,255,255,0.15)" : "transparent",
                  }}
                >
                  <ListItemText primary={child.label} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <Link href={item.href} onClick={onLinkClick}>
      <ListItemButton
        selected={isActive}
        sx={{
          borderRadius: 2,
          pl: depth ? 4 : 2,
          bgcolor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
          "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
        }}
      >
        <ListItemIcon sx={{ color: "inherit", minWidth: 32 }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItemButton>
    </Link>
  );
}

// --- Main Sidebar ---
export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { user } = useAuth();

  // Filter by role/type
  const filteredNavItems = navItems.filter((item) => {
    const roleName = user?.role?.name;
    const userType = user?.type as keyof typeof typeMenuRestrictions;
    const roleRestricted = roleMenuRestrictions[roleName] || [];
    const typeRestricted = typeMenuRestrictions[userType] || [];
    return !roleRestricted.includes(item.href) && !typeRestricted.includes(item.href);
  });

  // Auto-open submenu based on path
  useEffect(() => {
    const parent = navItems.find(
      (item) =>
        item.children &&
        item.children.some((child: any) => pathname.startsWith(child.href))
    );
    if (parent) setOpenMenu(parent.href);
  }, [pathname]);

  const content = (
    <Box
      sx={{
        width: 260,
        bgcolor: "#b92626",
        color: "white",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Logo */}
      <Stack direction="row" justifyContent="center" alignItems="center" py={3}>
        <Box sx={{ width: 96, height: 96, position: "relative" }}>
          <Image src="/images/logo.jpg" alt="Logo" fill style={{ objectFit: "contain" }} />
        </Box>
      </Stack>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 2 }} />

      {/* Nav */}
      <List sx={{ flex: 1, overflowY: "auto" }}>
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            isOpen={openMenu === item.href}
            onToggle={() => setOpenMenu(openMenu === item.href ? null : item.href)}
            onLinkClick={onClose}
          />
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer anchor="left" open={isOpen} onClose={onClose} sx={{ display: { md: "none" } }}>
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        {content}
      </Drawer>

      {/* Desktop Sidebar */}
      <Box sx={{ display: { xs: "none", md: "flex" }, flexShrink: 0 }}>{content}</Box>
    </>
  );
}
