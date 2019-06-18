import React, {Component} from "react";
import Form from "reactstrap/lib/Form";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import Button from "reactstrap/lib/Button";
import Card from "reactstrap/lib/Card";
import "./RegisterPage.css"
import axios from 'axios';
import { observer } from "mobx-react";
import {FormattedMessage} from "react-intl";
import {RegisterState} from './registerState';

export default
@observer
class registerPage extends Component {
    RegisterState = new RegisterState()
    render() {
        return (
            <div className="RegisterPage h-100 w-100 d-flex  align-items-center justify-content-center">
                <div className="wrapper">
                    <h3 className="text-muted text-center mb-4">  <FormattedMessage id='navbar.register1'/></h3>
                    <Card body className="shadow">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label><FormattedMessage id='navbar.name'/></Label>
                                <Input  value={this.RegisterState.username}  onChange={this.handleUsernameChange} required type=" text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label><FormattedMessage id='navbar.email'/></Label>
                                <Input  value={this.RegisterState.email}  onChange={this.handleEmailChange} required type=" email"/>
                            </FormGroup>
                            <FormGroup>
                                <Label><FormattedMessage id='navbar.password'/></Label>
                                <Input  value={this.RegisterState.password}  onChange={this.handlePasswordChange} required type=" password"/>
                            </FormGroup>
                            <Button color="success" className="w-100 mt-4">
                                <FormattedMessage id='navbar.register'/>
                            </Button>
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }

    handleUsernameChange = event => this.RegisterState.username = event.target.value;

    handleEmailChange = event => this.RegisterState.email = event.target.value;


    handlePasswordChange = event => this.RegisterState.password = event.target.value;

    handleSubmit = event => {
        let name = event.currentTarget[0].defaultValue;
        let email = event.currentTarget[1].defaultValue;
        let password = event.currentTarget[2].defaultValue;
        event.preventDefault();
        if (email.indexOf('@') === -1) {
            alert("Wrong email")
            this.RegisterState.register();
            this.props.history.push("/");
        } else {
            let url = 'http://localhost:5000/signup';
            let body = {name: name, password: password, email: email};
            return axios.post(url, body)
                .then((data) => {
                    if (data.status === 200){
                        alert("Для продолжения регистрации,пройдите по ссылке,которая была отправлена вам на почту!")
                        this.RegisterState.register();
                        this.props.history.push("/");
                    }
                })
                .catch((error) => {
                    console.log(error)
                    alert("Пользователь с такой почтой уже зарегистрирован!")
                    this.props.history.push("/register");
                })
        }

    };
}