import { parseJwt } from "@/services/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthProvider = (props) => {
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("cook");
    let data = parseJwt(token);
    if (!token) {
      router.push("/auth");
    } else if (data?.role == "teacher") {
      console.log("SEC IIIIIIFFFFFFFFFFFFFF");
      router.push("/thesis-statuses");
    } else {
      router.push("/list-thesis");
    }
  }, []);

  return <div>{props.children}</div>;
};

export default AuthProvider;
