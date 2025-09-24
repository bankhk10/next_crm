import { Box, Container, Paper, Stack, Typography, Button } from "@mui/material";
import { redirect } from "next/navigation";

import { logout } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        // backgroundColor: (theme) => theme.palette.grey[100],
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
          }}
        >
          <Stack spacing={3}>
            <Typography component="h1" variant="h4" fontWeight={700}>
              ยินดีต้อนรับกลับ {user.name ?? user.email}
            </Typography>
            <Typography color="text.secondary" variant="body1">
              คุณสามารถเริ่มจัดการลูกค้า โอกาส และติดตามงานได้จากส่วนนี้ของระบบ CRM.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }}>
              <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                หากต้องการออกจากระบบ ให้กดปุ่มด้านล่างเมื่อใช้งานเสร็จสิ้นเพื่อความปลอดภัยของข้อมูล
              </Typography>
              <form action={logout}>
                <Button type="submit" variant="outlined" color="primary">
                  ออกจากระบบ
                </Button>
              </form>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}