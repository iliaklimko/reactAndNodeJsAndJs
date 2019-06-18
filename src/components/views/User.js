import React, {Component} from "react"
import { observer } from "mobx-react";
import usersStore from "../Stores/usersStore"
import "./User.css";
import {FormattedMessage} from "react-intl";

export default
@observer
class User extends Component{
    constructor(props) {
        super(props)
    }

    setUser = (user) => usersStore.setCurrentUser(user)

    render() {
        let {user} = this.props;
        let isCurrentUser = user.id === usersStore.currentUser.id
        return(
            <div className={isCurrentUser ? "active_user": "main_user"} onClick={() => this.setUser(user)}>
               <span className="name">{user.name}</span>
                <span className="email">{user.email}</span>
                <span className="status">{user.status}</span>
                <span className="statusAdmin">{user.adminStatus}</span>
                {isCurrentUser && <>
                    <span onClick={this.props.deleteUser} className="delete cursor"><FormattedMessage id='deleteUser'/></span>
                    <span onClick={this.props.blockUser} className="block_user cursor"><FormattedMessage id='blockUser'/></span>
                    <span onClick={this.props.addAdmin}className="admin_add cursor"><FormattedMessage id='addAdmin'/></span>
                </>}

                <div className="table_users">

                </div>


            </div>

        )
    }

}