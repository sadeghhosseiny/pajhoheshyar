import React, { useEffect, useState } from "react";
import MainLayout from "@/components/mainLayout";
import {
  Button,
  Checkbox,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { editThesis, getThesisApi } from "@/services/requests";
import { parseJwt } from "@/services/api";
import { Box } from "@mui/system";
import ThesisRow from "@/components/ThesisRow";

function ThesisStatuses() {
  const studentStatuses = ["عدم تایید", "تایید", "استاد"];
  const teacherStatuses = [
    "تغییر وضعیت",
    "تاریخ آپلود",
    "موضوع",
    "دانشجو",
    "وضعیت",
  ];

  const [thesis, setThesis] = useState([]);
  const [userData, setUserData] = useState([]);

  const [status, setStatus] = useState({});

  const getThesisData = async () => {
    let data = await getThesisApi();
    // console.log("data", data);
    setThesis(data.results);
  };

  const handleChange = (event) => {
    setStatus({ ...status, [event.target?.name]: event.target.value });
  };

  const formatDate = (date) => {
    let d = new Date(date);
    return d.toLocaleDateString("fa-ir");
  };

  useEffect(() => {
    let usrToken = parseJwt(localStorage.getItem("cook"));
    setUserData(usrToken);
    getThesisData();
  }, []);

  const handleStatus = (id) => {
    let data = {
      status: status,
    };
    editThesis(data, id);
  };

  return (
    <MainLayout>
      {console.log("tttt", status)}
      <Typography
        textAlign="end"
        fontWeight="bold"
        marginBottom="24px"
        component="h1"
        borderBottom="1px solid #c7bfbf"
        padding="12px"
      >
        مشاهده لیست پایان نامه ها
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          minWidth: 900,
          maxHeight: 600,
          overflowY: "auto",
          border: "1px solid #00baba",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {teacherStatuses.map((item) => (
                <TableCell key={item}>
                  <Typography variant={"body_m"}>{item}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {thesis?.map((item) => {
              return (
                <React.Fragment key={item?.id}>
                  <ThesisRow userData={userData} item={item} />
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box display="flex" justifyContent="end" marginTop="50px">
        <Button
          onClick={handleStatus}
          sx={{ width: "15%" }}
          variant="contained"
        >
          تغییر وضعیت
        </Button>
      </Box> */}
    </MainLayout>
  );
}

export default ThesisStatuses;
