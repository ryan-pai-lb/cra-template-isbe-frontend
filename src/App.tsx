import { useEffect, useState } from 'react';
import {
  CssBaseline
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import * as Styles from './styles';
import {IntlProvider} from 'react-intl';
import { useSelector } from 'react-redux';
import { getGlobal } from './reducers/states';
import ProjectConfig from './project.config.json';
import { Locales } from './locales/global/index';
import AppPlugins from '@/components/AppPlugins';
import {Outlet, Params } from 'react-router-dom';
import locales from './locales';
import { EnhancedStore } from '@reduxjs/toolkit';

export const appLoader = async({store, request, params}:{store:EnhancedStore, request:Request, params:Params}) => {
  return null;
}

export const App = () => {
  const {locale} = useSelector(getGlobal);
  const styles:any = Styles;
  const theme = ProjectConfig.themeName ? styles[ProjectConfig.themeName] : styles.defaultTheme;
  const [i8nMessages, setI8nMessages] = useState<Locales>();

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
          <Outlet/>
          <AppPlugins/>
        </>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
