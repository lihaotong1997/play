import * as router from "vue-router";
const routes = [
    {
        path: '/',
        redirect:"/games",
        name:"index",
        component:()=>import("@/components/index.vue"),
        children: [
            {
                path: "games",
                name:"games",
                component:()=>import("@/components/games/index.vue"),
                children: [
                    {
                        path:"",
                        name:"defalut",
                        component:()=>import("@/components/games/default.vue"),
                    },
                    {
                        path:"tetris",
                        name:"tetris",
                        component:()=>import("@/components/games/tetris/index.vue"),
                        children:[
                            {
                                path:"",
                                name:"start",
                                component:()=>import("@/components/games/tetris/start.vue"),
                            },
                            {
                                path:"playing",
                                name:"playing",
                                component:()=>import("@/components/games/tetris/play.vue"),
                            },
                            // {
                            //     path:"end",
                            //     name:"end",
                            // },
                        ]
                    },
                ]
            },
            // {
            //     path: "music",
            //     children: [
            //         {
            //             path:"",
            //             name:"default",
            //         },
            //     ]
            // },
            // {
            //     path: "movie",
            //     children: [
            //         {
            //             path:"",
            //             name:"default",
            //         },
            //     ]
            // },
        ]
    },
]
export default router.createRouter({
    history: router.createWebHistory(),
    routes,
})