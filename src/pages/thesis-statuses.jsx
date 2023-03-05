import React, { useEffect, useState } from "react";
import MainLayout from "@/components/mainLayout";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getThesisApi } from "@/services/requests";
import { parseJwt } from "@/services/api";

function ThesisStatuses() {
  const studentStatuses = ["عدم تایید", "تایید", "استاد"];
  const teacherStatuses = ["تاریخ آپلود", "موضوع", "دانشجو", "وضعیت"];

  const [thesis, setThesis] = useState([]);
  const [userData, setUserData] = useState([]);

  const getThesisData = async () => {
    let data = await getThesisApi();
    // console.log("data", data);
    setThesis(data.results);
  };

  useEffect(() => {
    let usrToken = parseJwt(localStorage.getItem("cook"));
    setUserData(usrToken);
    getThesisData();
  }, []);

  return (
    <MainLayout>
      {console.log("tttt", thesis)}
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
              {teacherStatuses.map((item) => (
                <TableCell key={item}>
                  <Typography variant={"body_m"}>{item}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {thesis?.map((item) => {
              // const isChecked = servicedPeople.some(
              //   (servicedPerson) => servicedPerson.id === item.id
              // );
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography variant={"body_m"}>
                      {item.created_at}
                    </Typography>
                    {/* <Checkbox
                      // checked={isChecked}
                      // onClick={() =>
                      //   toggleRelated(
                      //     item,
                      //     isChecked
                      //       ? RELATED_TOGGLE_MODES.DELETE
                      //       : RELATED_TOGGLE_MODES.ADD
                      //   )
                      // }
                      color="primary"
                    /> */}
                  </TableCell>
                  <TableCell>
                    <Typography variant={"body_m"}>{item?.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant={"body_m"}>
                      {userData?.first_name + " " + userData?.last_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant={"body_m"}>
                      {item?.status === "REJ"
                        ? "تایید نشده"
                        : item.status === "ACC"
                        ? "تایید شده"
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

export default ThesisStatuses;
