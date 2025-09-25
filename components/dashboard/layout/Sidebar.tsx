"use client";

import Link from "next/link";
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
const ACTIVE_BACKGROUND = "rgba(255,255,255,0.15)";
const HOVER_BACKGROUND = "rgba(255,255,255,0.1)";
const CHILD_TEXT_COLOR = "rgba(255,255,255,0.7)";

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "รายงาน",
    icon: <AssessmentOutlinedIcon fontSize="small" />,
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
    icon: <EventNoteOutlinedIcon fontSize="small" />,
  },
  {
    href: "/dashboard/calendar",
    label: "ปฏิทิน",
    icon: <CalendarMonthOutlinedIcon fontSize="small" />,
  },
  {
    href: "/dashboard/map",
    label: "แผนที่",
    icon: <MapOutlinedIcon fontSize="small" />,
  },
  {
    href: "/dashboard/products",
    label: "สินค้า",
    icon: <Inventory2OutlinedIcon fontSize="small" />,
  },
  {
    href: "/dashboard/sales",
    label: "การขาย",
    icon: <PointOfSaleOutlinedIcon fontSize="small" />,
    children: [
      { href: "/dashboard/sales/orders", label: "รายการขาย" },
      { href: "/dashboard/sales/quotations", label: "ใบเสนอราคา" },
    ],
  },
  {
    href: "/dashboard/marketing",
    label: "การตลาด",
    icon: <CampaignOutlinedIcon fontSize="small" />,
  },
  {
    href: "/dashboard/customers/list",
    label: "ลูกค้า",
    icon: <PeopleOutlineOutlinedIcon fontSize="small" />,
  },
  {
    href: "/dashboard/employee",
    label: "พนักงาน",
    icon: <Diversity3OutlinedIcon fontSize="small" />,
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
  // ถ้ามี children ให้ active เมื่อ pathname ตรงกับ child
  const isActive = item.children
    ? item.children.some((child) => pathname.startsWith(child.href))
    : pathname === item.href;

  if (item.children?.length) {
    return (
      <Fragment>
        <ListItemButton
          onClick={onToggle}
          sx={{
            borderRadius: 2,
            pl: depth ? 4 : 2,
            bgcolor: isActive ? ACTIVE_BACKGROUND : "transparent",
            "&:hover": { bgcolor: HOVER_BACKGROUND },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 32 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.label} />
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
  <Box
    sx={{
      bgcolor: "rgba(255,255,255,0.05)", // พื้นหลังใส ๆ
      borderRadius: 2,                   // มุมโค้ง
      mx: 1,                             // margin ซ้าย/ขวา
      my: 0.5,                           // margin บน/ล่าง
      p: 0.5,                            // padding ข้างใน
    }}
  >
    <List component="div" disablePadding>
      {item.children.map((child) => {
        const childIsActive = pathname === child.href;
        return (
          <Link key={child.href} href={child.href} onClick={onLinkClick}>
            <ListItemButton
              sx={{
                pl: 4,
                fontSize: 14,
                borderRadius: 2,
                color: childIsActive ? "white" : CHILD_TEXT_COLOR,
                bgcolor: childIsActive
                  ? ACTIVE_BACKGROUND
                  : "transparent",
                "&:hover": { bgcolor: HOVER_BACKGROUND },
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
          </Link>
        );
      })}
    </List>
  </Box>
</Collapse>

      </Fragment>
    );
  }

  // เมนูไม่มี children
  return (
    <Link href={item.href} onClick={onLinkClick}>
      <ListItemButton
        selected={isActive}
        sx={{
          borderRadius: 2,
          pl: depth ? 4 : 2,
          bgcolor: isActive ? ACTIVE_BACKGROUND : "transparent",
          "&:hover": { bgcolor: HOVER_BACKGROUND },
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
        width: 260,
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
