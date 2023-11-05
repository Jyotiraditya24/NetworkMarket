import React from "react";

export default function Home(){
    return(
        <div>
        {/* Mirrored from www.bootstrapdash.com/demo/purple-admin-free/pages/tables/basic-table.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 22 Jun 2023 07:03:47 GMT */}
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
          {/* partial:../../partials/_navbar.html */}
          <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a className="navbar-brand brand-logo" href="../../index-2.html"><img src="../../assets/images/logo.svg" alt="logo" /></a>
              <a className="navbar-brand brand-logo-mini" href="../../index-2.html"><img src="../../assets/images/logo-mini.svg" alt="logo" /></a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-stretch">
              <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                <span className="mdi mdi-menu" />
              </button>
              <div className="search-field d-none d-md-block">
                <form className="d-flex align-items-center h-100" action="#">
                  <div className="input-group">
                    <div className="input-group-prepend bg-transparent">
                      <i className="input-group-text border-0 mdi mdi-magnify" />
                    </div>
                    <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects" />
                  </div>
                </form>
              </div>
              <ul className="navbar-nav navbar-nav-right">
                <li className="nav-item nav-profile dropdown">
                  <a className="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                    <div className="nav-profile-img">
                      <img src="../../assets/images/faces/face1.jpg" alt="image" />
                      <span className="availability-status online" />
                    </div>
                    <div className="nav-profile-text">
                      <p className="mb-1 text-black">David Greymaax</p>
                    </div>
                  </a>
                  <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                    <a className="dropdown-item" href="#">
                      <i className="mdi mdi-cached mr-2 text-success" /> Activity Log </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#">
                      <i className="mdi mdi-logout mr-2 text-primary" /> Signout </a>
                  </div>
                </li>
                <li className="nav-item d-none d-lg-block full-screen-link">
                  <a className="nav-link">
                    <i className="mdi mdi-fullscreen" id="fullscreen-button" />
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                    <i className="mdi mdi-email-outline" />
                    <span className="count-symbol bg-warning" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                    <h6 className="p-3 mb-0">Messages</h6>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <img src="../../assets/images/faces/face4.jpg" alt="image" className="profile-pic" />
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                        <p className="text-gray mb-0"> 1 Minutes ago </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <img src="../../assets/images/faces/face2.jpg" alt="image" className="profile-pic" />
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Cregh send you a message</h6>
                        <p className="text-gray mb-0"> 15 Minutes ago </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <img src="../../assets/images/faces/face3.jpg" alt="image" className="profile-pic" />
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Profile picture updated</h6>
                        <p className="text-gray mb-0"> 18 Minutes ago </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <h6 className="p-3 mb-0 text-center">4 new messages</h6>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                    <i className="mdi mdi-bell-outline" />
                    <span className="count-symbol bg-danger" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                    <h6 className="p-3 mb-0">Notifications</h6>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-success">
                          <i className="mdi mdi-calendar" />
                        </div>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">Event today</h6>
                        <p className="text-gray ellipsis mb-0"> Just a reminder that you have an event today </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-warning">
                          <i className="mdi mdi-settings" />
                        </div>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">Settings</h6>
                        <p className="text-gray ellipsis mb-0"> Update dashboard </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-info">
                          <i className="mdi mdi-link-variant" />
                        </div>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">Launch Admin</h6>
                        <p className="text-gray ellipsis mb-0"> New admin wow! </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <h6 className="p-3 mb-0 text-center">See all notifications</h6>
                  </div>
                </li>
                <li className="nav-item nav-logout d-none d-lg-block">
                  <a className="nav-link" href="#">
                    <i className="mdi mdi-power" />
                  </a>
                </li>
                <li className="nav-item nav-settings d-none d-lg-block">
                  <a className="nav-link" href="#">
                    <i className="mdi mdi-format-line-spacing" />
                  </a>
                </li>
              </ul>
              <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                <span className="mdi mdi-menu" />
              </button>
            </div>
          </nav>
          {/* partial */}
          <div className="container-fluid page-body-wrapper">
            {/* partial:../../partials/_sidebar.html */}
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
              <ul className="nav">
                <li className="nav-item nav-profile">
                  <a href="#" className="nav-link">
                    <div className="nav-profile-image">
                      <img src="../../assets/images/faces/face1.jpg" alt="profile" />
                      <span className="login-status online" />
                      {/*change to offline or busy as needed*/}
                    </div>
                    <div className="nav-profile-text d-flex flex-column">
                      <span className="font-weight-bold mb-2">David Grey. H</span>
                      <span className="text-secondary text-small">Project Manager</span>
                    </div>
                    <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../../index-2.html">
                    <span className="menu-title">Dashboard</span>
                    <i className="mdi mdi-home menu-icon" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                    <span className="menu-title">Basic UI Elements</span>
                    <i className="menu-arrow" />
                    <i className="mdi mdi-crosshairs-gps menu-icon" />
                  </a>
                  <div className="collapse" id="ui-basic">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className="nav-link" href="../ui-features/buttons.html">Buttons</a></li>
                      <li className="nav-item"> <a className="nav-link" href="../ui-features/typography.html">Typography</a></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../icons/mdi.html">
                    <span className="menu-title">Icons</span>
                    <i className="mdi mdi-contacts menu-icon" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../forms/basic_elements.html">
                    <span className="menu-title">Forms</span>
                    <i className="mdi mdi-format-list-bulleted menu-icon" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../charts/chartjs.html">
                    <span className="menu-title">Charts</span>
                    <i className="mdi mdi-chart-bar menu-icon" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="basic-table.html">
                    <span className="menu-title">Tables</span>
                    <i className="mdi mdi-table-large menu-icon" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                    <span className="menu-title">Sample Pages</span>
                    <i className="menu-arrow" />
                    <i className="mdi mdi-medical-bag menu-icon" />
                  </a>
                  <div className="collapse" id="general-pages">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className="nav-link" href="../samples/blank-page.html"> Blank Page </a></li>
                      <li className="nav-item"> <a className="nav-link" href="../samples/login.html"> Login </a></li>
                      <li className="nav-item"> <a className="nav-link" href="../samples/register.html"> Register </a></li>
                      <li className="nav-item"> <a className="nav-link" href="../samples/error-404.html"> 404 </a></li>
                      <li className="nav-item"> <a className="nav-link" href="../samples/error-500.html"> 500 </a></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item sidebar-actions">
                  <span className="nav-link">
                    <div className="border-bottom">
                      <h6 className="font-weight-normal mb-3">Projects</h6>
                    </div>
                    <button className="btn btn-block btn-lg btn-gradient-primary mt-4">+ Add a project</button>
                    <div className="mt-4">
                      <div className="border-bottom">
                        <p className="text-secondary">Categories</p>
                      </div>
                      <ul className="gradient-bullet-list mt-4">
                        <li>Free</li>
                        <li>Pro</li>
                      </ul>
                    </div>
                  </span>
                </li>
              </ul>
            </nav>
            {/* partial */}
            <div className="main-panel">
              <div className="content-wrapper">
                <div className="page-header">
                  <h3 className="page-title"> Basic Tables </h3>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="#">Tables</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Basic tables</li>
                    </ol>
                  </nav>
                </div>
                <div className="row">
                  <div className="col-lg-6 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Basic Table</h4>
                        <p className="card-description"> Add class <code>.table</code>
                        </p>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Profile</th>
                              <th>VatNo.</th>
                              <th>Created</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Jacob</td>
                              <td>53275531</td>
                              <td>12 May 2017</td>
                              <td><label className="badge badge-danger">Pending</label></td>
                            </tr>
                            <tr>
                              <td>Messsy</td>
                              <td>53275532</td>
                              <td>15 May 2017</td>
                              <td><label className="badge badge-warning">In progress</label></td>
                            </tr>
                            <tr>
                              <td>John</td>
                              <td>53275533</td>
                              <td>14 May 2017</td>
                              <td><label className="badge badge-info">Fixed</label></td>
                            </tr>
                            <tr>
                              <td>Peter</td>
                              <td>53275534</td>
                              <td>16 May 2017</td>
                              <td><label className="badge badge-success">Completed</label></td>
                            </tr>
                            <tr>
                              <td>Dave</td>
                              <td>53275535</td>
                              <td>20 May 2017</td>
                              <td><label className="badge badge-warning">In progress</label></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Hoverable Table</h4>
                        <p className="card-description"> Add class <code>.table-hover</code>
                        </p>
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>User</th>
                              <th>Product</th>
                              <th>Sale</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Jacob</td>
                              <td>Photoshop</td>
                              <td className="text-danger"> 28.76% <i className="mdi mdi-arrow-down" /></td>
                              <td><label className="badge badge-danger">Pending</label></td>
                            </tr>
                            <tr>
                              <td>Messsy</td>
                              <td>Flash</td>
                              <td className="text-danger"> 21.06% <i className="mdi mdi-arrow-down" /></td>
                              <td><label className="badge badge-warning">In progress</label></td>
                            </tr>
                            <tr>
                              <td>John</td>
                              <td>Premier</td>
                              <td className="text-danger"> 35.00% <i className="mdi mdi-arrow-down" /></td>
                              <td><label className="badge badge-info">Fixed</label></td>
                            </tr>
                            <tr>
                              <td>Peter</td>
                              <td>After effects</td>
                              <td className="text-success"> 82.00% <i className="mdi mdi-arrow-up" /></td>
                              <td><label className="badge badge-success">Completed</label></td>
                            </tr>
                            <tr>
                              <td>Dave</td>
                              <td>53275535</td>
                              <td className="text-success"> 98.05% <i className="mdi mdi-arrow-up" /></td>
                              <td><label className="badge badge-warning">In progress</label></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Striped Table</h4>
                        <p className="card-description"> Add class <code>.table-striped</code>
                        </p>
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th> User </th>
                              <th> First name </th>
                              <th> Progress </th>
                              <th> Amount </th>
                              <th> Deadline </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-1">
                                <img src="../../assets/images/faces-clipart/pic-1.png" alt="image" />
                              </td>
                              <td> Herman Beck </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $ 77.99 </td>
                              <td> May 15, 2015 </td>
                            </tr>
                            <tr>
                              <td className="py-1">
                                <img src="../../assets/images/faces-clipart/pic-2.png" alt="image" />
                              </td>
                              <td> Messsy Adam </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-danger" role="progressbar" style={{width: '75%'}} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $245.30 </td>
                              <td> July 1, 2015 </td>
                            </tr>
                            <tr>
                              <td className="py-1">
                                <img src="../../assets/images/faces-clipart/pic-3.png" alt="image" />
                              </td>
                              <td> John Richards </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-warning" role="progressbar" style={{width: '90%'}} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $138.00 </td>
                              <td> Apr 12, 2015 </td>
                            </tr>
                            <tr>
                              <td className="py-1">
                                <img src="../../assets/images/faces-clipart/pic-4.png" alt="image" />
                              </td>
                              <td> Peter Meggik </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-primary" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $ 77.99 </td>
                              <td> May 15, 2015 </td>
                            </tr>
                            <tr>
                              <td className="py-1">
                                <img src="../../assets/images/faces-clipart/pic-1.png" alt="image" />
                              </td>
                              <td> Edward </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-danger" role="progressbar" style={{width: '35%'}} aria-valuenow={35} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $ 160.25 </td>
                              <td> May 03, 2015 </td>
                            </tr>
                            <tr>
                              <td className="py-1">
                                <img src="../../assets/images/faces-clipart/pic-2.png" alt="image" />
                              </td>
                              <td> John Doe </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-info" role="progressbar" style={{width: '65%'}} aria-valuenow={65} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $ 123.21 </td>
                              <td> April 05, 2015 </td>
                            </tr>
                            <tr>
                              <td className="py-1">
                                <img src="../../assets/images/faces-clipart/pic-3.png" alt="image" />
                              </td>
                              <td> Henry Tom </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-warning" role="progressbar" style={{width: '20%'}} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $ 150.00 </td>
                              <td> June 16, 2015 </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Bordered table</h4>
                        <p className="card-description"> Add class <code>.table-bordered</code>
                        </p>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th> # </th>
                              <th> First name </th>
                              <th> Progress </th>
                              <th> Amount </th>
                              <th> Deadline </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> 1 </td>
                              <td> Herman Beck </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $ 77.99 </td>
                              <td> May 15, 2015 </td>
                            </tr>
                            <tr>
                              <td> 2 </td>
                              <td> Messsy Adam </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-danger" role="progressbar" style={{width: '75%'}} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $245.30 </td>
                              <td> July 1, 2015 </td>
                            </tr>
                            <tr>
                              <td> 3 </td>
                              <td> John Richards </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-warning" role="progressbar" style={{width: '90%'}} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $138.00 </td>
                              <td> Apr 12, 2015 </td>
                            </tr>
                            <tr>
                              <td> 4 </td>
                              <td> Peter Meggik </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-primary" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $ 77.99 </td>
                              <td> May 15, 2015 </td>
                            </tr>
                            <tr>
                              <td> 5 </td>
                              <td> Edward </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-danger" role="progressbar" style={{width: '35%'}} aria-valuenow={35} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $ 160.25 </td>
                              <td> May 03, 2015 </td>
                            </tr>
                            <tr>
                              <td> 6 </td>
                              <td> John Doe </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-info" role="progressbar" style={{width: '65%'}} aria-valuenow={65} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $ 123.21 </td>
                              <td> April 05, 2015 </td>
                            </tr>
                            <tr>
                              <td> 7 </td>
                              <td> Henry Tom </td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-warning" role="progressbar" style={{width: '20%'}} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </td>
                              <td> $ 150.00 </td>
                              <td> June 16, 2015 </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Inverse table</h4>
                        <p className="card-description"> Add class <code>.table-dark</code>
                        </p>
                        <table className="table table-dark">
                          <thead>
                            <tr>
                              <th> # </th>
                              <th> First name </th>
                              <th> Amount </th>
                              <th> Deadline </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> 1 </td>
                              <td> Herman Beck </td>
                              <td> $ 77.99 </td>
                              <td> May 15, 2015 </td>
                            </tr>
                            <tr>
                              <td> 2 </td>
                              <td> Messsy Adam </td>
                              <td> $245.30 </td>
                              <td> July 1, 2015 </td>
                            </tr>
                            <tr>
                              <td> 3 </td>
                              <td> John Richards </td>
                              <td> $138.00 </td>
                              <td> Apr 12, 2015 </td>
                            </tr>
                            <tr>
                              <td> 4 </td>
                              <td> Peter Meggik </td>
                              <td> $ 77.99 </td>
                              <td> May 15, 2015 </td>
                            </tr>
                            <tr>
                              <td> 5 </td>
                              <td> Edward </td>
                              <td> $ 160.25 </td>
                              <td> May 03, 2015 </td>
                            </tr>
                            <tr>
                              <td> 6 </td>
                              <td> John Doe </td>
                              <td> $ 123.21 </td>
                              <td> April 05, 2015 </td>
                            </tr>
                            <tr>
                              <td> 7 </td>
                              <td> Henry Tom </td>
                              <td> $ 150.00 </td>
                              <td> June 16, 2015 </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Table with contextual classes</h4>
                        <p className="card-description"> Add class <code>.table-{'{'}color{'}'}</code>
                        </p>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th> # </th>
                              <th> First name </th>
                              <th> Product </th>
                              <th> Amount </th>
                              <th> Deadline </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="table-info">
                              <td> 1 </td>
                              <td> Herman Beck </td>
                              <td> Photoshop </td>
                              <td> $ 77.99 </td>
                              <td> May 15, 2015 </td>
                            </tr>
                            <tr className="table-warning">
                              <td> 2 </td>
                              <td> Messsy Adam </td>
                              <td> Flash </td>
                              <td> $245.30 </td>
                              <td> July 1, 2015 </td>
                            </tr>
                            <tr className="table-danger">
                              <td> 3 </td>
                              <td> John Richards </td>
                              <td> Premeire </td>
                              <td> $138.00 </td>
                              <td> Apr 12, 2015 </td>
                            </tr>
                            <tr className="table-success">
                              <td> 4 </td>
                              <td> Peter Meggik </td>
                              <td> After effects </td>
                              <td> $ 77.99 </td>
                              <td> May 15, 2015 </td>
                            </tr>
                            <tr className="table-primary">
                              <td> 5 </td>
                              <td> Edward </td>
                              <td> Illustrator </td>
                              <td> $ 160.25 </td>
                              <td> May 03, 2015 </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* content-wrapper ends */}
              {/* partial:../../partials/_footer.html */}
              <footer className="footer">
                <div className="container-fluid clearfix">
                  <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © bootstrapdash.com 2020</span>
                  <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Free <a href="https://www.bootstrapdash.com/bootstrap-admin-template/" target="_blank">Bootstrap admin template</a> from Bootstrapdash.com</span>
                </div>
              </footer>
              {/* partial */}
            </div>
            {/* main-panel ends */}
          </div>
          {/* page-body-wrapper ends */}
        </div>
        {/* container-scroller */}
        {/* plugins:js */}
        {/* endinject */}
        {/* Plugin js for this page */}
        {/* End plugin js for this page */}
        {/* inject:js */}
        {/* endinject */}
        {/* Custom js for this page */}
        {/* End custom js for this page */}
        {/* Mirrored from www.bootstrapdash.com/demo/purple-admin-free/pages/tables/basic-table.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 22 Jun 2023 07:03:48 GMT */}
      </div>
      
    );
}