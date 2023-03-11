import MainLayout from "@/components/mainLayout";
import { parseJwt } from "@/services/api";
import { getMessagesApi } from "@/services/requests";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

function Inbox() {
  const inboxTable = ["تاریخ ارسال", "متن پیام", "فرستنده"];

  const [userData, setUserData] = useState([]);

  const [messages, setMessages] = useState([]);

  const getMeesages = async () => {
    let data = await getMessagesApi();
    setMessages(data?.results);
  };

  const formatDate = (date) => {
    let d = new Date(date);
    return d.toLocaleDateString("fa-ir");
  };

  useEffect(() => {
    let usrToken = parseJwt(localStorage.getItem("cook"));
    setUserData(usrToken);
    getMeesages();
  }, []);

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
              {inboxTable.map((item) => (
                <TableCell key={item}>
                  <Typography variant={"body_m"}>{item}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log("messages", messages)}
            {messages?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography variant={"body_m"}>
                      {formatDate(item?.created_at)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant={"body_m"}>{item.text}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant={"body_m"}>
                      {item?.sender || "-"}
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

export default Inbox;
