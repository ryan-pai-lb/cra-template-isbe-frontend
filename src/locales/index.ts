import globalLocales, {Locales} from './global/index';
import config from '@/project.config.json';

type Language = {
  locale:string;
  label:string;
  id:number;
  keys:string;
  messages?:any
}

type Languages = {
  [key:string]:Language
}

const ProjectConfig:any = config;
const languages:Languages  =  {}
Object.keys(ProjectConfig.languages).forEach((key:string) => {
  languages[key] = ProjectConfig.languages[key];
  return languages[key] = {
    ...globalLocales[key],
    ...require(`./project/${key}.json`)
  }
});

export default languages;
