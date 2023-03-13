const mutations = {
    setState(state:any,options:any){
        state[options.key] = options.value;
    },
    setContainer(state:any,row:number){
        const list = [];
        for(let i = 0; i < row; i++){
            let columnList = [];
            for(let j = 0; j < state.containerOptions.column; j++){
                columnList.push({
                    type:"empty",//empty 空 move移动的块 Non-empty非空
                    color:state.containerOptions.emptyColor,
                });
            }
            list.push(columnList);
        }
        state.container = list;
    },
    change(state:any){//移动的块转换为固定块
        for(let i = 0; i < state.mobileSeries.list.length; i++){
            state.container[state.mobileSeries.list[i][0]][state.mobileSeries.list[i][1]].type = "Non-empty";
            state.container[state.mobileSeries.list[i][0]][state.mobileSeries.list[i][1]].color = state.containerOptions.nonEmptyColor;
        }
        state.mobileSeries = null;//清空移动系列
    },
    removeRow(state:any){//检测是否有要删除的行
        for(let i = 0; i < state.container.length; i++){
            if(state.container[i].every((item:any)=>item.type === "Non-empty")){//存在需要消除的列
                state.container.unshift(state.container.splice(i,1)[0].map((item:any)=>{
                    item.type = "empty";
                    item.color = state.emptyColor;
                    return item;
                }));
            }
        }
    }
}
export default mutations;