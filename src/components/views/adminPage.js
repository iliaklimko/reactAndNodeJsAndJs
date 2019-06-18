import React, {Component} from "react"
import usersStore from "../Stores/usersStore"
import { observer } from "mobx-react";
import User from "./User";
import "./HomePage.css"
import "./adminPage.css"
import axios from "axios";
import {FormattedMessage} from "react-intl";
import temaStore from "../Stores/temaStore";

export default
@observer
class AdminPage extends Component{
    render() {
        return(
            <div className="Admin">
            <div  className={temaStore.isWhite ? 'gray height': 'white height'}>
               <div>
                   <button onClick={this.getUsers}><FormattedMessage id='showUser'/></button>
               </div>
                {usersStore.users && usersStore.users
                    .map((user) => <User user={user}
                                         key={user.id}
                                         deleteUser={() => this.deleteUser(user.id)}
                                         blockUser={() => this.updateUser(user.id, true)}
                                         addAdmin={() => this.updateUser(user.id, false)}/>)}
            </div>
            </div>
        )
    }

    getUsers = () => usersStore.getUsers()

    deleteUser = (id) => {
        let url = 'http://localhost:5000/users';
        return axios.delete(url, {data : {id: id}})
            .then((data) => {
                if (data.status === 200) {
                    usersStore.getUsers()
                }
            })
            .catch((error) => console.log(error))
    }

    updateUser = (id, isBlock) => {
        let body = {id: id, isBlock: isBlock};
        let url = 'http://localhost:5000/users/update';
        debugger
        return axios.post(url, body)
            .then((data) => {
                if (data.status === 200) {
                    usersStore.getUsers()
                }
            })
            .catch((error) => console.log(error))
    }

}