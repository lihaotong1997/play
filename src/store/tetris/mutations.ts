const mutations = {
    setDifficulty(state:any,value:string){//设置难度
      state.difficulty.active = value;
    },
    setContainer(state:any){//设置画布
      let list = [];
      for(let i = 0; i < state.row; i++){
        for(let j = 0; j < state.column; j++){
          list.push({
            coor:[ j, i ],//坐标
          })
        }
      }
      state.container.data = list;
    }
}
export default mutations;