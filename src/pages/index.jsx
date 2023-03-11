import MainLayout from "@/components/mainLayout";
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
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import { getRefereeApi, sendThesisApi } from "@/services/requests";
import { parseJwt } from "@/services/api";
import AuthProvider from "@/components/auth/authProvider";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; /* 5Mb */

const FILE_NAME = "file";

function SendThesis() {
  const [file, setFile] = useState(null);
  const [referees, setReferees] = useState([]);

  const [userData, setUserData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const [refr, setRefr] = useState("");
  const [teacher, setTeacher] = useState("");

  const handleChangeRefree = (event) => {
    setRefr(event.target.value);
  };

  const handleChangeTeacher = (event) => {
    setTeacher(event.target.value);
  };

  const gatReferees = async () => {
    try {
      let data = await getRefereeApi();
      setReferees(data.results);
    } catch (e) {
      console.log("errrrr", e);
    }
  };

  useEffect(() => {
    let usrToken = parseJwt(localStorage.getItem("cook"));
    setUserData(usrToken);
    gatReferees();
  }, []);

  const onUploadThesis = (e) => {
    if (e.target.files[0].size > MAX_UPLOAD_SIZE) {
      enqueueSnackbar("حجم فایل ارسالی نباید بیشتر از ۵ مگابایت باشد", {
        variant: "warning",
      });
      return;
    }

    setFile({
      file: e.target.files[0],
    });

    e.target.value = "";
  };

  const onDeletePrescriptionFile = () => {
    setFile(null);
  };

  const handleOpenFileInNewTab = () => {
    let file = order?.prescription?.paper?.file;
    let url = URL.createObjectURL(file);
    window.open(url, "_blank");
  };

  let fileName = file?.file?.name;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let title = formData.get("title");
    let description = formData.get("description");
    let data = {
      teacher: teacher,
      refree: refr,
      title: title,
      description: description,
      student: userData?.user_id,
    };

    let res = await sendThesisApi(data);
    res?.id &&
      enqueueSnackbar("پایان نامه با موفقیت ارسال شد", {
        variant: "success",
      });
  };

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
        ارسال پایان نامه
      </Typography>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        gap="64px"
        sx={{ direction: "ltr" }}
      >
        <Box gap="24px">
          <Typography marginBottom="12px" alignSelf="center">
            عنوان *
          </Typography>
          <TextField
            required
            placeholder="عنوان"
            id="title"
            name="title"
            variant="outlined"
            label=""
          />
        </Box>
        <Box width="50%" alignItems={"center"} gap="24px">
          <Typography
            sx={{
              marginBottom: "12px",
            }}
          >
            استاد *
          </Typography>
          <FormControl fullWidth>
            <InputLabel>استاد</InputLabel>
            <Select
              margin="10px"
              sx={{
                width: "50%",
              }}
              required
              value={teacher}
              label="استاد"
              onChange={handleChangeTeacher}
            >
              {referees?.map((item, i) => (
                <MenuItem key={i} value={item?.ssn}>
                  {item?.first_name + item?.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box width="50%" alignItems={"center"} gap="24px">
          <Typography
            sx={{
              marginBottom: "12px",
            }}
          >
            داور *
          </Typography>
          <FormControl fullWidth>
            <InputLabel>داور</InputLabel>
            <Select
              margin="10px"
              sx={{
                width: "50%",
              }}
              required
              value={refr}
              label="داور"
              onChange={handleChangeRefree}
            >
              {referees?.map((item, i) => (
                <MenuItem key={i} value={item?.ssn}>
                  {item?.first_name + item?.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box width="50%" gap="24px">
          <Typography marginBottom="12px" alignSelf="center">
            توضیحات *
          </Typography>
          <TextField
            id="description"
            name="description"
            required
            placeholder="توضیحات"
            multiline
            fullWidth
            rows={8}
            variant="outlined"
            label=""
          />
        </Box>
        {/* <Box marginLeft={"50px"} width="100%">
          {!file ? (
            <>
              <Button
                sx={{ display: "flex", margin: "auto" }}
                variant="outlined"
              >
                <label style={{ cursor: "pointer" }} htmlFor="upload-thesis">
                  انتخاب فایل
                </label>
              </Button>
              <input
                hidden
                type="file"
                id="upload-thesis"
                accept=".png, .pdf, .jpg, .jpeg, .jfif"
                onChange={onUploadThesis}
              />
            </>
          ) : (
            <Box
              padding="0.75rem 1rem"
              width="30%"
              margin="auto"
              sx={{
                background:
                  "linear-gradient(0deg, rgba(10, 97, 164, 0.05), rgba(10, 97, 164, 0.05)), #fdfcff",
              }}
              borderRadius="0.5rem"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                sx={{
                  cursor: "pointer",
                  color: "rgb(13, 71, 161)",
                }}
                onClick={handleOpenFileInNewTab}
              >
                {FILE_NAME}
                {fileName.substring(fileName.length, fileName.lastIndexOf("."))}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                color="red"
                sx={{
                  cursor: "pointer",
                  svg: {
                    marginLeft: "0.25rem",
                  },
                }}
                onClick={onDeletePrescriptionFile}
              >
                <DeleteOutlineIcon /> حذف
              </Box>
            </Box>
          )}
        </Box> */}
        <Box>
          <Button type="submit" sx={{ width: "15%" }} variant="contained">
            ارسال
          </Button>
        </Box>
      </Stack>
    </MainLayout>
  );
}

export default SendThesis;
