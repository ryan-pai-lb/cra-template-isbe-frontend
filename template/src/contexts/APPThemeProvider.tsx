import { ThemeProvider } from '@mui/material/styles';
import * as Styles from '@/themes';
import ProjectConfig from '../project.config.json';

interface Props {
  children?: React.ReactNode
}
const styles:any = Styles;
const theme = ProjectConfig.themeName ? styles[ProjectConfig.themeName] : styles.defaultTheme;

const APPThemeProvider = (props: Props) => {
  const { children } = props;
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
export default APPThemeProvider