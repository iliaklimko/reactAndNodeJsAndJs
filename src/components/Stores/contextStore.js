import {observable} from "mobx";
import axios from "axios";

class ContextStore {
    @observable isAuth = false;
    @observable isReg = false;

    login = (email, password) => {
        this.isAuth = true;
    }
    register = (username, password, email) => {
        this.isReg = true;
    }

    logout = () => {
        let url = 'http://localhost:5000/logout';
        return axios.get(url)
            .then((data) => {
                debugger
                if (data.status === 200) {
                    this.isAuth = false;
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

const contextStore = new ContextStore();
export default contextStore;