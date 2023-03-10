import { verificationCode } from "@/services/auth";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";

function OtpCodeInput({ phone, isClicked, setIsClicked }) {
  const router = useRouter();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let username = formData.get("username");
    let password = formData.get("password");
    let data = {
      username,
      password
    };
    let res
    try {
      res = await verificationCode(data);
      
    } catch(e){
      console.log("eee", e);
    }
    res && router.push("/");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
       <TextField
              margin="normal"
              required
              fullWidth
              placeholder="نام کاربری"
              name="username"
              label="نام کاربری"
              type="username"
              id="username"
              autoComplete="current-username"
        />
          <TextField
              margin="normal"
              required
              fullWidth
              placeholder="رمز عبور"
              name="password"
              label="رمز عبور"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Typography onClick={() => setIsClicked(false)} sx={{textDecoration:"underline", cursor: "pointer",
               color: "blue", textAlign: "center"}}>
              ثبت نام
            </Typography>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        ورود{" "}
      </Button>
    </Box>
  );
}

export default OtpCodeInput;
