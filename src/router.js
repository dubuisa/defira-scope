import Vue from "vue"
import VueRouter from "vue-router"
import TokenSupply from '@/components/tokenSupply/TokenSupply.vue'
import Farm from '@/components/farm/Farm.vue'
import About from '@/components/about/About.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/tokenSupply',
        meta:{
            title : 'Defira-Scope'
        }
    },
    {
        path: '/tokenSupply',
        name: 'TokenSupply',
        component: TokenSupply
    },
    {
        path: '/farm',
        name: 'Farm',
        component: Farm
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    const title = to.meta.title === undefined ? 'Defira-Scope' : to.meta.title;
    Vue.nextTick(() => {
      document.title = title;
    });
  });

export default router;