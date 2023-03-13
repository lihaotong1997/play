const getters = {
    container(state:any){
        let container = JSON.parse(JSON.stringify(state.container));
        return container.map((item1:Array<any>,index1:number)=>{
            return item1.map((item2:any,index2:number)=>{
                if(state.mobileSeries){//有正在移动的块
                    if(state.mobileSeries.list.some((item:Array<any>)=>item[0] === index1 && item[1] === index2 )){
                        item2.type = "move";
                        item2.color = state.mobileSeries.color;
                    }
                }
                return item2;
            })
        });
    }
}
export default getters;