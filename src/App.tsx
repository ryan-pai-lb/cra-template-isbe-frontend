import { useEffect, useState, FC } from 'react';
import {
  CssBaseline,
  LinearProgress
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import BuildRouter from './router/BuildRouter';
import {BrowserRouter } from 'react-router-dom';
import * as Styles from './styles';
import {IntlProvider} from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from './reducers/global.slice';
import { getGlobal } from './reducers/states';
import globalLocales, {Locales} from './locales/global/index';
import plugins from '@/plugins';

const AppPlugins = plugins['App'];

type AppProps = { 
  config: {
    themeName: string;
    [key:string]:any;
  };
  routes: RoutesType.Route[];
  appLocales:any
}

export const App:FC<AppProps> = (props:AppProps) => {
  const {config, routes, appLocales} = props;
  const dispatch = useDispatch();
  const {locale, startUp} = useSelector(getGlobal);
  const styles:any = Styles;
  const theme = config.themeName ? styles[config.themeName] : styles.defaultTheme;
  const [i8nMessages, setI8nMessages] = useState<Locales>({})

  const initMessage = () => {
    const messages:Locales = {}
    Object.keys(appLocales).forEach((lang:string) => {
      messages[lang] = {
        ...globalLocales[lang].messages,
        ...appLocales[lang].messages
      }
    });

    setI8nMessages(messages)
  }

  useEffect(() => {
    initMessage()
    dispatch(globalActions.startUpRequest());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IntlProvider locale="en"  messages={i8nMessages[locale]}>
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline/>
          {
            startUp.loading &&
            <LinearProgress/>
          }
          {
            startUp.loaded &&
            <BrowserRouter>
              <BuildRouter routes={routes} appConfig={config}/>
              <AppPlugins/>
            </BrowserRouter>
          }
          
        </>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
