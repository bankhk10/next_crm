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
          fullWidth
          label="USERNAME"
          name="email"
          placeholder="name@example.com"
          required
          type="email"
          InputLabelProps={{
            sx: {
              fontSize: { xs: "0.8rem", md: "0.95rem" }, // ⬅ ปรับขนาด label
              fontFamily: prompt.style.fontFamily,
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              height: { xs: 44, md: 50 }, // responsive สูง-เตี้ย
              "& input": {
                paddingLeft: "14px",
                paddingY: { xs: "6px", md: "10px" },
                fontSize: { xs: "0.85rem", md: "1rem" }, // ⬅ ขนาดตัวหนังสือในช่อง
                fontFamily: prompt.style.fontFamily,
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
          InputLabelProps={{
            sx: {
              fontSize: { xs: "0.8rem", md: "0.95rem" }, // ⬅ label
              fontFamily: prompt.style.fontFamily,
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              height: { xs: 44, md: 50 },
              "& input": {
                paddingLeft: "14px",
                paddingY: { xs: "6px", md: "10px" },
                fontSize: { xs: "0.85rem", md: "1rem" }, // ⬅ text ในช่อง
                fontFamily: prompt.style.fontFamily,
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
            py: { xs: 1, md: 1.2 }, // ⬅ padding แนวตั้งลดลงบนจอเล็ก
            px: { xs: 3, md: 4 }, // ⬅ padding แนวนอนลดลงบนจอเล็ก
            width: { xs: "100%", sm: "70%", md: "40%" }, // ⬅ บนมือถือเต็มจอ
            alignSelf: "center",
            backgroundColor: "#757575",
            boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
            "&:hover": {
              backgroundColor: "#424242",
              boxShadow: "0 10px 18px rgba(0,0,0,0.2)",
            },
            fontFamily: prompt.style.fontFamily,
            fontSize: { xs: "0.9rem", md: "1rem" }, // ⬅ ขนาดฟอนต์เล็กลงบนมือถือ
          }}
        >
          {isPending ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
        </Button>
      </Stack>
    </Box>
  );
}
