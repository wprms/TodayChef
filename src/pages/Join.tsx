import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';
import '../css/Join.css';
import Header from '../components/Header';
import {
    ResponseData,
} from '../services/apiTypes';

function Join() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');  
  const [result, setResult] = useState<ResponseData>();
  const navigate = useNavigate();

  const backToLogin = () => {
      navigate('/login');
  }
  
  const join = () => {

      const requestData = {
          loginId: id,
          password: password,
          mail: mail,
      };
      console.log(id,password,mail);

      const emailExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

      if (!id || id == null) {
          Swal.fire({ 
            icon: "warning",
            title: "エラー",
            text: "IDを入力してください。",
            confirmButtonText: "OK",
            showCloseButton: true,
          })
          return false
      } else if (!password || password == null){
          Swal.fire({
              icon: "warning",
              title: "エラー",
              text: "Passwordを入力してください。",
              confirmButtonText: "OK",
              showCloseButton: true,
          })
          return false    
      } else if (!mail || mail== null){
          Swal.fire({
              icon: "warning",
              title: "エラー",
              text: "メールアドレスを入力してください。",
              confirmButtonText: "OK",
              showCloseButton: true,
          })
          return false 
      } else if (!emailExp.test(mail)) {
          Swal.fire({
              icon: "warning",
              title: "エラー",
              text: "メールアドレスは形式に合わせて入力してください。",
              confirmButtonText: "OK",
              showCloseButton: true,
          })
      return false
      }
      axios.post('/join/signup',
      requestData,
      {
         withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
      },

      })
      .then((response) => {
          const res = response.data as ResponseData;
          if (res && res.resultCode === 'STI01') {
              const result = res.result;
              setResult(result);
              Swal.fire({
                  icon: "success",
                  title: "送信完了",
                  text: "メールを送信しました。通知を確認してください。",
                  confirmButtonText: "確認",
                  showCloseButton: true,
              }).then(
                  function(isConfirm){
                      if(isConfirm){
                          navigate('/login');
                      }
              })
          }
          else if (res && res.resultCode === 'MBB09'){
              Swal.fire({
                  icon: "warning",
                  title: "送信エラー",
                  text: res.resultMessage,
                  confirmButtonText: "確認",
                  showCloseButton: true,
              }).then((result) => {
                  if (result.isConfirmed) {
                      navigate(`/login`);
                  }
                });
          }
      })
      .catch((error) => {
          Swal.fire({
              icon: "warning",
              title: "エラー",
              text: "メール送信中にエラーが発生しました。",
              confirmButtonText: "OK",
              showCloseButton: true,
          }).then(
              function(isConfirm){
                  if(isConfirm){
                      navigate('/login');
                  }
          })
          return false;
      });
  };

return(
    <div className='row justify-content-center'>
    <Header/>
      <div className='col-6 text-center'>
            <div className="JoinMain">        
              <div>
                  <div className="brText">ID<span className='imfortantEnter'>*</span></div>
                  <input className='joinTextName' maxLength={200} type={'text'} onChange={(e) => setId(e.target.value.replace(/　/g, '').replace(/ /g, ''))}/> 
              </div>
              <div>
                  <div className="brText">Password<span className='imfortantEnter'>*</span></div>
                  <input className='joinTextName' maxLength={200} type={'text'} onChange={(e) => setPassword(e.target.value.replace(/　/g, '').replace(/ /g, ''))}/> 
              </div>
              <div>
                  <div className="brText">Mail<span className='imfortantEnter'>*</span></div>
                  <input className='joinTextName' placeholder='example@todaychef.com' maxLength={50} type={'text'} onChange={(e) => setMail(e.target.value)}/> 
              </div>             
          </div>
          <div className="joinBottom">
              <button className='joinApplication' onClick={join}>                    
                      송신
              </button>
              <button className='joinBackbtn' onClick={backToLogin}>                    
                      로그인
              </button>
          </div>
      </div>
  </div>

  );
};


export default Join;