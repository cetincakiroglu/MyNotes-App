import Login from './../Login/Login';
import Home from './../Home/Home';
import Info from './../Info/Info';
import Notes from './../Notes/Notes';
import Tasks from './../Tasks/Tasks';
import Reminders from './../Reminders/Reminders';
import NewNote from './../Notes/NewNote';

const isAuth = JSON.parse(localStorage.getItem('userInfo')) ? Home : Login;

const links = [
    {
        link:'/',
        title: isAuth ? 'Home' : 'Login',
        component: isAuth,
        isExact: true,
        isLink: false
    },
    {
        link:'/Home',
        title:'Home',
        component:Home,
        isExact: true,
        isLink: false,
    },
    {
        link:'/Notes',
        title: 'Notes',
        component: Notes,
        isExact: true,
        isLink: true
    },
    {
        link:'/Tasks',
        title: 'Tasks',
        component: Tasks,
        isExact: true,
        isLink: true
    },
    {
        link:'/Reminders',
        title: 'Reminders',
        component: Reminders,
        isExact: true,
        isLink: true
    },
    {
        link:'/Info',
        title: 'Info',
        component: Info,
        isExact: true,
        isLink: true
    },
    {
        link:'/New/:id',
        title:'New Note',
        component: NewNote,
        isExact:true,
        isLink:false
    }
];

export default links