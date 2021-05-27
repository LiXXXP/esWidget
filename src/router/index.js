import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* 引入公共方法 */
import { BASE_PATH } from '@/scripts/config'


/* 异步引入路由 */

const routes = [
    {
        path: '/',
        name: 'index',
        meta: {
            title: 'screen',
        },
        component: () => import('@/components/index')
    },
    {
        path: '/new',
        name: 'indexnew',
        meta: {
            title: 'screen',
        },
        component: () => import('@/components/indexNew')
    },
    {
        path: '/stream',
        name: 'stream',
        meta: {
            title: 'stream',
        },
        component: () => import('@/components/streams/stream.vue')
    },
    {
        path: '/teaminfo',
        name: 'teamInfo',
        meta: {
            title: 'team',
        },
        component: () => import('@/components/team/teamInfo.vue')
    },
    {
        path: '/new/diff',
        name: 'diff',
        meta: {
            title: '经济差',
        },
        component: () => import('@/components/news/playDiff.vue')
    },
    {
        path: '/new/player',
        name: 'player',
        meta: {
            title: '选手',
        },
        component: () => import('@/components/news/playerData.vue')
    },
    {
        path: '/new/rank',
        name: 'rank',
        meta: {
            title: '数据排行',
        },
        component: () => import('@/components/news/playRank.vue')
    },
    {
        path: '/new/process',
        name: 'process',
        meta: {
            title: '赛事进程',
        },
        component: () => import('@/components/news/process.vue')
    },
]

const router = new Router({
	mode: 'hash',
	base: BASE_PATH,
    routes: routes
})

// router.beforeEach((to, from, next) => {

// })

export default router
