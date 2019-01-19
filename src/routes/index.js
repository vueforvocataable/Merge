import TextFieldPage from '../components/textfield_page/TextFieldPage.vue';
import TablePage from '../components/table_page/TablePage.vue';
import HelpPage from '../components/help_page/HelpPage.vue'; 
import PageNotFound from '../components/PageNotFound.vue';

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
    {
        path: '*',
        name: 'pageNotFound',
        component: PageNotFound
    }
]
