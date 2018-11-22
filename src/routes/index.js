import TextFieldPage from '../components/TextFieldPage.vue';
import TablePage from '../components/TablePage.vue';
import HelpPage from '../components/HelpPage.vue'; 

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
        path: '/help',
        name: 'help',
        component: HelpPage
    },
]
