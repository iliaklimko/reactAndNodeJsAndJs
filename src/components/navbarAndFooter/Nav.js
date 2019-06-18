import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import en from "../../image/en.png";
import rus from "../../image/rus.png";
import FormGroup from "reactstrap/lib/FormGroup";
import NavItem from "reactstrap/lib/NavItem";
import logo from "../../image/logo.png"
import "./Nav.css"
import contextStore from "../Stores/contextStore";
import {observer} from "mobx-react";
import {FormattedMessage} from 'react-intl';
import temaStore from "../Stores/temaStore";
import adminStore from "../Stores/adminStore";


export default @observer
class Nav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (

            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <img src={logo} alt="logotype" width="70"></img>
                    <ul className="right">

                        <NavItem className="Glav">
                            <NavLink to='/' style={{textDecoration: "none", color: "White"}}>
                                <FormattedMessage id='navbar.main'/>
                            </NavLink>
                        </NavItem>
                        <NavItem className="Search">
                            <form className="form-inline my-2 my-lg-0">
                                <FormGroup>
                                    <input className="form-control mr-sm-2" type=" text" placeholder="search"
                                           aria-label="Search"/>
                                </FormGroup>
                                <FormGroup>
                                    <button type="button" className="btn btn-danger"><FormattedMessage
                                        id='navbar.search'/></button>
                                </FormGroup>
                            </form>
                        </NavItem>
                        {!contextStore.isAuth && <NavItem className="vxod"> <NavLink to='/login' style={{
                            textDecoration: "none",
                            color: "White"
                        }}><FormattedMessage id='navbar.login'/></NavLink></NavItem>}
                        {contextStore.isAuth && <NavItem>
                            <NavLink to="/" onClick={this.handleLogout} className="ml-3 text-white"><FormattedMessage
                                id='navbar.logout'/></NavLink>

                        </NavItem>}
                        {contextStore.isAuth && <div className="btn-group" role="group">
                            <button id="btnGroupDrop1" type="button" style={{fontSize: 12}}
                                    className="btn btn-primary dropdown-toggle\"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FormattedMessage id='setting'/>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <span className="dropdown-item" onClick={this.changeTema}><FormattedMessage
                                    id='white-fon'/></span>
                                <span className="dropdown-item" onClick={this.changeTema}><FormattedMessage
                                    id='grey-fon'/></span>
                                <a className="dropdown-item" href="#"><FormattedMessage
                                    id='profile'/></a>
                                {adminStore.admin &&
                                <NavLink to='/admin' style={{textDecoration: "none"}} className="dropdown-item">
                                    <FormattedMessage id='admin'/>
                                </NavLink>}
                            </div>
                        </div>}
                        {!contextStore.isAuth && <NavItem className="reg"><NavLink to='/register' style={{
                            textDecoration: "none",
                            color: "white"
                        }}><FormattedMessage id='navbar.register'/></NavLink></NavItem>}
                        <NavItem className="ru"><NavLink onClick={() => this.props.handleLocaleChange("ru")}><img
                            src={rus} alt="russian" width="30"></img></NavLink></NavItem>
                        <NavItem className="en"><NavLink onClick={() => this.props.handleLocaleChange("en")}><img
                            src={en} alt="england" width="30"></img></NavLink></NavItem>
                    </ul>
                </div>
            </nav>

        )
    }


    handleLogout = () => {
        contextStore.logout();
    }

    handleLocaleChange = (lang) => {
        this.setState({locale: lang});
    }
    changeTema = () => {
        temaStore.changeTema();
    }


}

