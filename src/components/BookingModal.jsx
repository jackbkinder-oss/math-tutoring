import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

const CAL_USERNAME = 'jackkinder';

export const openCalBooking = (eventSlug) => {
  getCalApi().then((cal) => {
    cal('ui', {
      theme: 'light',
      cssVarsPerTheme: {
        light: {
          'cal-brand': '#5A4228',
          'cal-text': '#5A4228',
          'cal-text-emphasis': '#5A4228',
        },
      },
    });
    cal('modal', {
      calLink: `${CAL_USERNAME}/${eventSlug}`,
      config: { layout: 'month_view' },
    });
  });
};

const CalEmbed = () => {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: {
            'cal-brand': '#5A4228',
            'cal-text': '#5A4228',
            'cal-text-emphasis': '#5A4228',
          },
        },
      });
    })();
  }, []);

  return null;
};

export default CalEmbed;
