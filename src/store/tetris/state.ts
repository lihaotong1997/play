const state = {
    container:{//容器
        subWidth:30,//子块宽度
        subHeight:30,//子块高度
        row:20,//行数
        column:10,//列数
        data:null,//数据
    },
    difficulty:{//难度相关
        active:"elementary",//当前难度
        options:[//可选难度
            {
                name:"初级",
                label:"elementary"
            },
            {
                name:"中级级",
                label:"intermediate"
            },
            {
                name:"高级",
                label:"advanced"
            }
        ]
    }
}
export default state;