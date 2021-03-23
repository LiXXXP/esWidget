import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* 引入公共方法 */
import { BASE_PATH } from '@/scripts/config'


/* 异步引入路由 */
const Index =() => import('@/components/index')
const IndexNew =() => import('@/components/indexNew')
const Stream =() => import('@/components/streams/stream.vue')
const Team =() => import('@/components/team/teamInfo.vue')

const routes = [
    {
        path: '/',
        name: 'index',
        meta: {
            title: 'screen',
        },
        component: Index
    },
    {
        path: '/new',
        name: 'indexnew',
        meta: {
            title: 'screen',
        },
        component: IndexNew
    },
    {
        path: '/stream',
        name: 'stream',
        meta: {
            title: 'stream',
        },
        component: Stream
    },
    {
        path: '/teaminfo',
        name: 'teamInfo',
        meta: {
            title: 'team',
        },
        component: Team
    }
]

const router = new Router({
	mode: 'hash',
	base: BASE_PATH,
    routes: routes
})

// router.beforeEach((to, from, next) => {

// })

export default router
