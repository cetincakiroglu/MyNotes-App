import React, { useContext } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { Drawer, Collapse, Divider, Avatar, CardHeader, ListItem, List, ListItemText, Button, Hidden, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { AuthContext } from './../Context/AuthContext';
import { NoteContext } from './../Context/NoteContext';
import FavoriteIcon from '@material-ui/icons/Favorite';

// conditional & responsive styling


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
                        <Typography variant='caption' align='center'>Made with <FavoriteIcon color='primary' className={classes.icon}/> by ??etin ??ak??ro??lu. </Typography>
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