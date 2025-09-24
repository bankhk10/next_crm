import { Box, Container, Paper, Stack, Typography } from "@mui/material";

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
        /* Use safe, static color values instead of a theme function so this Server Component
           doesn't pass a function down to Client Components. The colors approximate
           theme.palette.grey[100] and theme.palette.primary.light with a light alpha. */
        backgroundColor: "#f5f5f5",
        backgroundImage: "linear-gradient(135deg, #f5f5f5, rgba(25,118,210,0.2))",
        px: { xs: 2, md: 4 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 6, md: 12 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            spacing={3}
            sx={{
              flex: { md: 1 },
              maxWidth: { xs: "100%", md: 440 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography component="h1" variant="h3" fontWeight={700}>
              จัดการความสัมพันธ์กับลูกค้าอย่างมืออาชีพ
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ศูนย์รวมข้อมูลลูกค้า โอกาสทางการขาย และงานติดตามในที่เดียว
              เพื่อให้ทีมของคุณทำงานได้มีประสิทธิภาพมากยิ่งขึ้น
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ใช้บัญชีตัวอย่าง <strong>admin@example.com</strong> และรหัสผ่าน{" "}
              <strong>P@ssw0rd123</strong>
              เพื่อทดลองใช้งาน
            </Typography>
          </Stack>

          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, md: 5 },
              width: "100%",
              maxWidth: 420,
              borderRadius: 4,
              backdropFilter: "blur(6px)",
            }}
          >
            <LoginForm />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
