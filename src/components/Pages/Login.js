import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import handleSpinner from "../spinner";
import { localhost } from "../constant";
import './Style.css';

export default function Login() {

  const [client_Id, setClient_Id] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotFlag, setForgotFlag] = useState(true);
  const [rePassword, setRePassword] = useState("");
  const [isSplashScree,setIsSplashScreen] = useState(true);

  useEffect(()=>{
    localStorage.removeItem('Purple')
    setTimeout(() => {
      console.clear();
      setIsSplashScreen(false)
    }, 3000);
  },[])

  const login = async () => {
    toast.dismiss();
    if (!email) {
      toast.error("Invalid username");
      return null;
    }
    if (!client_Id) {
      toast.error("Invalid code no.");
      return null;
    }
    if (!password) {
      toast.error("Invalid password");
      return null;
    }
    
    handleSpinner(true) 
    const url = new URL(`${localhost}/getOneUser`);
    url.searchParams.append("client_Id", client_Id);
    url.searchParams.append("email", email);
    url.searchParams.append("password", password);
    try {
      const res = await findDetails(url);
      if (res.message === "Success") {
        if (res.data.accountstatus === 'Pending') {
          toast.warn('Your account activated soon')
       } else {
        window.location.href = "/Home";
       }
        localStorage.setItem('Purple', JSON.stringify(res.data))
        handleSpinner(false)
      } else if (res.message === "Failed") {
        toast.error("Something went wrong");
        handleSpinner(false)
      } else {
        toast.error("Invalid Username or Password");
        handleSpinner(false)
      }
    } catch (error) {
      handleSpinner(false)
      toast.error("Something went wrong");
    }
  };

  async function findDetails(url) {
    try {
      const response = await fetch(url, { method: "GET", redirect: "follow" });
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function updateData() {
    if (!email) {
      toast.error("Enter email address");
      return null;
    }
    if (!password || !rePassword) {
      toast.error(password !== rePassword ? "Password doesn't match" : "Please enter password");
      return null;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      toast.error("Please enter a strong password");
      return null;
    }
    try {
      const find = new URL(`${localhost}/getOneUser`);
      find.searchParams.append("email", email);
      const findUser = await findDetails(find);
      if (findUser.message === "Success") {
        const url = new URL(`${localhost}/updateData`);
        url.searchParams.append("email", email);
        const dataToUpdate = { password };
        const response = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToUpdate),
        }); 
        const data = await response.json();
        if (data.message === "Data not found") {
          toast.error("Invalid email address");
        } else {
          toast.success("Password changed successfully");
        }
      } else { 
        toast.error("User not found");
      }
    } catch (error) {
      console.log("Error updating data:", error);
      toast.error("Something went wrong");
    }
  }


    return(
          
<div>
  <div className={`${isSplashScree?'splashScreenCss':'d-none'}`} style={{position:"fixed",backgroundColor:'white',zIndex:'20',top:'0',bottom:'0',right:'0',left:'0',display:"flex",alignItems:'center',justifyContent:'center'}}> 
    <img src={`${process.env.PUBLIC_URL}/assets/images/SplashScreenLogo.png`} height={'25%'} width={'25%'} />
  </div>
  {/* Mirrored from www.bootstrapdash.com/demo/purple-admin-free/pages/samples/login.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 22 Jun 2023 07:03:48 GMT */}
  {/* Required meta tags */}
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <title>Purple Admin</title>
  {/* plugins:css */}
  <link rel="stylesheet" href="../../assets/vendors/mdi/css/materialdesignicons.min.css" />
  <link rel="stylesheet" href="../../assets/vendors/css/vendor.bundle.base.css" />
  {/* endinject */}
  {/* Plugin css for this page */}
  {/* End plugin css for this page */}
  {/* inject:css */}
  {/* endinject */}
  {/* Layout styles */}
  <link rel="stylesheet" href="../../assets/css/style.css" />
  {/* End layout styles */}
  <link rel="shortcut icon" href="../../assets/images/favicon.ico" />
  <div className="container-scroller">
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="content-wrapper d-flex align-items-center auth">
        <div className="row flex-grow">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left p-5 text-center">
              <div className="brand-logo">
                <img src="../../assets/images/logo.png" />
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <form className="pt-3">
                <div className="form-group">
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Code-no" onChange={(e)=>setClient_Id(e.target.value)} />
                  </div>
                  <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" onChange={(e)=>setEmail(e.target.value.toLocaleLowerCase())} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className="mt-3">
                  <a className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" href="#" onClick={login} >SIGN IN</a>
                </div>
                <div className="text-center mt-4 font-weight-light"> Don't have an account? <a href="/Register" className="text-primary">Create</a></div>
                <div className="text-center mt-1 font-weight-light"><a href="/ForgotPassword" className="text-primary">Lost Password ?</a></div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* content-wrapper ends */}
    </div>
    {/* page-body-wrapper ends */}
  </div>

</div>


    );
}