"use client";

import { ReactNode, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../_components/Sidebar";
import Header from "../_components/Header";
import { AuthProvider } from "@/context/AuthContext";

type DashboardShellProps = {
  children: ReactNode;
  user: any; // หรือ SessionUser ถ้ามี type
};

export default function DashboardShell({ children, user }: DashboardShellProps) {
  // state คุม sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthProvider initialUser={user}>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          display: "flex",
          bgcolor: "#b92626",
        }}
      >
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

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
              bgcolor: "#b92626",
              color: "common.white",
              flexShrink: 0,
            }}
          >
            <Header user={user} onMenuClick={() => setIsSidebarOpen(true)} />
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
              borderTopLeftRadius: 24,
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
