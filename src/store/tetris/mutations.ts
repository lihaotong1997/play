import random from "@/utils/random";
const mutations = {
    setDifficulty(state:any,value:string){//设置难度
      state.difficulty.active = value;
    },
    setContainer(state:any){//设置画布
      let list = [];
      for(let i = 0; i < state.container.row; i++){
        let arr = [];
        for(let j = 0; j < state.container.column; j++){
          arr.push({
            coor:[ j, i ],//坐标
            type:0,//0空 1移动 2有
          })
        }
        list.push(arr);
      }
      state.container.data = list;
    },
    init(state:any){//初始化数据
      state.crushNums = 0;
      state.time = 0;
      state.currentBox = null;
      state.afterBox = null;
      state.stop = false;
    },
    setCurrentBox(state:any){
      state.currentBox = state.afterBox;
      state.afterBox = null;
    },
    box1(state:any,obj:any){//正方形
      obj.list = [
          [
              [0,0], [0,1], [1,0], [1,1]
          ]
      ];
      obj.state = random(obj.list.length);
      state.afterBox = obj;
    },
    box2(state:any,obj:any){//正方形
      obj.list = [
          [[0,1], [0,2], [1,2], [2,2]],
          [[1,0], [2,0], [1,1], [1,2]],
          [[0,1], [1,1], [2,1], [2,2]],
          [[1,0], [1,1], [1,2], [0,2]],
      ];
      obj.state = random(obj.list.length);
      state.afterBox = obj;
    },
    box3(state:any,obj:any){//正方形
      obj.list = [
        [[2,1], [0,2], [1,2], [2,2]],
        [[0,0], [1,0], [1,1], [1,2]],
        [[0,1], [1,1], [2,1], [0,2]],
        [[1,0], [1,1], [1,2], [2,2]],
      ];
      obj.state = random(obj.list.length);
      state.afterBox = obj;
    },
    box4(state:any,obj:any){//正方形
      obj.list = [
        [[1,1], [0,2], [1,2], [2,2]],
        [[1,0], [1,1], [1,2], [2,1]],
        [[0,1], [1,1], [2,1], [1,2]],
        [[1,0], [1,1], [1,2], [0,1]],
      ];
      obj.state = random(obj.list.length);
      state.afterBox = obj;
    },
    box5(state:any,obj:any){//正方形
      obj.list = [
        [[0,1], [1,1], [1,2], [2,2]],
        [[2,0], [1,1], [2,1], [1,2]],
      ];
      obj.state = random(obj.list.length);
      state.afterBox = obj;
    },
    box6(state:any,obj:any){//正方形
      obj.list = [
        [[0,3], [1,3], [2,3], [3,3]],
        [[1,0], [1,1], [1,2], [1,3]],
      ];
      obj.state = random(obj.list.length);
      state.afterBox = obj;
    },
    box7(state:any,obj:any){//正方形
      obj.list = [
        [[1,1], [2,1], [0,2], [1,2]],
        [[1,0], [1,1], [2,1], [2,2]],
      ];
      obj.state = random(obj.list.length);
      state.afterBox = obj;
    },
    timing(state:any){
      clearTimeout(state.timing);
      state.timing = setInterval(()=>{
        state.time++;
      },1000)
    }
}
export default mutations;