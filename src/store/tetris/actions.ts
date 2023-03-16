import random from "@/utils/random";
import { ElMessageBox } from "element-plus";
const has = (data:any,list:any)=>{
  return data.every((item1:any)=>item1.every((item2:any)=>list.every((item3:any)=>{
    if(item3[0] === item2.coor[0] && item3[1] === item2.coor[1]){
      if(item3.type === 2){
        return false;
      }
    }
    return true;
  })))
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
        setTimeout(() => {
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
  end({ state }:any){//游戏结束
    state.stop = false;
    window.onkeydown = null;//清除键盘事件
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
        const isGo = list.every((item:any)=>item[1] < state.container.row) && has(state.container.data,list);
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
        const isGo = list.every((item:any)=>item[0] >= 0) && has(state.container.data,list);
        if(isGo){
          state.currentBox.x--;
        }
    }
  },
  arrowRight({ state }:any){
    if(state.currentBox){//有移动系列
        let list = state.currentBox.list[state.currentBox.state];
        list = list.map((item:Array<number>)=>[item[0] + state.currentBox.x + 1,item[1] + state.currentBox.y]);
        const isGo = list.every((item:any)=>item[0] < state.container.column) && has(state.container.data,list);
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
        const isGo = has(state.container.data,list);
        if(isGo){
          state.currentBox.state = index;
        }
    }
  },
}
export default actions;