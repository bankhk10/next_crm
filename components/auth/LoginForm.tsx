"use client";

import { useActionState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { login, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <Box component="form" action={formAction} noValidate>
      <Stack spacing={3}>
        <div>
          <Typography component="h2" variant="h5" fontWeight={600} gutterBottom>
            เข้าสู่ระบบ
          </Typography>
          <Typography color="text.secondary" variant="body2">
            ลงชื่อเข้าใช้เพื่อจัดการลูกค้าและงานขายของคุณ
          </Typography>
        </div>

        {state?.error && <Alert severity="error">{state.error}</Alert>}

        <TextField
          autoComplete="email"
          autoFocus
          fullWidth
          label="อีเมล"
          name="email"
          placeholder="name@example.com"
          required
          type="email"
        />

        <TextField
          autoComplete="current-password"
          fullWidth
          label="รหัสผ่าน"
          name="password"
          placeholder="••••••••"
          required
          type="password"
        />

        <FormControlLabel control={<Switch name="remember" color="primary" />} label="จดจำฉันบนอุปกรณ์นี้" />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isPending}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          {isPending ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
        </Button>
      </Stack>
    </Box>
  );
}