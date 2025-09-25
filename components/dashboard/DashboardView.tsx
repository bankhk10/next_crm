"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Badge,
  Box,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

type DashboardPlaceholder = {
  title: string;
  subtitle?: string;
  message?: string;
};

type DashboardViewProps = {
  userName: string;
  placeholder?: DashboardPlaceholder;
};

const sidebarItems = [
  {
    label: "รายงานภาพรวม",
    icon: <HomeRoundedIcon fontSize="medium" />,
    href: "/dashboard",
  },
  {
    label: "ฐานข้อมูลลูกค้า",
    icon: <PeopleAltRoundedIcon fontSize="medium" />,
    href: "/dashboard/customers",
  },
  {
    label: "โอกาสทางการขาย",
    icon: <TrendingUpRoundedIcon fontSize="medium" />,
    href: "/dashboard/opportunities",
  },
  {
    label: "คำสั่งซื้อ",
    icon: <ShoppingCartRoundedIcon fontSize="medium" />,
    href: "/dashboard/orders",
  },
  {
    label: "ติดตามผล",
    icon: <AssessmentRoundedIcon fontSize="medium" />,
    href: "/dashboard/follow-ups",
  },
  {
    label: "โปรโมชั่น",
    icon: <CampaignRoundedIcon fontSize="medium" />,
    href: "/dashboard/promotions",
  },
];

const summaryCards = [
  {
    title: "ยอดขายเดือนนี้",
    amount: "฿1,250,000",
    subLabel: "เพิ่มขึ้น 18.5%",
    highlight: "+195,000",
    highlightColor: "#2e7d32",
    avatarBg: "rgba(198,40,40,0.08)",
    iconColor: "#c62828",
    icon: <TrendingUpRoundedIcon />,
  },
  {
    title: "ยอดขายสะสมปีนี้",
    amount: "฿8,950,000",
    subLabel: "ใกล้ถึงเป้า 12M",
    highlight: "-250,000",
    highlightColor: "#c62828",
    avatarBg: "rgba(21,101,192,0.12)",
    iconColor: "#1565c0",
    icon: <AssessmentRoundedIcon />,
  },
  {
    title: "ยอดขายสะสมเดือนนี้",
    amount: "฿1,500,000",
    subLabel: "ตรงตามแผน",
    highlight: "±0",
    highlightColor: "#757575",
    avatarBg: "rgba(67,160,71,0.12)",
    iconColor: "#2e7d32",
    icon: <ShoppingCartRoundedIcon />,
  },
  {
    title: "ยอดขายสะสมทั้งปี",
    amount: "฿10,750,000",
    subLabel: "เหลืออีก 1.25M",
    highlight: "+650,000",
    highlightColor: "#2e7d32",
    avatarBg: "rgba(255,179,0,0.15)",
    iconColor: "#ff8f00",
    icon: <WorkspacePremiumRoundedIcon />,
  },
];

const revenueSeries = [
  { month: "ม.ค.", target: 120, sales: 110, invoice: 100 },
  { month: "ก.พ.", target: 115, sales: 105, invoice: 97 },
  { month: "มี.ค.", target: 130, sales: 125, invoice: 120 },
  { month: "เม.ย.", target: 140, sales: 132, invoice: 126 },
  { month: "พ.ค.", target: 150, sales: 147, invoice: 138 },
  { month: "มิ.ย.", target: 160, sales: 155, invoice: 148 },
];

const topCustomers = [
  {
    label: "กลุ่ม A",
    value: "฿450k",
    rate: 78,
    color: "#1976d2",
  },
  {
    label: "กลุ่ม B",
    value: "฿320k",
    rate: 64,
    color: "#43a047",
  },
  {
    label: "กลุ่ม C",
    value: "฿280k",
    rate: 58,
    color: "#fb8c00",
  },
];

const activities = [
  { label: "ติดตามลูกค้าใหม่", value: 75, color: "#1976d2" },
  { label: "โอกาสที่ต้องเร่งด่วน", value: 50, color: "#e53935" },
  { label: "ใบเสนอราคาที่ค้างอยู่", value: 30, color: "#fb8c00" },
];

type Promotion = {
  title: string;
  description: string;
  chipLabel: string;
  color: string;
  chipColor: "default" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
};

