
import { useNavigate, useParams, NavigateFunction } from "react-router-dom";

const useRouteNavigate = ():NavigateFunction => {
  const params = useParams();
  const { lang } = params;
  const navigate = useNavigate();
  
  function withLangPathNavigate() {
    const path = arguments[0];
    navigate(lang ? `/${lang}${path}` : path, arguments[1])
  }

  return withLangPathNavigate;
}

export default useRouteNavigate;