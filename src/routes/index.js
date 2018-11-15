import TextFieldPage from '../components/TextFieldPage.vue';
import TablePage from '../components/TablePage.vue';
import Explanation from '../components/Explanation.vue';

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
    {
        path: '/explanation',
        name: 'Explanation',
        component: Explanation
    }
]
