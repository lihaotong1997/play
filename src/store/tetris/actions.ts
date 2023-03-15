const actions = {
  create({ state, commit, dispatch }:any){//创建游戏
    commit("setContainer");//创建画布
  },
}
export default actions;