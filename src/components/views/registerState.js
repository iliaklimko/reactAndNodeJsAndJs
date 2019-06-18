import { observable } from "mobx";
import contextStore from "../Stores/contextStore";

export class RegisterState {
    @observable username = "";
    @observable password = "";
    @observable email = "";

    register = () => {
        contextStore.register();
    };
}
