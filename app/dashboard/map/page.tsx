import { Stack, Typography } from "@mui/material";

export default function MapPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={700}>
        แผนที่
      </Typography>
      <Typography color="text.secondary">หน้าว่างสำหรับการแสดงแผนที่</Typography>
    </Stack>
  );
}
