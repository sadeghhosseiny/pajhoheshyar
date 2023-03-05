import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { texts } from "@/texts";
import SidebarItem from "./SidebarItem";
import { SIDEBAR_ITEMS } from "@/constants/sidebarIcons";
import { GeneralContext } from "@/providers/generalContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { parseJwt } from "@/services/api";

function SideBar() {
  const { isSidebarOpen, setIsSidebarOpen } = React.useContext(GeneralContext);

  const [userData, setUserData] = useState("");

  const router = useRouter();
  const pathName = router.pathname;

  useEffect(() => {
    let usrToken = parseJwt(localStorage.getItem("cook"));
    setUserData(usrToken);
  }, []);

  const list = () => {
    return SIDEBAR_ITEMS.map(
      (item, i) =>
        (userData?.role === item.role || item.role === "both") && (
          <SidebarItem
            key={i}
            active={item.link === pathName}
            index={i}
            value={item}
          />
        )
    );
  };

  const logOut = () => {
    localStorage.removeItem("cook");
    router.push("/auth");
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
            margin: "0 auto 32px auto",
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
            {texts.pajhooheshyarPanel}
          </Typography>
        </Box>
        {list()}
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: "auto", marginBottom: "24px" }}
          onClick={logOut}
        >
          خروج
        </Button>
      </Drawer>
    </Box>
  );
}

export default SideBar;
