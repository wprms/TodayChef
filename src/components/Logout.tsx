import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getCookie, delCookie } from '../utils/cookie';

export function Logout() {
  axios
    .post(
      "/logout", {},
      {
        withCredentials: true,
        headers: {
          accessToken: getCookie("accessToken"),
          lastLoginTime: getCookie("lastLoginTime"),
        },
      }
    )
    .then((response) => {
      const {
        data: { resultCode },
      } = response;

      if (resultCode === "STI01") {

        delCookie("accessToken");
        delCookie("lastLoginTime");

        Swal.fire({
          icon: "success",
          title: "完了",
          text: "ログアウトしました。",
          confirmButtonText: "OK",
          showCloseButton: true,
        })
      }
    })
}
