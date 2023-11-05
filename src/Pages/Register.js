import React, { useEffect, useState } from "react";
import fetch_In_One from "../fetchInOne";
import { toast } from "react-toastify";
import handleSpinner from "../spinner";
import { localhost } from "../constant";

export default function Register(){

  const [parent_client_Id, setParent_client_Id] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setname] = useState()
  const [phone ,setPhone] = useState()
  const [flag ,setFlag] = useState(true)
  const [flag2,setflag2] = useState(true)
  const [newUserData,setNewUserData] = useState();

  useEffect(()=>{
    localStorage.removeItem('Purple')
    setFlag(true)
    setflag2(true)
  },[])

  const register = async (e) => {
    toast.dismiss()
    e.preventDefault();
    const clientId = await generateClientId(email);
    console.log('Here is your new Client',clientId)
    if (!validateEmail(email)) {
      toast.error('Invalid email address')
      return null
    }
    if (!validatePassword(password)) {
      toast.warn('Please enter strong password')
      return null
    }
    
    try {
    handleSpinner(true)
      const url = new URL(`${localhost}/getOneUser`);
      url.searchParams.append("client_Id", parent_client_Id);

      let res1 = await findDetails(url);

      if (res1.message === 'Success') {
        url.searchParams.delete("client_Id");
        url.searchParams.append("email", email);

        let res2 = await findDetails(url);
        let createddatetime = getCreatedDateAndTime()
        if (res2.message === 'Success') {
          toast.error('User already exists');
          handleSpinner(false)
        } else if (res2.message === 'Failed') {
          toast.error('Something went wrong');
          handleSpinner(false)
        } else {
          setFlag(false)
          handleSpinner(false)
          // let insertUserUrl = new URL(`${localhost}/insertUser`);
          var obj = { parent_client_Id,"client_Id":clientId, email, password,name,phone,accountstatus:'Pending',createddatetime,accounttype:'Basic',plan_pricing:'3000',balance:0.0};
          setNewUserData(obj)
          // let res3 = await InsertUser(insertUserUrl, { parent_client_Id,"client_Id":clientId, email, password,name,phone,accountstatus:'Pending',createddatetime,accounttype:'Basic',plan_pricing:'1500',balance:0.0});
          // handleSpinner(false)
          // if(res3.message === 'Success')
          // {
          //   console.log(res3.data)
          //   localStorage.setItem('Purple',JSON.stringify(res3.data))
          //   setFlag(false)
          //   setTimeout(() => {
          //     toast.success('Signed up successfully')
          //   }, 2000);
          // }else{
          //   toast.error('Something went wrong')

          // }
        }
      } else if (res1.message === 'Failed') {
        toast.error('Something went wrong');
        handleSpinner(false)
      } else {
        toast.error('Invalid Reference Id');
        handleSpinner(false)
      }
    } catch (error) {
      toast.error('An error occurred');
      handleSpinner(false)
    }
  };

  async function findDetails(url) {
    try {
      const response = await fetch(url, { method: 'GET', redirect: "follow" });
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }


  const InsertUser = async (url, data) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
      };
      const response = await fetch(url, requestOptions);
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  async function generateClientId(email) {
    const length = 15;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomString = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9]/g, "");
    const emailPrefix = sanitizedEmail.substring(0, 7).toUpperCase();
    const remainingRandomString = randomString.slice(0, length - emailPrefix.length);
    const clientId = 'SSF-SK'+ emailPrefix + remainingRandomString;

    const url = new URL(`${localhost}/getOneUser`);
    url.searchParams.append("client_Id", clientId);    
    let res1 = await findDetails(url);

    if (res1.message === 'Not found') {
      return clientId;
    } else {
      return generateClientId(email);
    }
  }

  function validateEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(email);
  }
  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
  
  function getCreatedDateAndTime() {
    // Create a new Date object
    var currentDate = new Date();

    // Get the current date and time components
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    var day = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    // Format the date and time as desired
    var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log(formattedDateTime);
    return formattedDateTime;
  }

   const handleSubmit = async () => {
    if (!newUserData) {
       return null;
    }
    let insertUserUrl = new URL(`${localhost}/insertUser`);
    let res3 = await InsertUser(insertUserUrl, newUserData);
    handleSpinner(false)
    if(res3.message === 'Success')
    {
      console.log(res3.data)
      localStorage.setItem('Purple',JSON.stringify(res3.data))
      setFlag(false)
      setTimeout(() => {
        toast.success('Signed up successfully')
      }, 2000);
      handleSpinner(true);setTimeout(() => {
                      
        handleSpinner(false)
        setflag2(false)
     }, 2000);
    }else{
      toast.error('Something went wrong')

    }
   }

    return(
        <div>
     
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Purple Admin</title>
        {/* plugins:css */}
        <link rel="stylesheet" href="../../assets/vendors/mdi/css/materialdesignicons.min.css" />
        <link rel="stylesheet" href="../../assets/vendors/css/vendor.bundle.base.css" />
       
        <link rel="stylesheet" href="../../assets/css/style.css" />
        {/* End layout styles */}
        <link rel="shortcut icon" href="../../assets/images/favicon.ico" />
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="content-wrapper d-flex align-items-center auth">
              <div className="row flex-grow">
                {flag ? 
                <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5 text-center">
                  <div className="brand-logo">
                    <img src="../../assets/images/logo.png" />
                  </div>
                  <h4>New here?</h4>
                  <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                  <form className="pt-3">
                    <div className="form-group">
                      <input type="text" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="SSF-Code" onChange={(e)=>setParent_client_Id(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-lg" id="Name" placeholder="Name" onChange={(e)=>setname(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-lg" id="Phone" placeholder="Phone" onChange={(e)=>setPhone(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-lg" id="Email" placeholder="Email" onChange={(e)=>setEmail(e.target.value.toLocaleLowerCase())} />
                    </div>
                    {/* <div class="form-group">
                  <select class="form-control form-control-lg" id="exampleFormControlSelect2">
                    <option>Country</option>
                    <option>United States of America</option>
                    <option>United Kingdom</option>
                    <option>India</option>
                    <option>Germany</option>
                    <option>Argentina</option>
                  </select>
                </div> */}
                    <div className="form-group">
                      <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="mb-4">
                    </div>
                    <div className="mt-3">
                      <a className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" href="#" onClick={register}>SIGN UP</a>
                    </div>
                    <div className="text-center mt-4 font-weight-light"> Already have an account? <a href="/Login" className="text-primary">Login</a>
                    {/* <div className="text-center"><a href="/Form" >Insert Users</a></div> */}

                    </div>
                  </form>
                </div>
              </div>
              :
               <>
                 {flag2 ? 
                  <div className="col-lg-4 mx-auto">
                  <div className="auth-form-light text-left p-4 text-center">                   
                    <div className="brand-logo">
                      <img src="../../assets/images/logo.png" />
                    </div>
                    <div className="text-center"><b>
                      <span className="text-danger">Note: &nbsp;&nbsp;</span>
                      <span className="text-dark">Account Opening Price 3000 Rs.</span>
                      </b>
                    </div>
                    <div style={{display:"flex",placeContent:"center",width:'100%',padding:'0.4vh',borderRadius:'15px',border:'1px solid #8c8181',boxShadow:'0 0 7px'}}>
                       <img src='../../assets/images/QR_Code.png' />
                    </div>
                    <p><i>Pay on this QR code after submit</i></p>
                    <p> Your should have to pay 3000 Rs to open Account </p>

                    <button className="btn btn-primary mt-3" onClick={handleSubmit} >Submit</button>
                  </div>
                </div>  :
                 <div className="col-lg-4 mx-auto">
                 <div className="auth-form-light text-left p-5 text-center">
                   <div className="brand-logo">
                     <img src="../../assets/images/logo.png" />
                   </div>
                   <form className="p-3">
                     <div style={{width:'100%'}} className="text-center text-success">
                           Your Account Activate withing 24 hours. You will get your Client Id on registered email
                     </div>
                   </form>
                 </div>
               </div>  
               }
               </>
              }
              </div>
            </div>
            {/* content-wrapper ends */}
          </div>
          {/* page-body-wrapper ends */}
        </div>
      </div>
      
      
    );
}