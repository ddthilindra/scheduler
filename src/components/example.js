import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { APIURL } from "../../API/environment";
import Navbar from '../Adminnavibar';
import Daybar from '../DayBar';


class Admin_Employer_Request_List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TopList: [],
    };
    this.onRemove = this.onRemove.bind(this);
  }
  async componentDidMount() {
    await axios.get(`${APIURL}/EMPTopList/getAllTopList`).then((response) => {
      this.setState({ TopList: response.data.data });
      console.log("TopList =>", this.state.TopList);
    });
  }

  onRemove(e,id){
    axios
    .delete(`${APIURL}/EMPTopList/DeleteTopList/${id}`)
    .then((res) => {
      console.log("res", res);
      if (res.data.code === 200) {
        console.log("res.data.code", res.data.code);

        toast.error("TopList is Deleted!");


        window.setTimeout(function () {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(res.data.message);

      }
    });
  }

  onChangeActiveStatus(e, id) {
    let updateDetailsStatus = {
      IsApprove: 1,
    };

    console.log(id);
    console.log(updateDetailsStatus);

    axios
      .put(`${APIURL}/EMPTopList/approveTopListReq/${id}`, updateDetailsStatus)
      .then((res) => {
        console.log(res.data);
        console.log(updateDetailsStatus);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          window.setTimeout(function () {
                    window.location.reload();
                  }, 1500);
        } else {
          toast.error(res.data.message);

        }
     
      });
  }

  render() {
    return (
      <div>
        <h1></h1>
        {/* Left Sidenav */}
        <Navbar/>
        <div className="page-wrapper" style={{ width: "1200px" }}>
          <div className="page-content">
            <div className="container-fluid">
              {/* Page-Title */}
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-title-box">
                    <div className="row">
                      <div className="col">
                        <h4 className="page-title" />
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <a href="javascript:void(0);">Admin</a>
                          </li>
                     
                          <li className="breadcrumb-item active">
                          Top Company Request List
                          </li>
                        </ol>
                      </div>
                      {/*end col*/}
                      <Daybar/>
                      {/*end col*/}
                    </div>
                    {/*end row*/}
                  </div>
                  {/*end page-title-box*/}
                </div>
                {/*end col*/}
              </div>
              {/*end row*/}
              {/* end page title end breadcrumb */}
              <div className="row"> 
                <div className="col-lg-12 col-sm-12">
                  <div className="card" style={{marginTop:"40px"}}>
                    <div className="card-header">
                    </div>
                    {/*end card-header*/}
                    <div className="card-body table-responsive">
                      <div className>
                        <table
                          id="datatable2"
                          className="table dt-responsive nowrap"
                          style={{
                            borderCollapse: "collapse",
                            borderSpacing: 0,
                            width: "100%",
                          }}
                        >
                          <thead>
                            <tr>
                              <th>Employer Name</th>
                              <th>Description</th>
                              <th>Web Link</th>
                              <th>Email</th>
                              <th>Contact</th>

                          
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.TopList.length > 0 &&
                              this.state.TopList.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.EmpName}</td>
                                  <td >{item.description}</td>
                                  <td>{item.weblink}</td>
                                  <td>{item.email}</td>
                                  <td>{item.mobile}</td>

                                  <td>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-primary"
                                      onClick={(e) =>
                                        this.onChangeActiveStatus(e, item._id)
                                      }
                                    >
                                      Approve
                                    </button>
                                  </td>
                                  <td>
                                    <button href className="btn btn-danger"
                                    onClick={(e) =>
                                        this.onRemove(e, item._id)
                                      }
                                      >
                                      Reject
                                    </button>
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
            </div>
            {/* container */}
            <footer className="footer text-center text-sm-left">
              </footer>
            {/*end footer*/}
          </div>
          {/* end page content */}
        </div>
      </div>
    );
  }
}

export default Admin_Employer_Request_List;
