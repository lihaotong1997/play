import random from "@/utils/random";
const actions = {
  create({ state, commit, dispatch }:any){//创建游戏
    commit("setContainer");//创建画布
    commit("init");//初始化
    dispatch("keydown");//添加键盘事件
    dispatch("createBox");//创建方块
    dispatch("setBox");//将创建的块转移为下落的块
    commit("timing");//开始计时
    dispatch("loop");//循环开始游戏
    
  },
  loop({ state, dispatch }:any){
    dispatch("arrowDown").then(()=>{
      const timeout = state.difficulty.options.find((item:any)=>item.label === state.difficulty.active);
      if(!state.stop){
        setTimeout(() => {
          dispatch("loop");
        }, timeout);
      }
    }).catch(()=>{
      dispatch("end");
    })
  },
  run({ state, dispatch }:any){//继续游戏
    state.stop = false;
    dispatch("loop");//循环开始游戏
  },
  end({ state }:any){//游戏结束
    state.stop = false;
    window.onkeydown = null;//清除键盘事件
  },
  createBox({ state, commit }:any){//创建方块
    const type = random(7);//随机生成系列类型
    let obj = {
      type:0,
      color:state.moveColors[random(state.moveColors.length)],
      x:5,
      y:-3
    }
    commit(`box${type}`, obj);//生成系列
  },
  setBox({ commit, dispatch }:any){//设置下落的块
    commit("setCurrentBox");
    dispatch("createBox");//创建方块
  },
  keydown({ state, dispatch }:any){//添加键盘事件
    window.onkeydown = (e:any)=>{
      e.preventDefault();//阻止默认事件
      if(state.currentBox){//有移动的系列
        if(state.isKeydown){
          state.isKeydown = false;
          setTimeout(() => {
            if(state.keydownCodeMap[e.code]){
              dispatch(e.code);
            }
            state.isKeydown = true;
          }, 100);
        }
      }
    }
  },
  space(){

  },
  enter(){

  },
  arrowLeft(){

  },
  arrowRight(){

  },
  arrowDown(){

  },
}
export default actions;