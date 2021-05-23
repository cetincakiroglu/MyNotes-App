import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
    paper:{
        position:'relative',
        height:'100vh',
        width:'100%',
        borderRadius:'0',
        overflowX:'hidden',
        overflowY:'scroll',
        scrollbarWidth:'none'
      },
      widgetWrapper:{
        padding:'50px'
      },
      header:{
        margin:'20px 50px',
      },
      alert:{
        position:'absolute',
        width:'100%'
      },
      date:{
        opacity:'0.1',
        marginRight:'50px'
      },
      icon:{
        position:'sticky',
        top:'10px'
      }
})

