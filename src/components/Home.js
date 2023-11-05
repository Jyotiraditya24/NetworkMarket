import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import PrizeWheel from "./PrizeWheel";
import Profile from './Pages/Profile'
import Admin from "./Pages/Admin";
import CoinPage from "./Pages/CoinPage";
import WalletPage from "./Pages/WalletPage";
import { localhost } from "./constant";

export default function Home() {

  const [userDetail, setUserDetail] = useState();
  const [networks, setNetwords] = useState();
  const [activeTab, setactiveTab] = useState('Dashboard');
  const [earnings, setEarnings] = useState({ todayEarn: '0', monthlyEarn: '0', yearlyEarn: '0', todayEarnli: [], monthlyEarnli: [], yearlyEarnli: [] })
  const [selectedEarning, setSelectedEarning] = useState([]);
  const [earningFlag,setEarningFlag] = useState(false);

  useEffect(() => {
    let userDetail = JSON.parse(localStorage.getItem('Purple'))
    if (userDetail) {
      setUserDetail(userDetail)
      findUser(userDetail)
      findNetwork(userDetail.client_Id)
    } else {
      let a = document.createElement('a')
      a.href = '/Login'
      a.click()
    }
  }, [])

  // const findNetwork = async (client_Id) => {
  //   const url = new URL(`${localhost}/getUsersByQuery`);
  //   url.searchParams.append("parent_client_Id", client_Id);
  //   try {
  //     const response = await fetch(url, { method: "GET", redirect: "follow" });
  //     const result = await response.json();
  //     setNetwords(result.data)
  //     EarningManipulation(result.data)
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  const findNetwork = async (client_Id) => {
    const url = new URL(`${localhost}/getUsersByQuery`);
    url.searchParams.append('parent_client_Id', client_Id);
    try {
      const response = await fetch(url, { method: 'GET', redirect: 'follow' });
      const result = await response.json();
      var netw = result.data.filter((user) =>{ return  user.accountstatus != "Pending" }) ;
      setNetwords(netw)
      EarningManipulation(netw);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
  }, [networks])


  const findUser = async (userDetail) => {
    try {
      const getParentUserUrl = new URL(`${localhost}/getOneUser`);
      getParentUserUrl.searchParams.append("email", userDetail.email);
      const response = await fetch(getParentUserUrl, { method: 'GET', redirect: "follow" });
      const result = await response.json();
      setUserDetail(result.data);
      return result;
    } catch (error) {
      throw error;
    }
  };

  function EarningManipulation(network) {
    if (network) {
      var tempObj = { todayEarn: '0', monthlyEarn: '0', yearlyEarn: '0', todayEarnli: [], monthlyEarnli: [], yearlyEarnli: [] };
      const currentDate = new Date();
      network.forEach(user => {
        const createDate = new Date(user.createddatetime);
        const timeDiffMillis = currentDate - createDate;
        const hoursDiff = timeDiffMillis / (1000 * 60 * 60);
        const daysDiff = timeDiffMillis / (1000 * 60 * 60 * 24);
        const yearsDiff = currentDate.getFullYear() - createDate.getFullYear();

        if (hoursDiff <= 24) {
          tempObj.todayEarn = parseFloat(tempObj.todayEarn) + (parseFloat(user.plan_pricing) / 2);
          tempObj.todayEarnli.push(user)
        }
        if (daysDiff <= 30) {
          tempObj.monthlyEarn = parseFloat(tempObj.monthlyEarn) + (parseFloat(user.plan_pricing) / 2);
          tempObj.monthlyEarnli.push(user)
        }
        if (yearsDiff === 0) {
          tempObj.yearlyEarn = parseFloat(tempObj.yearlyEarn) + (parseFloat(user.plan_pricing) / 2);
          tempObj.yearlyEarnli.push(user)
        }
      });
      setEarnings(tempObj);
      console.clear()
    }
  }


  return (
    <div>
      <style>{`.profileDropdown a:hover{color:green !important;}`}</style>

      {userDetail ?
        <>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
          <link rel="stylesheet" href="assets/vendors/mdi/css/materialdesignicons.min.css" />
          <link rel="stylesheet" href="assets/vendors/css/vendor.bundle.base.css" />
          <link rel="stylesheet" href="assets/css/style.css" />
          <link rel="shortcut icon" href="assets/images/favicon.ico" />

          <div className="container-scroller"  >
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
              <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a className="navbar-brand brand-logo" href="/home" style={{
                  maxWidth: "100%",
                  height: "90px",
                  margin: "auto",
                  verticalAlign: "middle"
                }}><img src="assets/images/logo.png" alt="logo" /></a>
                <a className="navbar-brand brand-logo-mini" href="/home"><img src="assets/images/logo.png" alt="logo" /></a>
              </div>
              <div className="navbar-menu-wrapper d-flex align-items-stretch">
                {/* <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize" id="togglerofNavbar">
                <span className="mdi mdi-menu" />
                </button> */}
                <button className="bg-transparent border-0 p-0 m-0 navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
                  <span className="mdi mdi-menu" />
                </button>

                <ul className="navbar-nav navbar-nav-right profileDropdown">
                  <li className="nav-item nav-profile dropdown">
                    <a className="nav-link dropdown-toggle" id="profileDropdown" href="#/" data-toggle="dropdown" aria-expanded="false">
                      <div className="nav-profile-img">
                        <img src={userDetail.profileimg ? userDetail.profileimg : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt="profile" style={{ border: "1px solid #e0dfdf" }} />
                        <span className="availability-status online" />
                      </div>
                      <div className="nav-profile-text">
                        <p className="mb-1 text-black">{userDetail.client_Id}</p>
                      </div>
                    </a>
                    <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                      <a className="dropdown-item" href="#/" onClick={() => setactiveTab('Profile')} >
                        <i className="mdi mdi-account-circle-outline mr-2 text-dark" /> Profile </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="#/" onClick={() => { localStorage.removeItem('Purple'); window.location.href = '/Login' }}>
                        <i className="mdi mdi-logout mr-2 text-primary" /> Signout </a>
                    </div>
                  </li>

                </ul>
                <button className="bg-transparent border-0 p-0 m-0 navbar-toggler navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
                  <span className="mdi mdi-menu" />
                </button>

                {/* <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                  <span className="mdi mdi-menu" />
                </button> */}
              </div>
            </nav>
            <div className="container-fluid page-body-wrapper">
              <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{ width: 0 }} >
                <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
                    </h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                  </div>
                  <div className="offcanvas-body">
                    <ul className="nav">
                      <li className="nav-item nav-profile">
                        <a href="/Home" className="nav-link">
                          <div className="nav-profile-image">
                            <img src={userDetail.profileimg ? userDetail.profileimg : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt="profile" style={{ border: "1px solid #e0dfdf" }} />
                            <span className="login-status online" />
                          </div>
                          <div className="nav-profile-text d-flex flex-column text-left">
                            <span className="font-weight-bold mb-2">{userDetail.name ? userDetail.name : '! Your name'}</span>
                            <span className="text-secondary text-small">Project Manager</span>
                          </div>
                          <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
                        </a>
                      </li>
                      <li className={activeTab === 'Dashboard' ? 'nav-item active' : 'nav-item'} data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setactiveTab('Dashboard')} >
                        <a className="nav-link" href="#/"  >
                          <span className="menu-title">Dashboard</span>
                          <i className="mdi mdi-home menu-icon" />
                        </a>
                      </li>
                      <li className={activeTab === 'Spin The wheel' ? 'nav-item active' : 'nav-item'} data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setactiveTab('Spin The wheel')}  >
                        <a className="nav-link" href="#/" >
                          <span className="menu-title">Spin The wheel</span>
                          <i className="mdi mdi-gift menu-icon" />
                        </a>
                      </li>
                      {userDetail.masteraccount ? <li className={activeTab === 'Admin' ? 'nav-item active' : 'nav-item'} data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setactiveTab('Admin')} >
                        <a className="nav-link" href="#/" >
                          <span className="menu-title">Admin</span>
                          <i className="mdi mdi-shield-account menu-icon" />
                        </a>
                      </li> : ''}
                      <li className={activeTab === 'Coins' ? 'nav-item active' : 'nav-item'} data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setactiveTab('Coins')}  >
                        <a className="nav-link" href="#/" >
                          <span className="menu-title">Coins</span>
                          <i className="mdi mdi-coin menu-icon" />
                        </a>
                      </li>
                      <li className={activeTab === 'Wallet' ? 'nav-item active' : 'nav-item'} data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setactiveTab('Wallet')}  >
                        <a className="nav-link" href="#/" >
                          <span className="menu-title">Wallet</span>
                          <i className="mdi mdi-wallet menu-icon" />
                        </a>
                      </li>
                      <li className={activeTab === 'Profile' ? 'nav-item active' : 'nav-item'} onClick={() => setactiveTab('Profile')}>
                        <a className="nav-link" data-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                          <span className="menu-title">Profile</span>
                          <i className="mdi menu-icon mdi-account-edit " />
                        </a>
                        <div className="collapse" id="general-pages">
                          <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" data-toggle="pill" href="#account" role="tab" aria-controls="account" aria-selected="false"> Account </a></li>
                            <li className="nav-item"> <a className="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" id="password-tab" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false"> Password </a></li>
                            <li className="nav-item"> <a className="nav-link" data-bs-dismiss="offcanvas" aria-label="Close" id="application-tab" data-toggle="pill" href="#application" role="tab" aria-controls="application" aria-selected="false"> Networks </a></li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div className="main-panel" style={{ width: '100%' }} >
                <div className={activeTab === 'Dashboard' ? 'content-wrapper' : 'content-wrapper d-none'}>
                  <div className="page-header">
                    <h3 className="page-title">
                      <span className="page-title-icon bg-gradient-primary text-white mr-2">
                        <i className="mdi mdi-home" />
                      </span> Dashboard
                    </h3>
                  </div>
                  <div className="row">
                    <div className="col-md-4 stretch-card grid-margin"  style={{ cursor: 'pointer' }} onClick={() => {setSelectedEarning(earnings.todayEarnli);setEarningFlag(true)}} >
                      <div className="card bg-gradient-danger card-img-holder text-white">
                        <div className="card-body">
                          <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                          <h4 className="font-weight-normal mb-3">Today's Income <i className="mdi mdi-chart-line mdi-24px float-right" />
                          </h4>
                          <h2 className="mb-5" >Rs {earnings?.todayEarn || 'Not Calculated yett'}</h2>
                          <h6 className="card-text">Increased by 40%</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 stretch-card grid-margin"  style={{ cursor: 'pointer' }} onClick={() => {setSelectedEarning(earnings.monthlyEarnli);setEarningFlag(true)}}>
                      <div className="card bg-gradient-info card-img-holder text-white">
                        <div className="card-body">
                          <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                          <h4 className="font-weight-normal mb-3">Monthly Income <i className="mdi mdi-bookmark-outline mdi-24px float-right" />
                          </h4>
                          <h2 className="mb-5">Rs {earnings?.monthlyEarn || 'Not Calculated yett'}</h2>
                          <h6 className="card-text">Decreased by 10%</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 stretch-card grid-margin"  style={{ cursor: 'pointer' }} onClick={() => {setSelectedEarning(earnings.yearlyEarnli);setEarningFlag(true)}}>
                      <div className="card bg-gradient-success card-img-holder text-white">
                        <div className="card-body">
                          <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                          <h4 className="font-weight-normal mb-3">Yearly Income <i className="mdi mdi-diamond mdi-24px float-right" />
                          </h4>
                          <h2 className="mb-5">Rs {earnings?.yearlyEarn || 'Not Calculated yett'}</h2>
                          <h6 className="card-text">Increased by 5%</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={activeTab === 'Spin The wheel' ? 'content-wrapper' : 'content-wrapper d-none'}>
                  <div className="page-header">
                    <h3 className="page-title">
                      <span className="page-title-icon bg-gradient-primary text-white mr-2">
                        <i className="mdi mdi-crosshairs-gps menu-icon" />
                      </span> Lucky Wheel
                    </h3>
                    <nav aria-label="breadcrumb">
                      <ul className="breadcrumb">
                        {/* <li className="breadcrumb-item active" aria-current="page">
                    <span />Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
                  </li> */}
                      </ul>
                    </nav>
                  </div>
                  <div className="row">
                    <div className="col-md-12 stretch-card grid-margin">
                      <PrizeWheel />
                    </div>
                  </div>
                </div>
                <div className={activeTab === 'Profile' ? 'content-wrapper' : 'content-wrapper d-none'} style={{ padding: '2.75rem 0.25rem' }} >
                  <div className="row">
                    <div className="col-md-12 stretch-card grid-margin">
                      <Profile />
                    </div>
                  </div>
                </div>
                <div className={activeTab === 'Admin' ? 'content-wrapper' : 'content-wrapper d-none'}>
                  <div className="row">
                    <div className="col-md-12 stretch-card grid-margin">
                      <Admin />
                    </div>
                  </div>
                </div>
                <div className={activeTab === 'Coins' ? 'content-wrapper' : 'content-wrapper d-none'}>
                  <div className="row">
                    <div className="col-md-12 stretch-card grid-margin">
                      <CoinPage userDetail={userDetail} />
                    </div>
                  </div>
                </div>
                <div className={activeTab === 'Wallet' ? 'content-wrapper' : 'content-wrapper d-none'} style={{ padding: '2.75rem 0.25rem' }}>
                  <div className="row">
                    <div className="col-md-12 stretch-card grid-margin" style={{ padding: '0' }}>
                      <WalletPage networks={networks} userDetail={userDetail} setUserDetail={setUserDetail} />
                    </div>

                  </div>
                </div>
                <footer className="footer">
                  <div className="container-fluid clearfix">
                    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © Sadik</span>
                  </div>
                </footer>
              </div>
            </div>
          </div></>
        : <></>}
        
      <div style={{zIndex:'9910',position:"fixed", top:'0',left:'0',right:'0',bottom:'0',alignItems:"center",justifyContent:"center",backgroundColor:'#00000085',display:earningFlag?'':'none',padding:'10vh'}} >
        <div className="" role="document"  >
          <div className="modal-content shadow-lg">
            <div className="modal-header shadow-sm" style={{ backgroundColor: '#c9c9c9' }}>
              <h4 className="modal-title pl-4" id="exampleModalLongTitle">
                User Detail
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>setEarningFlag(false)}  >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body" style={{overflow:"auto"}}>

              <table >
                <tbody>
                  <tr>
                    <th className="text-left pl-3 pb-4">Name</th><th className="text-left pl-3 pb-4">Email</th><th className="text-left pl-3 pb-4">Created</th>
                  </tr>
                  {selectedEarning.map((earning, idx) => (
                    <tr key={idx}>
                      <td className="text-left pl-3">
                          <span style={{ color: 'black' }}>{earning?.name}</span>
                      </td>
                      <td className="text-left pl-3">
                          <span style={{ color: 'black' }}>{earning?.email}</span>
                      </td>
                      <td className="text-left pl-3">
                        <span style={{ color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {Date(earning.createddatetime)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}