const actions = {
    //**
    //**
    _00011011(content:any,center:number){
        let list = [
            [0,0], [0,1], [1,0], [1,1]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 1;
        }
        return list;
    },
    //*
    //***
    _00101112(content:any,center:number){
        let list = [
            [0,0], [1,0], [1,1], [1,2]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 2;
        }
        return list;
    },
    //  *
    //***
    _02101112(content:any,center:number){
        let list = [
            [0,2], [1,0], [1,1], [1,2]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 2;
        }
        return list;
    },
    // *
    //***
    _01101112(content:any,center:number){
        let list = [
            [0,1], [1,0], [1,1], [1,2]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 2;
        }
        return list;
    },
    //** 
    // **
    _00011112(content:any,center:number){
        let list = [
            [0,0], [0,1], [1,1], [1,2]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 2;
        }
        return list;
    },
    //
    //****
    _10111213(content:any,center:number){
        let list = [
            [1,0], [1,1], [1,2], [1,3]
        ];
        for(let i = 0; i < list.length; i++){
            list[i][1] += center - 2;
        }
        return list;
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
        return list;
    },
}
export default actions;