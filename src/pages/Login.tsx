import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import axios from 'axios';
import '../css/Login.css';
import { getCookie, setCookie } from "../utils/cookie";


function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log( getCookie("accessToken"));
    console.log( getCookie("lastLoginTime"));
  }, []);

  const login = (loginId: string, loginPw: string) => {

    let targetLoginId = loginId.trim();
    let targetLoginPwd = loginPw.trim();

    if (targetLoginId.length < 1) {
      Swal.fire({
        icon: "warning",
        title: "エラー",
        text: "IDを入力してください。",
        confirmButtonText: "OK",
        showCloseButton: true,
      })
      return false
    } else if (targetLoginPwd.length < 1) {
      Swal.fire({
        icon: "warning",
        title: "エラー",
        text: "パスワードを入力してください。",
        confirmButtonText: "OK",
        showCloseButton: true,
      })
      return false
    }
    axios
      .post(
        "/login",
        {
          loginId: targetLoginId,
          password: targetLoginPwd
        },
        {
          withCredentials: true
        }
      )
      .then((response) => {
        const {
          data: { resultCode },
        } = response;
        const {
          data: { result },
        } = response;
        if (resultCode === "STI01") {
          setCookie("accessToken", response.headers.accesstoken, 1);
          setCookie("lastLoginTime", response.headers.lastlogintime, 1);
          // //@ts-ignore
          // setUserInfoV((prevValue) => ({
          //   ...prevValue,
          //   userName: response.data.result.userName
          // }));
          navigate("/main");
        }
        else if (resultCode === "MBB01") {
          // 存在しないユーザー
          Swal.fire({
            icon: "warning",
            title: "エラー",
            text: "IDが存在しません。",
            confirmButtonText: "OK",
            showCloseButton: true,
          })
          return false
        }
        else if (resultCode === "MBB02") {
          // パスワードエラー
          Swal.fire({
            icon: "warning",
            title: "エラー",
            text: "パスワードが一致しません。",
            confirmButtonText: "OK",
            showCloseButton: true,
          })
          return false
        }
        else if (resultCode === "CMB06") {
          // 入力漏れ
          Swal.fire({
            icon: "warning",
            title: "エラー",
            text: "入力した内容を確認してください。",
            confirmButtonText: "OK",
            showCloseButton: true,
          })
          return false;
        }
      })
  };

  function LoginInput() {
    const [loginId, setLoginId] = useState("");
    const [loginPw, setLoginPw] = useState("");

    const handleKeyDown = (e: any) => {
      if (e.code === "Enter") {
        login(loginId, loginPw);
      }
      return;
    };

    return (
      <div>
            <div>
                <div className="login-content" onKeyDown={handleKeyDown}>
                  <br />
                  <br />
                  <div><span className='login-title'>TodayChef</span><br />
                    <span className='login-info'>サービスのご利用したい場合はログインしてください</span></div>
                  <br />
                  <br />
                  <input
                    className='loginId'
                    id='loginId'
                    placeholder="  ID"
                    maxLength={30}
                    onChange={(e) => {
                      setLoginId(e.currentTarget.value);
                    }}
                    type={'text'} />
                  <br />
                  <br />
                  <div className="pwd-eye-wrap">
                    <input
                      className='loginPassword'
                      type="text"
                      id='loginPassword'
                      placeholder="  パスワード"
                      maxLength={20}
                      onChange={(e) => {
                        setLoginPw(e.currentTarget.value);
                      }} />
                  </div>
                  <br />
                  <br />
                  <button
                    className='login-btn'
                    type="submit"
                    onClick={() => {
                      login(loginId, loginPw);
                    }}>
                    ログイン
                  </button>
                  <div className='login-findUserInfo'>
                    <a href="/forget/id">ID探し</a><span className='login-and'> | </span>
                    <a href="/forget/password">パスワード探し</a>
                  </div>
                </div>
              </div>
              <div className="loginJoin">
                <span className="signup-tit" >TodayChef<br />
                  会員ではない場合
                </span>
                <span>
                  <a className="signup-btn" href="/join">加入申請</a>
                </span>
              </div>
        </div>
    );
  }
  
  return (
    <div>
      <div className='login'>
      {/* {getCookie("accessToken") && getCookie("lastLoginTime")?<NotFound />:<LoginInput/> }  */}
        <LoginInput/> 
      </div>
    </div>
  );
}

export default Login;