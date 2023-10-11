import i18n from '/@/i18n';
import { toHours, toKm } from '/@/utils';
import { addColumns } from './utils';
import type { Route } from '/@/types';

const WAYPOINT_COLUMNS = 2;

const STYLES = {
  h1: { color: '#000', fontSize: 30, bold: true, margin: [0, 5, 0, 10] },
  h3: { color: '#888', fontSize: 9, margin: [0, 10, 0, 0] },
  metric: { color: '#000', fontSize: 14 },
  SIMPLE: { color: '#c7df8b', fontSize: 10 },
  CHALLENGING: { color: '#3681b6', fontSize: 10 },
  COMPLEX: { color: '#434343', fontSize: 10 },
};

export default (route: Route) => {
  const { t } = i18n.global;

  return {
    pageSize: 'a4',
    pageMargins: [70, 70, 70, 70],
    styles: STYLES,
    images: route.waypoints.reduce((acc, { id, image }) => ({ ...acc, [id]: image }), {}),
    content: [
      // Title
      { text: t(`grade.${route.grade}`), style: route.grade },
      { text: route.name, style: 'h1' },

      { // Route stats
        layout: 'noBorders',
        margin: [0, 10, 0, 10],
        table: {
          widths: ['*', '*', '*', '*'],
          body: [
            [
              { style: 'h3', text: t('route.fields.duration') },
              { style: 'h3', text: t('route.fields.distance') },
              { style: 'h3', text: t('route.fields.drop') },
              { style: 'h3', text: t('route.fields.orientation') },
            ],
            [
              { style: 'metric', text: toHours(route.duration) },
              { style: 'metric', text: toKm(route.distance) },
              { style: 'metric', text: `${route.verticalDrop}m` },
              { style: 'metric', text: route.orientation.join(', ') },
            ],
          ],
        },
      },

      // Route description
      { text: route.description, margin: [0, 20, 0, 20] },

      { // Waypoint cards
        layout: {
          hLineColor: () => '#fff',
          hLineWidth: () => 5,
          vLineColor: () => '#fff',
          vLineWidth: () => 5,
        },
        table: addColumns(WAYPOINT_COLUMNS, waypoint => {
          const fillColor = waypoint.kind === 'ALERT' ? '#feefb3' : '#fff';
          const color = waypoint.kind === 'ALERT' ? '#9f6000' : '#000';
          const stack = [
            { image: String(waypoint.id), margin: [5, 7, 5, 2], width: 210 }, // TODO Set auto image width
            { text: waypoint.description || waypoint.name, fontSize: 10, margin: [5, 5, 5, 5] },
          ];
          return { fillColor, color, stack };
        }, route.waypoints),
      },
    ],

    // Footer copyright
    footer: () => ({
      text: '© 2023 Andorra Recerca + Innovació. Tots els drets reservats.',
      alignment: 'center',
      fontSize: 7,
      absolutePosition: { x: 0, y: 25 },
    }),
  };
};
