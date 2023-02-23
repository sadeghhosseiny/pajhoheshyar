import { Box, Drawer, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { GeneralContext } from "@/providers/generalContext";

function SideBar() {
  const { isSidebarOpen, setIsSidebarOpen } = React.useContext(GeneralContext);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={(theme) => ({
          width: isSidebarOpen ? "260px" : "92px",
          whiteSpace: "nowrap",
          transition: "all 0.2s ease-in-out",
          "& .MuiPaper-root": {
            width: isSidebarOpen ? "260px" : "92px",
            padding: "12px",
            transition: "all 0.2s ease-in-out",
            overflowX: "hidden",
            background: theme.palette.info.dark,
          },
        })}
        anchor="left"
        variant="permanent"
        open={isSidebarOpen}
      >
        <Box
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            background: "white",
            borderRadius: theme?.shape?.borderRadius * 100,
            color: "blue",
            justifyContent: "space-between",
            width: isSidebarOpen ? "100%" : "40px",
            transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            cursor: "pointer",
            // direction: "rtl",
            margin: "0 auto 0 auto",
          })}
        >
          <IconButton
            sx={{
              transform: isSidebarOpen ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 500ms linear",
              transformStyle: "preserve-3d",
            }}
          >
            <ArrowBackIosNewOutlinedIcon />
          </IconButton>
          <Typography
            sx={(theme) => ({
              transition: "225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              transform: isSidebarOpen
                ? "translateX(0px)"
                : "translateX(-100px)",
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
