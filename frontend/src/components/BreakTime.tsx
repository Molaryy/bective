import { useEffect, useState } from 'react';

const requestNotificationPermission = () => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then((permission: NotificationPermission) => {
      if (permission !== 'granted') {
        console.error('Notification permission not granted.');
      }
    });
  }
};

const sendNotification = () => {
  const [canSendNotification, setCanSendNotification] = useState(true);

  if (Notification.permission === 'granted' && canSendNotification) {
    new Notification('Take a break time');
    setCanSendNotification(false);
  }
};

const BreakTime = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  sendNotification();
  return <></>;
};

export default BreakTime;
