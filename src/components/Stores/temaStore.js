import {observable} from "mobx";

class TemaStore {
    @observable isWhite = false;

    changeTema = () => {
        this.isWhite = !this.isWhite;
    }
}

const temaStore = new TemaStore();
export default temaStore;