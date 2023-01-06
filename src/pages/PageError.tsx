import { useEffect } from 'react'; 
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import useRouteNavigate from '@/hooks/useRouteNavigate';
const RouteError = () => {
  let error = useRouteError();
  const navigate = useRouteNavigate();

  useEffect(() => {
    if(isRouteErrorResponse(error)) {
      if(error.status === 401) {
        navigate('/user')
      }
    }
  }, [error]);
  
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;

}

export default RouteError