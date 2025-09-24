"use client";

import { useActionState } from "react";
import Image from "next/image";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
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
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Box
            sx={{
              width: { xs: 96, md: 112 },
              height: { xs: 96, md: 112 },
              position: "relative",
            }}
          >
            <Image
              src="/cs-one-logo.svg"
              alt="ตราช้างใหญ่ CS ONE"
              fill
              sizes="(max-width: 600px) 96px, 112px"
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Box>
            <Typography
              component="p"
              variant="h5"
              fontWeight={700}
              sx={{ textTransform: "uppercase", letterSpacing: 1.4 }}
            >
              ระบบ <Box component="span" color="#c62828">CS ONE</Box>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Smart Crop Smart Solutions
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={1} textAlign="center">
          <Typography component="h2" variant="h5" fontWeight={700}>
            เข้าสู่ระบบ
          </Typography>
          <Typography color="text.secondary" variant="body2">
            ยินดีต้อนรับกลับ กรุณากรอกข้อมูลเพื่อดำเนินการต่อ
          </Typography>
        </Stack>

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

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox name="remember" color="primary" sx={{ borderRadius: 1 }} />}
            label="จดจำฉัน"
          />
          <Link href="#" underline="hover" variant="body2" color="#c62828">
            ลืมรหัสผ่าน?
          </Link>
        </Stack>

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isPending}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: 999,
            py: 1.5,
            background: "linear-gradient(90deg, #c62828 0%, #ef5350 100%)",
            boxShadow: "0 18px 30px rgba(198,40,40,0.25)",
            "&:hover": {
              background: "linear-gradient(90deg, #b71c1c 0%, #e53935 100%)",
              boxShadow: "0 16px 28px rgba(183,28,28,0.3)",
            },
          }}
        >
          {isPending ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
        </Button>
      </Stack>
    </Box>
  );
}