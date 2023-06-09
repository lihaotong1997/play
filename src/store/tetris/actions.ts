import random from "@/utils/random";
import { ElMessageBox } from "element-plus";
const has = (state:any,list:any)=>{
  return list.every((item:any)=>{
    if(item[0] >= 0 && item[0] < state.container.column){//左右未超出
      if(item[1] < 0){//还未下来
        return true;
      }else if(item[1] >= state.container.row){//下面超出了
        return false;
      }else{//在画布中
        return state.container.data[item[1]][item[0]].type !== 2;
      }
    }else{//左右超出了
      return false;
    }
  })
}
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
      const timeout = state.difficulty.options.find((item:any)=>item.label === state.difficulty.active).timeout;
      if(!state.stop){
        state.loopTimer = setTimeout(() => {
          dispatch("loop");
        }, timeout);
      }
    }).catch(()=>{
      dispatch("turn");//一轮结束
    })
  },
  run({ state, dispatch }:any){//继续游戏
    state.stop = false;
    dispatch("loop");//循环开始游戏
  },
  turn({ state, commit, dispatch }:any){//一轮结束
    let list = state.currentBox.list[state.currentBox.state];
    list = list.map((item:Array<number>)=>[item[0] + state.currentBox.x,item[1] + state.currentBox.y]);
    const isOver = list.some((item:any)=>item[1] < 0);
    if(isOver){
      dispatch("end");//游戏结束
    }else{
      commit("setNonEmpty");//转换为固定块
      commit("destroy");//销毁
      dispatch("setBox");//将创建的块转移为下落的块
      dispatch("createBox");//创建方块
      dispatch("loop");//循环开始游戏
    }
  },
  end({ state,dispatch,getters }:any){//游戏结束
    state.stop = false;
    window.onkeydown = null;//清除键盘事件
    clearTimeout(state.timing);//清除计时器
    ElMessageBox.alert(`用时${getters.times}，共消除${state.crushNums}行，得分为${getters.number}。了不起！继续努力把！`,"很遗憾，游戏失败", {
      confirmButtonText: '重新开始',
      callback: () => {
        dispatch("create");
      },
    })
  },
  createBox({ state, commit }:any){//创建方块
    const type = random(7);//随机生成系列类型
    let obj = {
      type:0,
      color:state.moveColors[random(state.moveColors.length)],
      x:4,
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
      e.stopPropagation();//组织冒泡
      if(state.currentBox){//有移动的系列
        if(state.isKeydown){
          state.isKeydown = false;
          setTimeout(() => {
            if(state.keydownCodeMap[e.code]){
              dispatch(state.keydownCodeMap[e.code]);
            }
            state.isKeydown = true;
          }, 100);
        }
      }
    }
  },
  enter({ state, dispatch }:any){
    state.stop = true;
    ElMessageBox.alert("小憩一会，喝杯咖啡",'俄罗斯方块', {
      confirmButtonText: '继续游戏',
      callback: () => {
        dispatch("run");
      },
    })
  },
  arrowDown({ state }:any){
    if(state.currentBox){//有移动系列
        let list = state.currentBox.list[state.currentBox.state];
        list = list.map((item:Array<number>)=>[item[0] + state.currentBox.x,item[1] + state.currentBox.y + 1]);
        const isGo = has(state,list);
        if(isGo){
          state.currentBox.y++;
          return Promise.resolve();
        }else{
          return Promise.reject();
        }
    }
  },
  arrowLeft({ state }:any){
    if(state.currentBox){//有移动系列
        let list = state.currentBox.list[state.currentBox.state];
        list = list.map((item:Array<number>)=>[item[0] + state.currentBox.x - 1,item[1] + state.currentBox.y]);
        const isGo = has(state,list);
        if(isGo){
          state.currentBox.x--;
        }
    }
  },
  arrowRight({ state }:any){
    if(state.currentBox){//有移动系列
        let list = state.currentBox.list[state.currentBox.state];
        list = list.map((item:Array<number>)=>[item[0] + state.currentBox.x + 1,item[1] + state.currentBox.y]);
        const isGo = has(state,list);
        if(isGo){
          state.currentBox.x++;
        }
    }
  },
  space({ state }:any){
    if(state.currentBox){//有移动系列
        const index = state.currentBox.state > 0 ? state.currentBox.state - 1 : state.currentBox.list.length - 1;
        let list = state.currentBox.list[index];
        list = list.map((item:Array<number>)=>[item[0] + state.currentBox.x,item[1] + state.currentBox.y]);
        const isGo = has(state,list);
        if(isGo){
          state.currentBox.state = index;
        }
    }
  },
}
export default actions;