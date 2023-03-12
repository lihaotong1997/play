const getters = {
    container(state:any){
        return state.container.map((item1:Array<any>,index1:number)=>{
            return item1.map((item2:Array<number>,index2:number)=>{
                const obj = {
                    type:"empty",//empty 空 move移动的块 Non-empty非空
                }
                if(state.mobileSeries){//有正在移动的块
                    if(state.mobileSeries.some((item:Array<any>)=>item[0] === index1 && item[1] === index2 )){
                        obj.type = "move";
                    }
                }
                return obj;
            })
        });
    }
}
export default getters;