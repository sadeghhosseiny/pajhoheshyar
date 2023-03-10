import MainLayout from "@/components/mainLayout";
import {
  Button,
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

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; /* 5Mb */

const FILE_NAME = "file";

function EditThesis() {
  const [file, setFile] = useState(null);
  const [referees, setReferees] = useState([]);

  const [userData, setUserData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const [refr, setRefr] = useState("");

  const handleChange = (event) => {
    setRefr(event.target.value);
  };

  const gatReferees = async () => {
    let data = await getRefereeApi();
    setReferees(data.results);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let title = formData.get("title");
    let description = formData.get("description");
    let data = {
      refree: refr,
      title: title,
      description: description,
      student: userData?.user_id,
    };
    console.log("usrDATA ", userData);
    sendThesisApi(data);
  };

  return (
    <MainLayout>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        gap="64px"
        sx={{ direction: "ltr" }}
      >
        <Box margin="auto" justifyContent="center" display="flex" gap="24px">
          <Typography alignSelf="center">عنوان</Typography>
          <TextField id="title" name="title" variant="outlined" label="" />
        </Box>
        <Box
          width="50%"
          margin="auto"
          justifyContent="center"
          display="flex"
          gap="24px"
        >
          <Typography alignSelf="center">توضیحات</Typography>
          <TextField
            id="description"
            name="description"
            multiline
            fullWidth
            rows={8}
            variant="outlined"
            label=""
          />
        </Box>
        <Box
          width="50%"
          margin="auto"
          justifyContent="center"
          display="flex"
          gap="24px"
        >
          <InputLabel id="demo-simple-select-label">داور</InputLabel>
          <Select
            sx={{
              width: "50%",
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={refr}
            label=""
            onChange={handleChange}
          >
            {referees?.map((item) => (
              <MenuItem value={item?.ssn}>
                {item?.first_name + item?.last_name}
              </MenuItem>
            ))}
          </Select>
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

export default EditThesis;
