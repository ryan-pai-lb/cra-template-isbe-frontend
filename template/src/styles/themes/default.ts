import { 
  createTheme
} from '@mui/material/styles';

import { AlertClassKey } from '@mui/material';

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    default: string;
    paper: string;
    surface:string;
    onSurface: string;
    top: string;
  }
  interface TypeText {
    darkPrimary1: string;
    darkPrimary2: string;
    darkPrimary3: string;
    darkPrimary4: string;
    lightPrimary1: string;
    lightPrimary2: string;
    lightPrimary3: string;
    lightPrimary4: string;
    gary1:string;
    gary2:string;
    gary3:string;
    gary4:string;
    gary5:string;
    gary6:string;
    gary7:string;
    gary8:string;
    gary9:string;
    gary10:string;
  }
  interface Palette {
    default: Palette['primary'];
    border: Palette['primary'];
    background: Palette['background'],
    text: Palette['text']
  }
  interface PaletteOptions {
    default?: PaletteOptions['primary'];
    border?: PaletteOptions['primary'];
    background?: Partial<TypeBackground>,
    text?:Partial<TypeText>
  }
}

declare module '@mui/material/styles/overrides' {
  export interface ComponentNameToClassKey {
    MuiAlert: AlertClassKey;
  }
}


export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#ff8600',
      light: '#ffc451',
      dark: '#be6500',
      contrastText: '#fff'
    },
    secondary: {
      main: '#4b546a',
      light: '#D9D9D9',
      dark: '#383838',
      contrastText: '#fff'
    },
    default: {
      main: '#fff',
      contrastText: '#fff'
    },
    success: {
      main: '#4caf50'
    },
    warning: {
      main: '#F8BC44'
    },
    error: {
      main: '#ED5454'
    },
    info: {
      main: '#2D62F2'
    },
    divider: '#4b546a',
    border: {
      main: '#4b546a',
      light: '#60c2ff',
      dark: '#62657b'
    }
  }
});

export default defaultTheme;