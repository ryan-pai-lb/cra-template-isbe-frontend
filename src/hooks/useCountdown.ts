import { useEffect, useState, useRef } from 'react';
import moment from "moment";
import "moment-timezone";

export interface CountdownOptions {
  timezone: string;
  serverTime: number | string;
  currentTime:number | string;
}


const useCountdown = ():[number, (options:CountdownOptions)=> void] => {
  const [countdownTimestamp, setCountdownTimestamp] = useState(0);
  const countdownRef: { current: NodeJS.Timeout | null } = useRef(null);

  const initialCountdown = (options: CountdownOptions) => {
    const { currentTime, serverTime, timezone} = options;
    const serverTimestamp= moment.tz(serverTime, timezone);
    const diffTimestamp = moment.tz(currentTime, timezone).diff(moment(serverTimestamp));

    let timestamp = diffTimestamp <= 0 ? 0 : diffTimestamp;
    setCountdownTimestamp(timestamp);
    clearInterval(countdownRef.current as NodeJS.Timeout);

    countdownRef.current = setInterval(() => {
      timestamp = timestamp <= 1000 ? 0 : timestamp - 1000;
      if (!timestamp) {
        clearInterval(countdownRef.current as NodeJS.Timeout);
      }
      setCountdownTimestamp(timestamp);
    }, 1000);
  }

  useEffect(() => {
    return () => {
      clearInterval(countdownRef.current as NodeJS.Timeout);
    }
  }, [])

  return [countdownTimestamp, initialCountdown]
}

export default useCountdown;