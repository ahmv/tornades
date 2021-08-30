import React, { useEffect, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import '../style/NavTabs.css';
import { Link } from "react-router-dom";
import { makeStyles, useStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { fontFamily } from '@material-ui/system';
import Accueil from '../components/Accueil'
import Informations from '../components/Informations'
import { useTheme } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import 'typeface-indie-flower';
//import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap');
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { useCookies } from "react-cookie";


    //const styleTabs={
     //   backgroundColor:'#000000',
      //  color:theme.palette.primary.main,

    //}//

const tabProps={textColor:"primary"}

const NavTabs = ({ history, ...props }) => {
    const { isMobile } = props;
    //const classes = useStyles(props.theme);
    const [value, setValue] = React.useState(0);
    const [langue, setLangue] = React.useState('en');
    const { t, i18n } = useTranslation('NavTabs');
    const [cookies, setCookie] = useCookies(["jeton","user"]);
    console.log("cookiesUser"+cookies.user);
    const theme = useTheme(props.theme);
    useEffect(() => {
        SetTabsValue();
        const uCookies = new Cookies();
        uCookies.set('langue', langue, { path: '/' });
    }, []);

    useEffect(() => history.listen(() => {
        SetTabsValue();
    }), [history.location]);

    const useStyles = makeStyles({
        root: {
            backgroundColor:'#000000',
            color:theme.palette.primary.main,
        },
        media: {
     
        },

      });

    function SetTabsValue() {
        const path = history.location.pathname.substring(1, history.location.pathname.indexOf('/', 1));
        
        switch (path) {
            case 'accueil':
                setValue(0);
                break;
            case 'nouvelles':
                setValue(1);
                break;
            case 'inscription':
                    setValue(2);
                    break;    
            case 'pratiques':
                setValue(3);
                break;
            case 'matchs':
                setValue(4);
                break;
            case 'tournoi':
                setValue(5);
                break;
            case 'arenas':
                setValue(6);
                break;
            case 'informations':
                setValue(7);
                break;
            case 'contact':
                    setValue(8);
                    break;
            default:
        }
    }

    return (
        /*<ThemeProvider theme={theme}>*/
        <Suspense fallback={<div>Loading</div>}>
        <div>
             <Typography variant="button" >

        <Tabs
            className={isMobile ? "": ""}
            orientation={isMobile ? "horizontal" : "horizontal"}
            value={value}
            onChange={(e) => setValue(e)}
            // variant="scrollable"
            //style={useStyles.styleTabs}
          
            centered={isMobile ? false : true}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons="auto"
            indicatorColor="secondary"//{theme.palette.secondary.main}
            textColor="secondary"//{theme.palette.primary.main}
            
        >
            <Tab  label={t('Accueil')} component={Link} to={ "/"} style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
            <Tab  label={t('Nouvelles')} component={Link} to={ "/nouvelles/"}  style={{ fontSize: '1.3rem' }}  className={isMobile ? "mobileTab" : "tab"} />
            <Tab label={t('Inscription')} component={Link} to="/inscription/" style={{ fontSize: '1.3rem' }}  className={isMobile ? "mobileTab" : "tab"}/>
            <Tab label={t('Pratiques')} component={Link} to={"/pratiques/"}  style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
            <Tab label={t('Matchs')} component={Link} to="/matchs/"  style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
            <Tab label={t('Tournoi')} component={Link} to="/tournoi/"  style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
            <Tab label={t('Arenas')} component={Link} to="/arenas/"  style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
            <Tab label={t('Contact')} component={Link} to="/contact/"  style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
            <Tab label={cookies.user} component={Link} to="/connexion/" style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />

        </Tabs>
       
        </Typography>
        </div>
        </Suspense>
    );
}

export default  withTheme(withRouter(NavTabs))