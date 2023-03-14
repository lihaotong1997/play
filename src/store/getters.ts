const getters = {
    container(state:any,getters:any){
        let container = JSON.parse(JSON.stringify(state.container));
        return container.map((item1:Array<any>,index1:number)=>{
            return item1.map((item2:any,index2:number)=>{
                if(getters.mobileSeries){//有正在移动的块
                    if(getters.mobileSeries.list.some((item:Array<any>)=>item[1] === index1 && item[0] === index2 )){
                        item2.type = "move";
                        item2.color = getters.mobileSeries.color;
                    }
                }
                return item2;
            })
        });
    },
    mobileSeries(state:any){
        if(state.mobileSeries){//存在系列
            let list = state.mobileSeries.list[state.mobileSeries.state].map((item:Array<number>)=>{
                return [
                    item[0] + state.mobileSeries.x,
                    item[1] + state.mobileSeries.y
                ];
            })
            return {
                list,
                color:state.mobileSeries.color,
            }
        }
    }
}
export default getters;