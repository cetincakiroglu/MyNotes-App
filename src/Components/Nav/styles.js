import {makeStyles} from '@material-ui/core/styles'
const drawerWidth = 230;
export const useStyles = makeStyles(theme => ({
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