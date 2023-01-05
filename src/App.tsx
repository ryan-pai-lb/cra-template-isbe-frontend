import { useEffect, useState, FC } from 'react';
import {
  CssBaseline,
  LinearProgress
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import * as Styles from './styles';
import {IntlProvider} from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from './reducers/global.slice';
import { getGlobal } from './reducers/states';
import ProjectConfig from './project.config.json';
import { Locales } from './locales/global/index';
import plugins from '@/plugins';
import {Outlet } from 'react-router-dom';
import locales from './locales';

export const App = () => {
  // const dispatch = useDispatch();
  const {locale} = useSelector(getGlobal);
  const styles:any = Styles;
  const theme = ProjectConfig.themeName ? styles[ProjectConfig.themeName] : styles.defaultTheme;
  const [i8nMessages, setI8nMessages] = useState<Locales>();
  const AppPlugins = plugins['App'];

  useEffect(() => {
    const init = () => {
      setI8nMessages(locales)
    }
    init()
  }, []);

  return (
    <IntlProvider locale="en"  messages={i8nMessages && i8nMessages[locale] || {}}>
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline/>
          <>
            <Outlet/>
            <AppPlugins/>
          </>
        </>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
