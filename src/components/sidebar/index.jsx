import {
  Box,
  Drawer,
  Icon,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { texts } from "@/texts";
import SidebarItem from "./SidebarItem";
import { SIDEBAR_ITEMS } from "@/constants/sidebarIcons";
import { GeneralContext } from "@/providers/generalContext";

function SideBar() {
  const { isSidebarOpen, setIsSidebarOpen } = React.useContext(GeneralContext);

  const [itemIndex, setItemIndex] = useState(null);

  const list = () => {
    return SIDEBAR_ITEMS.map((item, i) => (
      <SidebarItem
        setItemIndex={setItemIndex}
        itemIndex={itemIndex}
        index={i}
        value={item}
      />
    ));
  };

  return (
    <Box sx={{ display: "flex", direction: "ltr" }}>
      <Drawer
        sx={(theme) => ({
          width: isSidebarOpen ? "280px" : "92px",
          whiteSpace: "nowrap",
          transition: "225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
          "& .MuiPaper-root": {
            width: isSidebarOpen ? "280px" : "92px",
            padding: "12px",
            transition: "225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            overflowX: "hidden",
            background: theme.palette.info.dark,
            border: "none",
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
            direction: "rtl",
            margin: "0 auto 0 auto",
          })}
        >
          <IconButton
            sx={{
              transform: isSidebarOpen ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 250ms linear",
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
        {list()}
      </Drawer>
    </Box>
  );
}

export default SideBar;
