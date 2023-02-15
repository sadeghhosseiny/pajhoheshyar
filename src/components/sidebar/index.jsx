import { Box, Drawer, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

function SideBar() {
  const { isSidebarOpen, setIsSidebarOpen } = React.useContext(GeneralContext);

  return (
    <Box sx={{ display: "flex", direction: "ltr" }}>
      <Drawer
        sx={(theme) => ({
          width: open ? "260px" : "92px",
          whiteSpace: "nowrap",
          transition: "all 0.2s ease-in-out",
          "& .MuiPaper-root": {
            width: open ? "260px" : "92px",
            padding: "12px",
            transition: "all 0.2s ease-in-out",
            overflowX: "hidden",
            background: theme.palette.info.dark,
          },
        })}
        anchor="left"
        variant="permanent"
        open={open}
      >
        <Box
          onClick={() => setOpen(!open)}
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            background: "white",
            borderRadius: theme?.shape?.borderRadius * 100,
            color: "blue",
            justifyContent: "space-between",
            width: open ? "100%" : "40px",
            transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            cursor: "pointer",
            direction: "rtl",
            margin: "0 auto 0 auto",
          })}
        >
          <IconButton
            sx={{
              transform: open ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 500ms linear",
              transformStyle: "preserve-3d",
            }}
          >
            <ArrowBackIosNewOutlinedIcon />
          </IconButton>
          <Typography
            sx={(theme) => ({
              transition: "225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              transform: open ? "translateX(0px)" : "translateX(-100px)",
              overflow: "hidden",
              marginLeft: theme.spacing(2),
            })}
          >
            {/* {texts.static.texts.managementPanel} */}
            asdfsfda
          </Typography>
        </Box>
        {/* {list} */}
      </Drawer>
    </Box>
  );
}

export default SideBar;
