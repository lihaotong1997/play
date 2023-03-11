import * as router from "vue-router";
const routes = [
    {
        path: '/',
        name:"home",
        component: ()=>import("@/components/index.vue"),
        meta:{
            needHeader:true,
        },
    },
]
export default router.createRouter({
    history: router.createWebHistory(),
    routes,
})