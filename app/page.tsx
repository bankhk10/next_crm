import { Box, Container, Paper } from "@mui/material";

import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 4 },
        py: { xs: 6, md: 10 },
        backgroundColor: "#f3f4f6",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: { xs: "480px", md: "720px" },
          height: { xs: "480px", md: "720px" },
          background: "radial-gradient(circle at top left, #d32f2f, #b71c1c)",
          borderRadius: "50%",
          top: { xs: "-320px", md: "-420px" },
          left: { xs: "-260px", md: "-280px" },
          transform: "rotate(-12deg)",
          opacity: 0.85,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: { xs: "360px", md: "520px" },
          height: { xs: "360px", md: "520px" },
          background: "radial-gradient(circle at bottom right, #e5e7eb, #d1d5db)",
          borderRadius: "50%",
          bottom: { xs: "-240px", md: "-320px" },
          right: { xs: "-200px", md: "-240px" },
          transform: "rotate(18deg)",
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={12}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: { xs: 4, md: 6 },
            backdropFilter: "blur(6px)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.18)",
          }}
        >
          <LoginForm />
        </Paper>
      </Container>
    </Box>
  );
}
