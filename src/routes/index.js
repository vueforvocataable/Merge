import TextFieldPage from '../components/TextFieldPage.vue';
import TablePage from '../components/TablePage.vue';

export default [
    {
        path: '/textfield',
        name: 'TextField',
        component: TextFieldPage
    },
    {
        path: '/table',
        name: 'Table',
        component: TablePage,
        props: true
    },
]
