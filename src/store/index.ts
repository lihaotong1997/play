import { createStore } from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

import tetris from "./tetris/index";
const store = createStore({
    state,
    getters,
    mutations,
    actions,
    modules:{
        tetris,
    }
})
export default store;