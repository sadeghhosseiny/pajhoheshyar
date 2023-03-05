import MainLayout from "@/components/mainLayout";
import { sendMessageApi } from "@/services/requests";
import { Button, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

function SendMessage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let data = {
      sender: formData.get("sender"),
      reciever: formData.get("reciever"),
      text: formData.get("text"),
    };

    sendMessageApi(data);
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
          <Typography alignSelf="center">فرستنده</Typography>
          <TextField id="sender" name="sender" variant="outlined" label="" />
        </Box>
        <Box margin="auto" justifyContent="center" display="flex" gap="24px">
          <Typography alignSelf="center">گیرنده</Typography>
          <TextField
            id="reciever"
            name="reciever"
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
          <Typography alignSelf="center">پیام</Typography>
          <TextField
            id="text"
            name="text"
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
