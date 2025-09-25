import { Stack, Typography } from "@mui/material";

export default function OverviewReportPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={700}>
        รายงานภาพรวม
      </Typography>
      <Typography color="text.secondary">หน้าว่างสำหรับเนื้อหารายงานภาพรวม</Typography>
    </Stack>
  );
}
