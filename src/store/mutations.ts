const mutations = {
    setContainer(state:any,row:number){
        const list = [];
        for(let i = 0; i < state.containerOptions.column; i++){
            let columnList = [];
            for(let j = 0; j < row; j++){
                columnList.push({});
            }
            list.push(columnList);
        }
        state.container = list;
    },
    setMobileSeries(state:any,options:any){
        const map:any = {
            center:(list:Array<number>)=>list,
            left:(list:Array<any>)=>{
                const min = Math.min(...list.map((item:Array<number>)=>item[1]));
                if(min <= 0){
                    return list;
                }else {
                    return list.map((item:Array<number>)=>{
                        item[1]--;
                        return item;
                    })
                }
            },
            right:(list:Array<any>)=>{
                const max = Math.max(...list.map((item:Array<number>)=>item[1]));
                if(max >= state.containerOptions.column - 1){
                    return list;
                }else {
                    return list.map((item:Array<number>)=>{
                        item[1]++;
                        return item;
                    })
                }
            },
            bottom:(list:Array<any>)=>{//要判断是否结束
                
            }
        }
        const moveTo = map[options.moveTo];
        let list = [];
        for(let i = 0; i < options.data.length;i++){

        }
        state.mobileSeries = map[options.moveTo](options.data);
    }
}
export default mutations;