import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function OtpCodeInput() {
  return (
    <Box>
      <TextField
        sx={{
          ".MuiInputBase-input": {
            textAlign: "center",
            letterSpacing: "1rem",
          },
        }}
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
