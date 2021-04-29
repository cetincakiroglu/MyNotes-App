import Home from './../Home/Home';
import Info from './../Info/Info';
import Notes from './../Notes/Notes';
import Tasks from './../Tasks/Tasks';
import Reminders from './../Reminders/Reminders';
import NewNote from './../Notes/NewNote';
import Signup from './../Auth/Signup';
import Login from './../Auth/Login';
import ResetPassword from './../Auth/ResetPassword'

const links = [
    
    {
        link:'/',
        title:'Home',
        component:Home,
        isExact: true,
        isLink: false,
        isPrivate: true
    },
    {
        link:'/Notes',
        title: 'Notes',
        component: Notes,
        isExact: true,
        isLink: true,
        isPrivate: true
    },
    {
        link:'/Tasks',
        title: 'Tasks',
        component: Tasks,
        isExact: true,
        isLink: true,
        isPrivate: true
    },
    {
        link:'/Reminders',
        title: 'Reminders',
        component: Reminders,
        isExact: true,
        isLink: true,
        isPrivate: true
    },
    {
        link:'/Info',
        title: 'Info',
        component: Info,
        isExact: true,
        isLink: true,
        isPrivate: false
    },
    {
        link:'/New/:id',
        title:'New Note',
        component: NewNote,
        isExact:true,
        isLink:false,
        isPrivate: true
    }
];

export default links


