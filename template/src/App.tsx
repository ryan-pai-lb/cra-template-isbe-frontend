import { useEffect, useState } from 'react';
import {IntlProvider} from 'react-intl';
import { useSelector } from 'react-redux';
import { getGlobal } from './store/states';

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
  const [i8nMessages, setI8nMessages] = useState<Locales>();

  useEffect(() => {
    const init = () => {
      setI8nMessages(locales)
    }
    init()
  }, []);

  return (
    <IntlProvider locale="en"  messages={(i8nMessages && i8nMessages[locale]) || {}}>
      <>
        <Outlet/>
        <AppPlugins/>
      </>
    </IntlProvider>
  );
}

export default App;
