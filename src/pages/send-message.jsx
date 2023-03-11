import MainLayout from "@/components/mainLayout";
import { parseJwt } from "@/services/api";
import { getRefereeApi, getUserApi, sendMessageApi } from "@/services/requests";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

function SendMessage() {
  const [refr, setRefr] = useState("");
  const [referees, setReferees] = useState([]);
  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    setRefr(event.target.value);
  };

  const gatReferees = async () => {
    try {
      let data = await getRefereeApi();
      setReferees(data.results);
    } catch (e) {
      console.log("errrrr", e);
    }
  };

  const getUser = async () => {
    try {
      let data = await getUserApi();
      setUsers(data.results);
    } catch (e) {
      console.log("errrrr", e);
    }
  };

  useEffect(() => {
    let usrToken = parseJwt(localStorage.getItem("cook"));
    setUserData(usrToken);
    gatReferees();
    getUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let data = {
      sender: userData?.user_id,
      reciever: formData.get("reciever"),
      text: formData.get("text"),
    };
    try {
      let res = await sendMessageApi(data);
      res?.id &&
        enqueueSnackbar("پیام با موفقیت ارسال شد", { variant: "success" });
    } catch (e) {
      console.log("eeeeeeeeeee", e);
    }
  };

  const selectOnes = userData?.role == "teacher" ? users : referees;

  const validity = (e) => {
    e.target.setCustomValidity("لطفا این فرم را پر کنید");
  };

  return (
    <MainLayout>
      <Typography
        textAlign="end"
        fontWeight="bold"
        marginBottom="24px"
        component="h1"
        borderBottom="1px solid #c7bfbf"
        padding="12px"
      >
        ارسال پیام
      </Typography>
      {/* <FormControl fullWidth>
        <InputLabel>Text</InputLabel>
        <Select variant="outlined" size="small" fullWidth>
          <MenuItem value={1}>Option 1</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
        </Select>
      </FormControl> */}
      <Stack
        component="form"
        onSubmit={handleSubmit}
        gap="64px"
        sx={{ direction: "ltr" }}
      >
        <Box width="100%" gap="24px">
          <Typography marginBottom="12px" alignSelf="center">
            گیرنده *
          </Typography>
          <FormControl fullWidth>
            <InputLabel>گیرنده مورد نظر خود را انتخاب کنید</InputLabel>
            <Select
              sx={{
                width: "50%",
              }}
              id="reciever"
              name="reciever"
              required
              value={refr}
              label="گیرنده مورد نظر خود را انتخاب کنید"
              onChange={handleChange}
            >
              {console.log("SOOOOOOOOOOOOO ", selectOnes)}
              {selectOnes?.map((item, i) => (
                <MenuItem key={i} value={item?.ssn}>
                  {item?.first_name + item?.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box width="50%" justifyContent="center" gap="24px">
          <Typography marginBottom="12px" alignSelf="center">
            پیام *
          </Typography>
          <TextField
            id="text"
            name="text"
            required
            multiline
            fullWidth
            rows={8}
            variant="outlined"
            label=""
          />
        </Box>
        <Box>
          <Button type="submit" sx={{ width: "15%" }} variant="contained">
            ارسال
          </Button>
        </Box>
      </Stack>
    </MainLayout>
  );
}

export default SendMessage;
