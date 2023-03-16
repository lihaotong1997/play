const state = {
    container:{//容器
        subWidth:40,//子块宽度
        subHeight:40,//子块高度
        row:20,//行数
        column:10,//列数
        data:null,//数据
    },
    difficulty:{//难度相关
        active:"elementary",//当前难度
        options:[//可选难度
            {
                name:"初级",
                label:"elementary",
                timeout:2000,
            },
            {
                name:"中级级",
                label:"intermediate",
                timeout:1000,
            },
            {
                name:"高级",
                label:"advanced",
                timeout:500,
            }
        ]
    },
    crushNums:0,//消除行数
    time:0,//用时
    currentBox:null,//当前快
    afterBox:null,//下一块
    keydownCodeMap:{//需要添加的键盘事件
        Space:"space",
        Enter:"enter",
        ArrowLeft:"arrowLeft",
        ArrowRight:"arrowRight",
        ArrowDown:"arrowDown",
    },
    isKeydown:true,//键盘事件是否可执行
    moveColors:[//移动系列的颜色
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc"
    ],
    emptyColor:"#ffffff",//空的颜色
    noEmptyColor:"#5470c6",//非空颜色
}
export default state;