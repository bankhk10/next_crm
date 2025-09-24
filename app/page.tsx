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
        backgroundColor: "#e0e0e0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* SVG background ขวาบน */}
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <path
          d="M250,0 C300,100 600,100 700,200 C800,300 450,500 800,600 L800,0 Z"
          fill="#b92626"
        />
      </Box>

      {/* วงกลมซ้อนกัน ล่างซ้าย */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "-120px", md: "-180px" },
          left: { xs: "-120px", md: "-180px" },
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: "50%",
          backgroundColor: "#b92626",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            width: { xs: 220, md: 400 },
            height: { xs: 220, md: 400 },
            borderRadius: "50%",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: 160, md: 300 },
              height: { xs: 160, md: 300 },
              borderRadius: "50%",
              backgroundColor: "#9ca3af", // เทา
            }}
          />
        </Box>
      </Box>

      {/* เนื้อหา login */}
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
