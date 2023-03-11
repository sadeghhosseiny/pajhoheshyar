import { editThesis } from "@/services/requests";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

function ThesisRow({ userData, item }) {
  const [status, setStatus] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const formatDate = (date) => {
    let d = new Date(date);
    return d.toLocaleDateString("fa-ir");
  };

  const handleStatus = async (id) => {
    let data = {
      status: status,
    };
    let res = await editThesis(data, id);
    res?.id &&
      enqueueSnackbar("وضعیت پایان نامه مورد نظر با موفقیت تغییر یافت", {
        variant: "success",
      });
  };

  return (
    <TableRow key={item.id}>
      {console.log("ITEM", item?.id)}
      <TableCell>
        <Box>
          <Button
            onClick={() => handleStatus(item?.id)}
            sx={{ width: "100%" }}
            variant="contained"
          >
            تغییر وضعیت
          </Button>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant={"body_m"}>
          {formatDate(item?.created_at)}
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
        <Select
          sx={{
            width: "50%",
          }}
          id="status"
          name="status"
          value={status ? status : item?.status}
          // placeholder="گیرنده"
          onChange={handleChange}
        >
          <MenuItem value={"REJ"}>تایید نشده</MenuItem>
          <MenuItem value={"ACC"}>تایید شده</MenuItem>
          <MenuItem value={"PEN"}>در حال بررسی</MenuItem>
        </Select>
        {/* <Typography variant={"body_m"}>
                      {item?.status === "REJ"
                      ? "تایید نشده"
                      : item.status === "ACC"
                      ? "تایید شده"
                      : "در حال بررسی"}
                    </Typography> */}
      </TableCell>
    </TableRow>
  );
}

export default ThesisRow;
