import {observable} from "mobx";
import axios from "axios";

class UsersStore {
    @observable users = [];
    @observable currentUser = {};

    setCurrentUser = (user) => {
        this.currentUser = user;
    }

    getUsers = () => {
        let url = 'http://localhost:5000/users';
        let users = [];
        return axios.get(url)
            .then((data) => {
                debugger
                if (data.status === 200) {
                    users = data.data;
                    this.users = data.data;
                }
            })
            .then(() => this.setCurrentUser(users[0]))
            .catch((error) => {
                console.log(error)
            })
    }
}

const usersStore = new UsersStore();
export default usersStore;