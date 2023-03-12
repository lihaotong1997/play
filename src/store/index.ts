import { createStore } from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

import series from "./series";
const store = createStore({
    state,
    getters,
    mutations,
    actions,
    modules:{
        series,
    }
})
export default store;