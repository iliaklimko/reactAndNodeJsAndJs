import {observable} from "mobx";

class AdminStore {
    @observable admin = null;


    setAdmin = (user) => {
        this.admin = user
    }
}

const adminStore = new AdminStore();
export default adminStore;