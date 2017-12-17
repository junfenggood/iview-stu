const routers = [
    {
        path: '/',
        meta: {
            title: 'Test'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/lun',
        component: (resolve) => require(['./components/createLun.vue'])
    }
];
export default routers;