"use client";

import { ReactNode } from "react";
import { Box } from "@mui/material";
import Sidebar from "../_components/Sidebar"; // เอาของคุณเองมาแทนได้
import Header from "../_components/Header"; // เอาของคุณเองมาแทนได้
import { AuthProvider } from "@/context/AuthContext";

type DashboardShellProps = {
  children: ReactNode;
  user: any; // แก้เป็น SessionUser ถ้ามี
};

export default function DashboardShell({ children, user }: DashboardShellProps) {
  return (
    <AuthProvider user={user}>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          display: "flex",
          bgcolor: "#b92626", // พื้นหลังแดง เหมือนของเดิม
        }}
      >
        {/* Sidebar */}
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
            flexShrink: 0,
            overflowY: "auto",
          }}
        >
          <Sidebar isOpen={false} onClose={() => {}} />
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: "#d32f2f",
              color: "common.white",
              flexShrink: 0,
            }}
          >
            <Header user={user} onMenuClick={() => {}} />
          </Box>

          {/* Main */}
          <Box
            component="main"
            sx={{
              flex: 1,
              minHeight: 0,
              overflowX: "hidden",
              overflowY: "auto",
              bgcolor: "grey.100",
              borderTopLeftRadius: 24, // rounded-tl-3xl
              p: { xs: 2, md: 4 },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </AuthProvider>
  );
}
