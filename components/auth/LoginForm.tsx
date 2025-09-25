"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Prompt } from "next/font/google";
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

// โหลดฟอนต์ Prompt
const prompt = Prompt({
  weight: ["400", "500", "700"], // เลือกน้ำหนักฟอนต์
  subsets: ["thai", "latin"], // ให้รองรับภาษาไทย
});

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <Box
      component="form"
      action={formAction}
      noValidate
      sx={{ fontFamily: prompt.style.fontFamily }}
    >
      <Stack spacing={2}>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Box
            sx={{
              width: { xs: 140, md: 180 },
              height: { xs: 140, md: 180 },
              position: "relative",
              borderRadius: "8%",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            }}
          >
            <Image
              src="/images/logo.jpg"
              alt="CS ONE"
              fill
              sizes="(max-width: 800px) 140px, 180px"
              style={{ objectFit: "contain" }}
            />
          </Box>

          <Box>
            <Typography
              component="p"
              variant="h4"
              fontWeight={800}
              sx={{
                textTransform: "uppercase",
                letterSpacing: 2.4,
                fontFamily: prompt.style.fontFamily, // 👈 บังคับใช้ Prompt
              }}
            >
              ระบบ{" "}
              <Box
                component="span"
                color="#c62828"
                sx={{ fontFamily: prompt.style.fontFamily }}
              >
                CS ONE
              </Box>
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ position: "relative", top: 2 }}
            >
              Smart Crop Smart Solutions
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={1} textAlign="center">
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{
              letterSpacing: 1.5,
              fontFamily: prompt.style.fontFamily,
              position: "relative",
              top: 12,
            }}
          >
            เข้าสู่ระบบ
          </Typography>
        </Stack>

        {state?.error && <Alert severity="error">{state.error}</Alert>}

        <TextField
          autoComplete="email"
          autoFocus
          fullWidth
          label="USERNAME"
          name="email"
          placeholder="name@example.com"
          required
          type="email"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              height: 50, // 👈 กำหนดความสูงเอง (เช่น 44px)
              "& input": {
                paddingLeft: "14px", // ดันข้อความไปทางขวา
                paddingY: "10px", // ปรับความสูงด้านใน
              },
            },
             top: 12,
          }}
        />

        <TextField
          autoComplete="current-password"
          fullWidth
          label="PASSWORD"
          name="password"
          placeholder="••••••••"
          required
          type="password"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              height: 50, // 👈 เท่ากับ USERNAME
              "& input": {
                paddingLeft: "14px",
                paddingY: "10px",
              },
            },
             top: 12,
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                color="primary"
                sx={{ borderRadius: 1 }}
              />
            }
            label="บันทึกรหัส"
          />
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
            py: 1.2,
            px: 4,
            width: "40%",
            alignSelf: "center",
            backgroundColor: "#757575", // 👈 สีเทา MUI grey[500]
            boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
            "&:hover": {
              backgroundColor: "#424242", // 👈 สีเทาเข้มกว่าเมื่อ hover
              boxShadow: "0 10px 18px rgba(0,0,0,0.2)",
            },
            fontFamily: prompt.style.fontFamily,
          }}
        >
          {isPending ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
        </Button>
      </Stack>
    </Box>
  );
}
