import React, { Component, useState } from 'react';
import { Link, Redirect, withRouter,useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../store/actions/auth";
import { setHeaderSearch } from "../../../store/actions/nav";

import logo from '../../../assets/img/logo.png';

import CommonService from "../../../services/CommonService";
import { toast } from 'react-toastify';
import LearnerList from '../../Modules/Admin/AdminLearners/LearnerList';

const AdminHeader = (props) => {

    const dispatch = useDispatch();
    const { currentNav } = useSelector(state => state.nav);
    const { isLoggedIn } = useSelector(state => state.auth);
    const [formData, setFormData] = useState([]);
    let history = useHistory();

    const [toggle, setToggle] = useState(false);

    const logOut = () => {
        dispatch(logout());
    };
    const toggleNav=()=>{
        toggle?setToggle(false) :setToggle(true);
    }

    const handleChange = event => {
        let { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearch = () => {
        dispatch(setHeaderSearch(formData?.search_header));
        CommonService.create('searchHeader', formData)
            .then(response => {
                console.log(response.data.success);

                if(response.data.success){

                    const searchName = response.data.data.user_type;
                    if(searchName=='tutor'){
                        console.log('km');
                        history.push({pathname: "/admin/tutor",
                        state: {
                                pageName: 'tutor',
                                search_field: formData?.search_header
                            }
                        });
                    }else if(searchName=='assessment'){
                        history.push({pathname: "/admin/assessment-list",
                        state: {
                            pageName: 'assessment',
                            search_field: formData?.search_header
                        }
                    });
                    }else if(searchName=='learner'){
                        history.push({pathname: "/admin/learner",
                        state: {
                            pageName: 'Learner',
                            search_field: formData?.search_header
                        }});
                    }
                    else if(searchName=='question'){
                        history.push({pathname: "/admin/question-answer",
                        state: {
                            pageName: 'question',
                            search_field: formData?.search_header
                        }});
                    }
                }
                
            })
            .catch(e => {
                console.log(e);
            });
    }
    

    return (            
        <div>
            <header className="main_header">
                <section className="top_header">
                    <div className="container">
                        <div className="row">
                        <div className="logo_part col-auto">
                            <Link to="/">
                            <img src={logo} alt="" />
                            </Link>
                        </div>
                        <div className="col log_in_group">
                            <ul className="d-flex justify-content-end">
                               {(isLoggedIn)?
                                <li><Link to="/login" className="LogOutBtn" onClick={logOut}>LOGOUT</Link></li>
                               :
                                <li><Link to="/login" className="LogOutBtn">LOGIN</Link></li>
                               }       
                            </ul>
                        </div>
                        </div>
                    </div>
                </section>
                <section className="bottom_container">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col menu_part">
                                <button className={ toggle ? "hambergerBtn active" : "hambergerBtn" } onClick={toggleNav}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                                <nav className={ toggle ? "customNav show_nav" : "customNav" }>
                                    <ul className="navbar-nav flex-lg-row">
                                        {/* <li className="nav-item active" > */}
                                        <li className={(currentNav=="adminDashboard")?"nav-item active":"nav-item"} >
                                            <Link to="/admin/dashboard" className="nav-link">DASHBOARD</Link>                                   
                                        </li>
                                        <li className={(currentNav=="adminLearner")?"nav-item active":"nav-item"}>
                                            <Link to="/admin/learner" className="nav-link">LEARNERS</Link>
                                        </li>
                                        <li className={(currentNav=="adminTutor")?"nav-item active":"nav-item"}>
                                            <Link to="/admin/tutor"  className="nav-link">TUTORS</Link>
                                        </li>
                                        <li className={(currentNav=="adminAssessment")?"nav-item active":"nav-item"}>
                                            <Link to="/admin/assessment-list" className="nav-link">ASSESSMENTS</Link>
                                        </li>
                                        <li className="nav-item hasSubmenue">
                                            <Link className="nav-link" to="/admin/change-password">ACCOUNT<i className="fa fa-angle-down"></i>
                                            </Link> 
                                            <ul>
                                                <li>
                                                    <Link to="/admin/change-password" className="nav-link">Change Password</Link>
                                                </li>

                                            </ul>
                                        </li>                                    
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-auto search_part">
                                <div className="search-wrap">
                                    <button onClick={handleSearch}><i className="fa fa-search"></i></button>
                                    <input type="text" name='search_header' onChange={handleChange} className="search_field"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>                
        </div>
    );
}

export default withRouter(AdminHeader);