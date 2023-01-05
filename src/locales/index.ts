import globalLocales, {Locales} from './global/index';
import ProjectConfig from '@/project.config.json';

type ProjectConfigJSON = typeof ProjectConfig;
export interface ProjectConfigJSONExtends extends Omit<ProjectConfigJSON, 'languages'> {
  languages: {
    [key:string]:Language
  }
  
}
type Language = {
  locale:string;
  label:string;
  id:number;
  keys:string;
  messages?:any
}

type messages = {
  [key:string]:string
}

const projectConfig:ProjectConfigJSONExtends = ProjectConfig;
export const languages = projectConfig.languages

const i18nMessages:messages  =  {}
Object.keys(projectConfig.languages).forEach((key:string) => {
  return i18nMessages[key] = {
    ...globalLocales[key],
    ...require(`./project/${key}.json`)
  }
});

export default i18nMessages;
