import Vue from 'vue';
import Router from 'vue-router';
import ExpensePage from './views/ExpensePage.vue';
import ExpenseInsertPage from './views/ExpenseInsertPage.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'expense-list',
            component: ExpensePage,
        },
        {
            path: '/insert',
            name: 'expense-insert',
            component: ExpenseInsertPage,
        },
    ],
});
