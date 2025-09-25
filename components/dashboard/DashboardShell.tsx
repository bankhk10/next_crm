"use client";

import { ReactNode, useCallback, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import { AuthProvider, SessionUser } from "@/context/AuthContext";

type DashboardShellProps = {
  children: ReactNode;
  user: SessionUser | null;
};

export default function DashboardShell({ children, user }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  return (
    <AuthProvider user={user}>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          display: "flex",
          bgcolor: "#b92626",
        }}
      >
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

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
            <Header user={user} onMenuClick={openSidebar} />
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
