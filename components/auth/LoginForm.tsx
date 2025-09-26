"use client";

import Image from "next/image";
import { Prompt } from "next/font/google";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

// โหลดฟอนต์ Prompt
const prompt = Prompt({
  weight: ["400", "500", "700"],
  subsets: ["thai", "latin"],
});

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "").trim().toLowerCase();
      const password = String(formData.get("password") ?? "");
      const remember = formData.get("remember") === "on";

      if (!email || !password) {
        setError("กรุณากรอกอีเมลและรหัสผ่าน");
        return;
      }

      setError(null);
      setIsSubmitting(true);

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        remember: remember ? "on" : "off",
        callbackUrl: "/dashboard",
      });

      setIsSubmitting(false);

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push(result?.url ?? "/dashboard");
    },
    [router],
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ fontFamily: prompt.style.fontFamily }}
    >
      <Stack spacing={2}>
        <Stack spacing={2} alignItems="center" textAlign="center">
          {/* Logo Box */}
          <Box
            sx={{
              width: { xs: 140, md: 180 },
              height: { xs: 140, md: 180 },
              position: "relative",
              borderRadius: "8%",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              backgroundColor: "#f5f5f5", // fallback กัน flash
            }}
          >
            <Image
              src="/images/logo.png"
              alt="CS ONE"
              fill
              priority
              sizes="(max-width: 800px) 140px, 180px"
              style={{
                objectFit: "contain",
                opacity: logoLoaded ? 1 : 0,
                transition: "opacity 0.2s ease-in-out", // ✅ fade-in smooth
              }}
              onLoadingComplete={() => setLogoLoaded(true)} // ✅ trigger fade-in
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
                fontFamily: prompt.style.fontFamily,
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

        {error && <Alert severity="error">{error}</Alert>}

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
              fontSize: { xs: "0.8rem", md: "0.95rem" },
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
                fontSize: { xs: "0.85rem", md: "1rem" },
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
              fontSize: { xs: "0.8rem", md: "0.95rem" },
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
                fontSize: { xs: "0.85rem", md: "1rem" },
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
            control={<Checkbox name="remember" color="primary" sx={{ borderRadius: 1 }} />}
            label="บันทึกรหัส"
          />
        </Stack>

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: 999,
            py: { xs: 1, md: 1.2 },
            px: { xs: 3, md: 4 },
            width: { xs: "100%", sm: "70%", md: "40%" },
            alignSelf: "center",
            backgroundColor: "#757575",
            boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
            "&:hover": {
              backgroundColor: "#424242",
              boxShadow: "0 10px 18px rgba(0,0,0,0.2)",
            },
            fontFamily: prompt.style.fontFamily,
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          {isSubmitting ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
        </Button>
      </Stack>
    </Box>
  );
}
