import MainLayout from "@/components/mainLayout";
import {
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import {
  editThesis,
  getRefereeApi,
  getThesisApi,
  sendThesisApi,
} from "@/services/requests";
import { parseJwt } from "@/services/api";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; /* 5Mb */

const FILE_NAME = "file";

function EditThesis() {
  const studentStatuses = ["عنوان", "داور", "استاد", "وضعیت"];

  const [file, setFile] = useState(null);
  const [referees, setReferees] = useState([]);

  const [thesis, setThesis] = useState([]);

  const [userData, setUserData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const [refr, setRefr] = useState("");

  const handleChange = (event) => {
    setRefr(event.target.value);
  };

  const gatReferees = async () => {
    try {
      let data = await getRefereeApi();
      setReferees(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const getThesis = async () => {
    let data = await getThesisApi();
    setThesis(data.results);
  };

  useEffect(() => {
    let usrToken = parseJwt(localStorage.getItem("cook"));
    setUserData(usrToken);
    getThesis();
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

  const formatDate = (date) => {
    let d = new Date(date);
    return d.toLocaleDateString("fa-ir");
  };

  const handleOpenFileInNewTab = () => {
    let file = order?.prescription?.paper?.file;
    let url = URL.createObjectURL(file);
    window.open(url, "_blank");
  };

  let fileName = file?.file?.name;

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   let title = formData.get("title");
  //   let description = formData.get("description");
  //   let data = {
  //     refree: refr,
  //     title: title,
  //     description: description,
  //     student: userData?.user_id,
  //   };
  //   editThesis(data, userData?.user_id);
  // };

  return (
    <MainLayout>
      {console.log(thesis)}
      <Typography
        textAlign="end"
        fontWeight="bold"
        marginBottom="24px"
        component="h1"
        borderBottom="1px solid #c7bfbf"
        padding="12px"
      >
        صندوق ورودی
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          minWidth: 900,
          maxHeight: 300,
          overflowY: "auto",
          border: "1px solid #00baba",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {studentStatuses?.map((item) => (
                <TableCell key={item}>
                  <Typography variant={"body_m"}>{item}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {thesis?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography variant={"body_m"}>{item?.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant={"body_m"}>{item.refree}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant={"body_m"}>{item?.teacher}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant={"body_m"}>
                      {item?.status == "REJ"
                        ? "تاییده نشده"
                        : item?.status == "ACC"
                        ? "تاییده شده"
                        : "در حال بررسی"}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
}

export default EditThesis;
