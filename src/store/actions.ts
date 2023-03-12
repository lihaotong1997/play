const actions = {
    /**创建容器
     * @param options 可选参数
     */
    createContainer(content: any, options: any = {}) {
        const height = window.innerHeight - 100;//视口高度 - 上下空余高度
        const row = Math.floor(height / content.state.containerOptions.boxHeight);
        return new Promise((resolve: Function, reject: Function) => {
            if (row >= 10) {//可以开始游戏
                content.commit("setContainer", row);
                resolve(content.state.container);
            } else {
                reject("当前屏幕高度不够游戏使用")
            }
        })
    },
    run(content: any) {//开始游戏
        content.dispatch("crateSeries");
    },
    async crateSeries(content: any) {
        const type = Math.floor(Math.random() * 7);//随机生成系列类型
        const seriesName = content.rootState.series.typeList[type];//系列生成方法名
        console.log(content.state.containerOptions.column)
        const center = Math.floor(content.state.containerOptions.column / 2);//获取中间坐标
        const series = await content.dispatch(`series/${seriesName}`, center, { root: true });//生成系列
        content.commit("setMobileSeries",{//设置移动系列
            data:series,
            moveTo:"center",
        });
    }
}
export default actions;