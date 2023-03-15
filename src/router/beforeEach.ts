export default function(to:any,from:any,next:Function){
    if(to.path === "/games/tetris/playing"){//去俄罗斯方块玩的页面
        if(from.path !== "/games/tetris"){
            next("/games/tetris");
        }
    }
    next();
}