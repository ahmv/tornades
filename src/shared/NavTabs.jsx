import React, { useEffect, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import '../style/NavTabs.css';
import { Link } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import { withTheme } from '@mui/styles';
import 'typeface-indie-flower';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { useCookies } from "react-cookie";

const NavTabs = ({ history, ...props }) => {
    const { isMobile } = props;
    const [value, setValue] = React.useState(0);
    const [langue, setLangue] = React.useState('fr');
    const { t } = useTranslation('NavTabs');
    const [cookies] = useCookies(["jeton", "user"]);
    console.log("cookiesUser" + cookies.user);
    const theme = useTheme(props.theme);

    useEffect(() => {
        SetTabsValue();
        const uCookies = new Cookies();
        uCookies.set('langue', langue, { path: '/' });
    }, []);

    useEffect(() => history.listen(() => {
        SetTabsValue();
    }), [history.location]);

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
        <Suspense fallback={<div>Loading</div>}>
            <div className={isMobile ? "nav-container nav-container-mobile" : "nav-container"}>
                <Typography variant="button">
                    <Tabs
                        className={isMobile ? "mobile-tabs" : ""}
                        orientation="horizontal"
                        value={value}
                        onChange={(_, newValue) => setValue(newValue)}
                        centered={!isMobile}
                        variant={isMobile ? "scrollable" : "standard"}
                        scrollButtons={false}
                        indicatorColor="secondary"
                        textColor="secondary"
                        style={{ backgroundColor: theme.palette.primary.main, flexGrow: 1 }}
                    >
                        <Tab label={t('Accueil')} component={Link} to={'/'} style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
                        <Tab label={t('Nouvelles')} component={Link} to={'/nouvelles/'} style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
                        <Tab label={t('Inscription')} component={Link} to="/inscription/" style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
                        <Tab label={t('Pratiques')} component={Link} to={'/pratiques/'} style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
                        <Tab label={t('Matchs')} component={Link} to="/matchs/" style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
                        <Tab label={t('Tournoi')} component={Link} to="/tournoi/" style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
                        <Tab label={t('Arenas')} component={Link} to="/arenas/" style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
                        <Tab label={t('Contact')} component={Link} to="/contact/" style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
                        <Tab label={cookies.user} component={Link} to="/connexion/" style={{ fontSize: '1.3rem' }} className={isMobile ? "mobileTab" : "tab"} />
                    </Tabs>
                </Typography>
            </div>
        </Suspense>
    );
}

export default withTheme(withRouter(NavTabs));
