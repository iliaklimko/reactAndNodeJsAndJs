import { observable } from "mobx";
import contextStore from "../Stores/contextStore";

export class LoginState {
  @observable email = "";
  @observable password = "";

  login = () => {
    contextStore.login();
  };
}
