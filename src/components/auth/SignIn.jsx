import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import OtpCodeInput from "./OtpCodeInput";
import { auth } from "@/services/auth";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

export default function SignIn() {
  const [isClicked, setIsClicked] = useState(false);
  const [phone, setPhone] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let username = formData.get("username");
    let password = formData.get("password");
    let first_name = formData.get("first_name");
    let last_name = formData.get("last_name");
    let national_code = formData.get("national_code");
    let phone_number = formData.get("phone_number");
    let email = formData.get("email");
    let ssn = formData.get("ssn");

    setPhone(phone_number);
    let data = {
      username,
      password,
      first_name,
      last_name,
      national_code,
      phone_number,
      email,
      ssn,
    };

    let res;

    try {
      res = await auth(data);
    } catch (e) {
      let er = await e;
      console.log("eeeeeeeeeee", er);
    }
    // setIsClicked(true);
    let token = parseJwt(res);

    !res?.detail && token?.role == "student"
      ? router.push("/list-thesis")
      : token?.role == "teacher"
      ? router.push("/thesis-statuses")
      : enqueueSnackbar(res.detail, { variant: "error" });
  };

  const validity = (e) => {
    e.target.setCustomValidity("لطفا این فرم را پر کنید");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: isClicked ? 18 : 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isClicked ? "ورود" : "ثبت نام"}
        </Typography>
        {isClicked ? (
          <OtpCodeInput
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            phone={phone}
          />
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            {/* <TextField
              margin="normal"
              required
              fullWidth
              placeholder="تکرار رمز عبور"
              name="pass-rep"
              label="تکرار رمز عبور"
              type="pass-rep"
              id="pass-rep"
              autoComplete="current-pass-rep"
            /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="نام"
              name="first_name"
              label="نام"
              id="first_name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="نام خانوادگی"
              name="last_name"
              label="نام خانوادگی"
              id="last_name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="کد ملی"
              name="national_code"
              label="کد ملی"
              id="national_code"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="شماره موبایل"
              name="phone_number"
              label="شماره موبایل"
              id="phone_number"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="ایمیل"
              name="email"
              label="ایمیل"
              type="email"
              id="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="کد پرسنلی"
              name="ssn"
              label="کد پرسنلی"
              id="ssn"
            />

            <Typography
              onClick={() => setIsClicked(true)}
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                textAlign: "center",
                color: "blue",
              }}
            >
              قبلا ثبت نام کرده ام
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ورود
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
