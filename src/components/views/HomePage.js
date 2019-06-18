import React, {Component} from "react"
import temaStore from "../Stores/temaStore";
import { observer } from "mobx-react";
import "./HomePage.css"

export default
@observer
class HomePage extends Component{
    render() {
        return(
            <div className={temaStore.isWhite ? 'gray height': 'white height'}>
                USERS
            </div>



        )
    }


}