const promotions: Promotion[] = [
  {
    title: "โปรโมชันตรุษจีน",
    description: "ส่วนลดสูงสุด 15% สำหรับสินค้าใหม่",
    chipLabel: "กำลังทำ",
    color: "#fff3e0",
    chipColor: "warning",
  },
  {
    title: "โครงการ Smart Farm",
    description: "แพ็กเกจระบบรดน้ำอัจฉริยะ ลด 20%",
    chipLabel: "สำเร็จ 80%",
    color: "#e3f2fd",
    chipColor: "primary",
  },
];

export default function DashboardView({ userName, placeholder }: DashboardViewProps) {
  const pathname = usePathname();
  const headerTitle = placeholder?.title ?? "ภาพรวมการขาย";
  const headerSubtitle = placeholder?.subtitle ?? "ยอดขายล่าสุดและกิจกรรมประจำวัน";

  const mainContent = placeholder ? (
    <Box
      component="main"
      sx={{
        flex: 1,
        px: { xs: 3, lg: 5 },
        py: { xs: 6, lg: 8 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 520,
          width: "100%",
          p: { xs: 6, md: 8 },
          borderRadius: 4,
          boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
          textAlign: "center",
        }}
      >
        <Stack spacing={2.5} alignItems="center">
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "rgba(198,40,40,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c62828",
            }}
          >
            <WorkspacePremiumRoundedIcon fontSize="large" />
          </Box>
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {placeholder.title}
            </Typography>
            {placeholder.subtitle ? (
              <Typography variant="body1" color="text.secondary">
                {placeholder.subtitle}
              </Typography>
            ) : null}
            <Typography variant="body2" color="text.secondary">
              {placeholder.message ?? "หน้านี้กำลังอยู่ระหว่างการพัฒนา โปรดกลับมาอีกครั้งในเร็ว ๆ นี้"}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  ) : (
    <Box component="main" sx={{ flex: 1, px: { xs: 3, lg: 5 }, py: { xs: 3, lg: 4 } }}>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {summaryCards.map((card) => (
          <Paper
            key={card.title}
            elevation={0}
            sx={{
              borderRadius: 4,
              p: 3,
              bgcolor: "#fff",
              boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              height: "100%",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {card.title}
                </Typography>
                <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5 }}>
                  {card.amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.subLabel}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: card.highlightColor, fontWeight: 700 }}>
                  {card.highlight}
                </Typography>
              </Box>
              <Avatar
                sx={{
                  bgcolor: card.avatarBg,
                  color: card.iconColor,
                  width: 56,
                  height: 56,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                }}
              >
                {card.icon}
              </Avatar>
            </Stack>
          </Paper>
        ))}
      </Box>

      <Box
        sx={{
          mt: 1,
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 2fr) minmax(0, 1fr)" },
          alignItems: "stretch",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: { xs: 3, md: 4 },
            boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
            bgcolor: "#fff",
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2}>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                ยอดขายจากลูกค้า
              </Typography>
              <Typography variant="body2" color="text.secondary">
                เปรียบเทียบเป้าหมายและยอดขายจริงในปี 2024
              </Typography>
            </Box>
            <Chip label="รายงานประจำเดือน" color="error" variant="outlined" sx={{ borderRadius: 999, fontWeight: 600 }} />
          </Stack>

          <Box sx={{ mt: 4 }}>
            <BarChart
              dataset={revenueSeries}
              height={300}
              xAxis={[{ dataKey: "month", scaleType: "band" }]}
              series={[
                { dataKey: "target", label: "Target", color: "#ffd54f" },
                { dataKey: "sales", label: "Sales Rate", color: "#ef5350" },
                { dataKey: "invoice", label: "Invoice", color: "#42a5f5" },
              ]}
              margin={{ top: 10, bottom: 20, left: 50, right: 10 }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            {topCustomers.map((customer) => (
              <Box key={customer.label} sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {customer.label}
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
                  {customer.value}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={customer.rate}
                  sx={{
                    mt: 1.5,
                    height: 10,
                    borderRadius: 999,
                    bgcolor: "rgba(0,0,0,0.06)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 999,
                      bgcolor: customer.color,
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Paper>

        <Stack spacing={3} sx={{ minWidth: 0 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: 3,
              boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
              bgcolor: "#fff",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              กิจกรรม
            </Typography>
            <Typography variant="body2" color="text.secondary">
              สถานะการติดตามลูกค้าในสัปดาห์นี้
            </Typography>

            <Stack spacing={2.5} sx={{ mt: 3 }}>
              {activities.map((activity) => (
                <Box key={activity.label}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" fontWeight={600}>
                      {activity.label}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {activity.value}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={activity.value}
                    sx={{
                      mt: 1,
                      height: 8,
                      borderRadius: 999,
                      bgcolor: "rgba(0,0,0,0.08)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 999,
                        bgcolor: activity.color,
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: 3,
              boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
              bgcolor: "#fff",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={700}>
                โปรโมชั่น
              </Typography>
              <WorkspacePremiumRoundedIcon color="warning" />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              แคมเปญและสิทธิพิเศษประจำเดือนนี้
            </Typography>

            <Stack spacing={2.5} sx={{ mt: 3 }}>
              {promotions.map((promotion) => (
                <Box
                  key={promotion.title}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: promotion.color,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={700}>
                    {promotion.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {promotion.description}
                  </Typography>
                  <Chip
                    label={promotion.chipLabel}
                    color={promotion.chipColor}
                    size="small"
                    sx={{ alignSelf: "flex-start", borderRadius: 999, fontWeight: 600 }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
      }}
    >
      <Box
        component="aside"
        sx={{
          width: { xs: 88, lg: 256 },
          bgcolor: "#c62828",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          py: { xs: 4, lg: 6 },
          px: { xs: 2, lg: 3 },
        }}
      >
        <Stack direction={{ xs: "column", lg: "row" }} alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            <Image src="/images/logo.jpg" alt="CS One" fill sizes="64px" style={{ objectFit: "cover" }} />
          </Box>
          <Stack spacing={0.5} display={{ xs: "none", lg: "flex" }}>
            <Typography variant="h6" fontWeight={700} letterSpacing={1.2}>
              อย่างไม่ยาก
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Smart Crop Smart Solutions
            </Typography>
          </Stack>
        </Stack>

        <List sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          {sidebarItems.map((item) => {
            const isSelected = pathname === item.href;

            return (
              <ListItemButton
                key={item.label}
                component={Link}
                href={item.href}
                selected={isSelected}
                sx={{
                  borderRadius: 2,
                  bgcolor: isSelected ? "rgba(255,255,255,0.18)" : "transparent",
                  color: "inherit",
                  "&.Mui-selected": {
                    bgcolor: "rgba(255,255,255,0.22)",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.25)",
                    },
                  },
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: "0.95rem",
                  }}
                  sx={{ display: { xs: "none", lg: "block" } }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Stack spacing={2} display={{ xs: "none", lg: "flex" }}>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
            ทีมยอดขายประจำเดือน
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar src="/images/man-avatar.png" alt="Team lead" sx={{ width: 40, height: 40 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                วรเมธ ศรีชัย
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }}>
                ผู้จัดการฝ่ายขาย
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          component="header"
          sx={{
            px: { xs: 3, lg: 5 },
            py: { xs: 3, lg: 4 },
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            bgcolor: "#fff",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            justifyContent="space-between"
            flexWrap="wrap"
            rowGap={2}
          >
            <Stack spacing={0.5}>
              <Typography variant="h5" fontWeight={700} color="text.primary">
                {headerTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {headerSubtitle}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              flexWrap="wrap"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
              rowGap={1.5}
            >
              <TextField
                size="small"
                placeholder="ค้นหา..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  minWidth: { xs: 140, sm: 220 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "rgba(0,0,0,0.02)",
                  },
                }}
              />
              <IconButton
                color="default"
                sx={{
                  bgcolor: "rgba(198,40,40,0.08)",
                  color: "#c62828",
                  "&:hover": { bgcolor: "rgba(198,40,40,0.16)" },
                }}
              >
                <Badge color="error" badgeContent={3} overlap="circular">
                  <NotificationsNoneRoundedIcon />
                </Badge>
              </IconButton>
              <IconButton
                color="default"
                sx={{
                  bgcolor: "rgba(0,0,0,0.04)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.08)" },
                }}
              >
                <SettingsRoundedIcon />
              </IconButton>
              <IconButton
                color="default"
                sx={{
                  bgcolor: "rgba(0,0,0,0.04)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.08)" },
                }}
              >
                <HelpOutlineRoundedIcon />
              </IconButton>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar src="/images/man-avatar.png" alt={userName} sx={{ width: 44, height: 44 }} />
                <Box display={{ xs: "none", sm: "block" }}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {userName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ผู้ดูแลระบบ
                  </Typography>
                </Box>
                <ChevronRightRoundedIcon color="action" />
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {mainContent}
      </Box>
    </Box>
  );
}
