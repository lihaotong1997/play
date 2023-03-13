import random from "@/utils/random";

const actions = {
    /**创建容器
     * @param options 可选参数
     */
    createContainer(content: any, options: any = {}) {
        const height = window.innerHeight - 100;//视口高度 - 上下空余高度
        const row = Math.floor(height / content.state.containerOptions.boxHeight);
        return new Promise((resolve: Function, reject: Function) => {
            if (row >= 10) {//可以开始游戏
                content.state.containerOptions.row = row;//当前行数
                content.commit("setContainer", row);
                resolve(content.state.container);
            } else {
                reject("当前屏幕高度不够游戏使用")
            }
        })
    },
    run(content: any) {//开始游戏
        content.commit("setState",{key:"palying",value:true});//更改当前状态-->进行中
        content.dispatch("crateSeries");
    },
    end(content: any){//游戏结束
        window.onkeydown = null;//取消键盘事件
        content.commit("setState",{key:"palying",value:false});//更改当前状态-->未进行
    },
    async crateSeries(content: any,isFirst:boolean = true) {//创建系列  第几次创建
        if(content.state.palying){//未在进行中
            const type = random(7);//随机生成系列类型
            const seriesName = content.state.typeList[type];//系列生成方法名
            const center = Math.floor(content.state.containerOptions.column / 2);//获取中间坐标
            const series = await content.dispatch(seriesName, center, { root: true });//生成系列
            content.commit("setState",{key:"mobileSeries",value:series});//设置移动的列
            content.dispatch("loop");//开始循环降落
            if(isFirst){//第一次创建系列添加监听
                content.dispatch("addEventListener")//添加监听
            }
        }
    },
    loop(content:any){//循环降落块
        content.dispatch("down","loop").then(()=>{
            setTimeout(() => {
                content.dispatch("loop");
            }, content.state.containerOptions.difficultyLevelOptions[content.state.containerOptions.difficultyLevel]);
        }).catch((list:Array<number>)=>{
            if(list.some((item:number)=>item <= 0)){//到顶了
                content.dispatch("end","游戏失败");
            }else{//下一格位停止 
                content.commit("change");//将当前移动块转换为固定块
                content.commit("removeRow");//检验是否有需要消除的行
                content.dispatch("crateSeries",false);//再生成新的块
            }
        })
    },
    addEventListener(content:any){
        window.onkeydown = (e)=>{
            const map:any = {
                ArrowLeft:() => content.dispatch("left"),
                ArrowRight:() => content.dispatch("right"),
                ArrowDown:() => content.dispatch("down","keydown"),
                Space:() => content.dispatch("rotate"),
            }
            if(map[e.code]){
                map[e.code]();
            }
        }
    },
    left(content:any){//左移
        if(content.state.mobileSeries){//有移动系列
            let list = content.state.mobileSeries.list;
            const min = Math.min(...list.map((item:Array<number>)=>item[1]));
            if(min > 0){
                list = list.map((item:Array<number>)=>{
                    item[1]--;
                    return item;
                })
            }
        }
    },
    right(content:any){//右移
        if(content.state.mobileSeries){//有移动系列
            let list = content.state.mobileSeries.list;
            const max = Math.max(...list.map((item:Array<number>)=>item[1]));
            if(max < content.state.containerOptions.column - 1){
                list = list.map((item:Array<number>)=>{
                    item[1]++;
                    return item;
                })
            }
        }
    },
    down(content:any,type:string){//下落
        if(content.state.mobileSeries){//有移动系列
            let list = content.state.mobileSeries.list;
            const columnList:Array<number> = list.map((item:Array<number>)=>item[1]);//当前块所在列集合
            const rowList:Array<number> = list.map((item:Array<number>)=>item[0] + 1);//当前块所在行下一步集合
            const currentRowList:Array<number> = columnList.map(()=>content.state.containerOptions.row);//当前块所在列已存在块最高的集合
            for(let i = 0; i < content.state.container.length; i++){
                for(let j = 0; j < columnList.length; j++){
                    const column = columnList[j];
                    if(content.state.container[i][column].type === "Non-empty"){//当前有东西
                        currentRowList[j] = i;
                        break;
                    }
                }
            }
            return new Promise((resolve:Function,reject:Function)=>{
                if(rowList.every((item:number,index:number)=>item !== currentRowList[index])){//下一步可以落
                    list = list.map((item:Array<number>)=>{
                        item[0]++;
                        return item;
                    })
                    resolve();
                }else if(type == "loop"){
                    reject(rowList);
                }else if(type == "keydown"){
                    resolve("已经最下了")
                }
            })
        }
    },
    rotate(content:any){//旋转
        if(content.state.mobileSeries){//有移动系列
            let list = content.state.mobileSeries.list;
            const type = content.state.mobileSeries.type;
            if(type !== 0){//0不需要旋转
                content.dispatch(`rotate${type}`);
            }
        }
    },
    rotate1(content:any){

    },
    rotate2(content:any){

    },
    rotate3(content:any){

    },
    rotate4(content:any){

    },
    rotate5(content:any){

    },
    rotate6(content:any){

    },
    //**
    //**
    _00011011(content:any,center:number){
        let list = [
            [-2,0], [-2,1], [-1,0], [-1,1]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 1;
        }
        return {
            type:0,
            list,
            color:content.state.color[random(content.state.color.length)],
        };
    },
    //*
    //***
    _00101112(content:any,center:number){
        let list = [
            [-2,0], [-1,0], [-1,1], [-1,2]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 2;
        }
        return {
            type:1,
            list,
            color:content.state.color[random(content.state.color.length)],
        };
    },
    //  *
    //***
    _02101112(content:any,center:number){
        let list = [
            [-2,2], [-1,0], [-1,1], [-1,2]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 2;
        }
        return {
            type:2,
            list,
            color:content.state.color[random(content.state.color.length)]
        };
    },
    // *
    //***
    _01101112(content:any,center:number){
        let list = [
            [-2,1], [-1,0], [-1,1], [-1,2]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 2;
        }
        return {
            type:3,
            list,
            color:content.state.color[random(content.state.color.length)]
        };
    },
    //** 
    // **
    _00011112(content:any,center:number){
        let list = [
            [-2,0], [-2,1], [-1,1], [-1,2]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 2;
        }
        return {
            type:4,
            list,
            color:content.state.color[random(content.state.color.length)]
        };
    },
    //
    //****
    _10111213(content:any,center:number){
        let list = [
            [-1,0], [-1,1], [-1,2], [-1,3]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 2;
        }
        return {
            type:5,
            list,
            color:content.state.color[random(content.state.color.length)]
        };
    },
    // **
    //**
    _01021011(content:any,center:number){
        let list = [
            [0,1], [0,2], [1,0], [1,1]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 2;
        }
        return {
            type:6,
            list,
            color:content.state.color[random(content.state.color.length)]
        };
    },
}
export default actions;