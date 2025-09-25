"use client";

import { usePathname } from "next/navigation";
import { Fragment, ReactNode, useEffect, useState } from "react";
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
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CampaignIcon from '@mui/icons-material/Campaign';
import PersonIcon from '@mui/icons-material/Person';
import Diversity3Icon from '@mui/icons-material/Diversity3';


import LinkBehavior from "@/components/LinkBehavior"; // ✅ import ที่สร้างไว้

type NavChild = {
  href: string;
  label: string;
};

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  children?: NavChild[];
};

const BRAND_COLOR = "#b92626";
const ACTIVE_BACKGROUND = "#991b1b";
const HOVER_BACKGROUND = "#991b1b";
const CHILD_TEXT_COLOR = "rgba(255,255,255,0.7)";

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "รายงาน",
    icon: <AssessmentIcon fontSize="small" />,
    children: [
      { href: "/dashboard/reports/overview", label: "รายงานภาพรวม" },
      { href: "/dashboard/reports/sales", label: "รายงานการขาย" },
      { href: "/dashboard/reports/marketing", label: "รายงานการตลาด" },
      { href: "/dashboard/reports/activity", label: "รายงานกิจกรรม" },
    ],
  },
  {
    href: "/dashboard/activities",
    label: "กิจกรรม",
    icon: <AssignmentIndIcon fontSize="small" />,
  },
  {
    href: "/dashboard/calendar",
    label: "ปฏิทิน",
    icon: <CalendarMonthIcon fontSize="small" />,
  },
  {
    href: "/dashboard/map",
    label: "แผนที่",
    icon: <LocationOnIcon fontSize="small" />,
  },
  {
    href: "/dashboard/products",
    label: "สินค้า",
    icon: <Inventory2Icon fontSize="small" />,
  },
  {
    href: "/dashboard/sales",
    label: "การขาย",
    icon: <MonetizationOnIcon fontSize="small" />,
    children: [
      { href: "/dashboard/sales/orders", label: "รายการขาย" },
      { href: "/dashboard/sales/quotations", label: "ใบเสนอราคา" },
    ],
  },
  {
    href: "/dashboard/marketing",
    label: "การตลาด",
    icon: <CampaignIcon fontSize="small" />,
  },
  {
    href: "/dashboard/customers",
    label: "ลูกค้า",
    icon: <PersonIcon fontSize="small" />,
  },
  {
    href: "/dashboard/employees",
    label: "พนักงาน",
    icon: <Diversity3Icon fontSize="small" />,
  },
  {
    href: "/dashboard/roles",
    label: "สิทธิ์",
    icon: <SecurityOutlinedIcon fontSize="small" />,
  },
];

type NavLinkProps = {
  item: NavItem;
  depth?: number;
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
  pathname: string;
};

function NavLink({
  item,
  depth = 0,
  isOpen,
  onToggle,
  onLinkClick,
  pathname,
}: NavLinkProps) {
  const isActive = item.children
    ? item.children.some((child) => pathname.startsWith(child.href))
    : pathname === item.href;

  if (item.children?.length) {
    return (
      <Fragment>
        <ListItemButton
          onClick={onToggle}
          sx={{
            borderRadius: 4,
            pl: depth ? 4 : 2,
            mx: 1,
            bgcolor: isActive ? ACTIVE_BACKGROUND : "transparent",
            "&:hover": { bgcolor: HOVER_BACKGROUND },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.label} />
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box
            sx={{
              bgcolor: "#991b1b",
              borderRadius: 3,
              mx: 1,
              my: 0.5,
              p: 0.5,
            }}
          >
            <List component="div" disablePadding>
              {item.children.map((child) => {
                const childIsActive = pathname === child.href;
                return (
                  <ListItemButton
                    key={child.href}
                    component={LinkBehavior} // ✅ ใช้ LinkBehavior
                    href={child.href}
                    onClick={onLinkClick}
                    sx={{
                      pl: 4,
                      fontSize: 14,
                      borderRadius: 2,
                      color: childIsActive ? "white" : CHILD_TEXT_COLOR,
                      bgcolor: childIsActive
                        ? `${ACTIVE_BACKGROUND} !important`
                        : "transparent",
                      "&:hover": { bgcolor: `${HOVER_BACKGROUND} !important` },
                      textDecoration: "none",
                    }}
                  >
                    <ListItemText primary={child.label} />
                    {childIsActive && (
                      <Box
                        component="span"
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: "white",
                          borderRadius: "50%",
                          ml: 1.5,
                        }}
                      />
                    )}
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        </Collapse>
      </Fragment>
    );
  }

  return (
    <ListItemButton
      component={LinkBehavior} // ✅ ใช้ LinkBehavior
      href={item.href}
      onClick={onLinkClick}
      selected={isActive}
      sx={{
        borderRadius: 2,
        pl: depth ? 4 : 2,
        mx: 1,
        bgcolor: isActive ? `${ACTIVE_BACKGROUND} !important` : "transparent",
        "&:hover": { bgcolor: `${HOVER_BACKGROUND} !important` },
        "&.Mui-selected": {
          bgcolor: `${ACTIVE_BACKGROUND} !important`,
          "&:hover": { bgcolor: `${HOVER_BACKGROUND} !important` },
        },
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={item.label} />
    </ListItemButton>
  );
}

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const parent = navItems.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.href))
    );
    setOpenMenu(parent ? parent.href : null);
  }, [pathname]);

  const content = (
    <Box
      sx={{
        width: 230,
        bgcolor: BRAND_COLOR,
        color: "white",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center" py={3}>
        <Box
          sx={{
            width: 150,
            height: 150,
            position: "relative",
            borderRadius: "10%",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Stack>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 2 }} />

      <List sx={{ flex: 1, overflowY: "auto" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            isOpen={openMenu === item.href}
            onToggle={() =>
              setOpenMenu((current) =>
                current === item.href ? null : item.href
              )
            }
            onLinkClick={onClose}
            pathname={pathname}
          />
        ))}
      </List>
    </Box>
  );

  return (
    <Fragment>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={onClose}
        sx={{ display: { md: "none" } }}
      >
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        {content}
      </Drawer>

      <Box sx={{ display: { xs: "none", md: "flex" }, flexShrink: 0 }}>
        {content}
      </Box>
    </Fragment>
  );
}
