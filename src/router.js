const routers = [
    {
        path: '/',
        meta: {
            title: 'Test'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    }
];
export default routers;