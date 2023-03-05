import BorderColorIcon from "@mui/icons-material/BorderColor";
import SendIcon from "@mui/icons-material/Send";
import PreviewIcon from "@mui/icons-material/Preview";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MessageIcon from "@mui/icons-material/Message";
import InboxIcon from "@mui/icons-material/Inbox";
import IosShareIcon from "@mui/icons-material/IosShare";
import ForumIcon from "@mui/icons-material/Forum";

export const SIDEBAR_ITEMS = [
  {
    icon: <BorderColorIcon />,
    title: "اصلاح پایان نامه",
    role: "student",
    link: "/edit-thesis",
  },
  {
    icon: <SendIcon />,
    title: "ارسال پایان نامه",
    role: "student",
    link: "/",
  },
  {
    icon: <PreviewIcon />,
    title: "مشاهده لیست پایان نامه ها",
    role: "teacher",
    link: "/thesis-statuses",
  },
  // {
  //   icon: <RemoveRedEyeIcon />,
  //   title: "مشاهده وضعیت پایان نامه ها",
  //   link: "thesis-statuses"
  // },
  {
    icon: <MessageIcon />,
    title: "ارسال پیام",
    role: "both",
    link: "/send-message",
  },
  {
    icon: <InboxIcon />,
    title: "صندوق ورودی",
    role: "both",
    link: "/inbox",
  },
  // {
  //   icon: <IosShareIcon />,
  //   title: "ارسال اسامی داوران",
  //   link: "/send-referees-names",
  // },
  // {
  //   icon: <ForumIcon />,
  //   title: "مشاهده نظرات استاد راهنما",
  //   role: "student",
  //   link: "/teacher-comments",
  // },
];
