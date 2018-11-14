import Local from "utils/local"
export default {
    myPlugin: store => {
        // 当 store 初始化后调用
        store.subscribe((mutation, state) => {
            Local.setItem("vuex", state);

            // 每次 mutation 之后调用
            // mutation 的格式为 { type, payload }
            // mutation.type.includes('SET_LOGINSTATUS') && store.commit('SET_USER',{nickname:''})
        });
    }
};
