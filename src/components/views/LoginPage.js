import React, {Component} from "react";
import Form from "reactstrap/lib/Form";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import Button from "reactstrap/lib/Button";
import Card from "reactstrap/lib/Card";
import "./LoginPage.css"
import {LoginState} from "./loginState";
import {observer} from "mobx-react";
import {FormattedMessage} from "react-intl";
import axios from "axios";
import adminStore from '../Stores/adminStore';


export default @observer
class loginPage extends Component {
    LoginState = new LoginState();

    render() {
        return (
            <div className="LoginPage h-100 w-100 d-flex bg-red align-items-center justify-content-center">
                <div className="wrapper">
                    <h3 className="text-muted text-center mb-4"><FormattedMessage id='login.page'/></h3>
                    <Card body className="shadow">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label><FormattedMessage id='navbar.email'/></Label>
                                <Input value={this.LoginState.email} onChange={this.handleEmailChange} required
                                       type=" email"/>
                            </FormGroup>
                            <FormGroup>
                                <Label><FormattedMessage id='navbar.password'/></Label>
                                <Input value={this.LoginState.password} type=" password"  required
                                       onChange={this.handlePasswordChange}/>
                            </FormGroup>
                            <Button color="success" className="w-100 mt-4">
                                <FormattedMessage id='navbar.login'/>
                            </Button>
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }

    handleEmailChange = event => this.LoginState.email = event.target.value;
    handlePasswordChange = event => this.LoginState.password = event.target.value;


    handleSubmit = event => {
        let email = event.currentTarget[0].defaultValue;
        let password = event.currentTarget[1].defaultValue;
        event.preventDefault();
        let url = 'http://localhost:5000/signin';
        let body = {email: email, password: password};
        return axios.post(url, body)
            .then((data) => {
                if (data.status === 200 && (data.data.status === 'active')) {
                    this.LoginState.login();
                    this.props.history.push("/");
                } else {
                    alert('Аккаунт не активирован!')
                }
                if (data.data.adminStatus === "true") {
                    adminStore.setAdmin(data.data)
                } else {
                    adminStore.setAdmin(null)
                }
            })
            .catch((error) => {

                alert("Почта или пароль неправильные")
                this.props.history.push("/login");
            })
    }


}