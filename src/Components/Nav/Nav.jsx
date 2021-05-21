import React, { useContext } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { Drawer, Collapse, Divider, Avatar, CardHeader, ListItem, List, ListItemText, Button, Hidden, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from './../Context/AuthContext';
import { NoteContext } from './../Context/NoteContext';
import FavoriteIcon from '@material-ui/icons/Favorite';

// conditional & responsive styling
const drawerWidth = 230;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
          }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    nested:{
        paddingLeft:'10px'
    },
    listItem:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start'
    },
    list:{
        height:'75%'
    },
    buttonContainer:{
        margin:'auto'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none'
        }
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth
        }
      },
    icon:{
        width:'18px',
        height:'18px',
        verticalAlign:'text-bottom'
    }
}))

function Nav() {
    const classes = useStyles();
    const history = useHistory();
    const {mobileOpen, setMobileOpen} = useContext(NoteContext)
    const { logout, setError, currentUser } = useContext(AuthContext);
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
      }

    const navList = [
        {
            title: 'Home',
            onClick: () => history.push('/')
        },
        {
            title: 'Notes',
            onClick: () => history.push('/Notes')
        },
        {
            title: 'Tasks',
            onClick: () => history.push('/Tasks')
        },
        {
            title: 'Events',
            onClick: () => history.push('/Events')
        },
        {
            title: 'Info',
            onClick: () => history.push('/Info')
        }
    ]

    const handleLogOut = async () => {
        try{
            await logout();
            history.push('/Login')
        }catch(err){
            console.log(err);
            setError('Failed to log out')
        }
    }

    const menu = (
        <List className={classes.list}>
        {navList.map((item,index) => {
            const {title, onClick} = item;
            return(
                <ListItem className={classes.listItem} button key={index} onClick={onClick} >
                    <ListItemText secondary={title} />
                    <Collapse in={true}  timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        </List>
                    </Collapse>
                </ListItem>
            )
        })}
        </List>
    )

    return (
        <>
        <Hidden smUp implementation='css'>
            <Drawer
            className={classes.drawer} 
            classes={{ paper:classes.drawerPaper }} 
            modalProps={{ keepMounted: true }} 
            variant='temporary'
            anchor='left' 
            open={mobileOpen} 
            onClose={handleDrawerToggle}
            >
                <CardHeader avatar={ <Avatar src={currentUser ? currentUser.photoURL : null} aria-label="recipe">
                    R
                    </Avatar>
                    }
                    title={currentUser.displayName ? currentUser.displayName : currentUser.email.split('@')[0]}
            
                    />
                    <Divider />
                        {menu}
                    <Divider />
                    <div className={classes.buttonContainer}>
                        <Button onClick={handleLogOut} variant='outlined' color='secondary' fullWidth={true}>Log out</Button> 
                    </div>
            </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
            <Drawer
                className={classes.drawer} 
                classes={{ paper:classes.drawerPaper }} 
                variant='permanent'
                anchor='left' 
                open
                >
                    <CardHeader avatar={ <Avatar src={currentUser.photoURL ? currentUser.photoURL : null} aria-label="recipe">
                        R
                        </Avatar>
                        }
                        title={currentUser.displayName ? currentUser.displayName : currentUser.email.split('@')[0]}
                
                        />
                        <Divider />
                            {menu}
                        <Typography variant='caption' align='center'>Made with <FavoriteIcon color='primary' className={classes.icon}/> by Çetin Çakıroğlu. </Typography>
                        <Divider />
                        <div className={classes.buttonContainer}>
                            <Button onClick={handleLogOut} variant='outlined' color='secondary' fullWidth={true}>Log out</Button> 
                        </div>
                </Drawer>
          </Hidden>
        </>
    )
}


export default withRouter(Nav)