const mutations = {
    setDifficulty(state:any,value:string){//设置难度
      state.difficulty.active = value;
    }
}
export default mutations;