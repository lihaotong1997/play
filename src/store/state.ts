const state = {
    container:[],//容器数据
    containerOptions:{//容器参数
        width:1200,//宽度
        column:24,//列数
        boxWidth:50,//盒子宽度
        boxHeight:50,//盒子宽度
        difficultyLevelOptions:{//困难等级参数
            elementary:2000, //初级
            intermediate:1000,//中级
            advanced:500,//高级
        },
        difficultyLevel:"elementary",//困难等级
        emptyColor:"#ffffff",//空状态颜色
        nonEmptyColor:"#5470c6",//非空状态颜色
    },
    mobileSeries:null,//当前移动的系列
    playing:false,//是否开始
    typeList:[//系列类型
        "_00011011",
        "_00101112",
        "_02101112",
        "_01101112",
        "_00011112",
        "_10111213",
        "_01021011",
    ],
    color:[//系列颜色
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc"
    ]
}
export default state;