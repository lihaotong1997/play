const getters = {
    number(state:any){
        return state.crushNums * 10;
    },
    times(state:any){
        let h:any = state.time / 60 / 60 % 24;
        h = parseInt(h);
        h = h < 10 ? '0' + h : h;
        let m:any = state.time / 60 % 60
        m = parseInt(m);
        m = m < 10 ? '0' + m : m;
        let s:any = state.time % 60;
        s = parseInt(s);
        s = s < 10 ? '0' + s : s;
        return `${h}时 ${m}分 ${s}秒`;
    }
}
export default getters;