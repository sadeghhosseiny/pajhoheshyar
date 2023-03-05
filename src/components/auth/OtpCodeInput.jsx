import { verificationCode } from "@/services/auth";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";

function OtpCodeInput({ phone }) {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let data = {
      code: formData.get("code"),
      phone_number: phone,
    };
    verificationCode(data);
    router.push("/");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        sx={{
          ".MuiInputBase-input": {
            textAlign: "center",
            letterSpacing: "1rem",
          },
        }}
        inputProps={{
          maxLength: 6,
        }}
        autoFocus={true}
        margin="normal"
        required
        fullWidth
        name="code"
        label="کد"
        type="code"
        id="code"
        autoComplete="current-code"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        ورود{" "}
      </Button>
    </Box>
  );
}

export default OtpCodeInput;
