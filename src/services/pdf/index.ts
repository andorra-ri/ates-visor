import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import templates from './templates';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

type Templates = {
  [K in keyof typeof templates]: Parameters<typeof templates[K]>[0];
};

/* eslint-disable new-cap */
const createPdf = async <T extends keyof Templates>(
  fileName: string,
  templateName: T,
  data: Templates[T],
) => new Promise<boolean>((resolve, reject) => {
  try {
    const template = templates[templateName];
    const pdf = pdfMake.createPdf(template(data) as any);
    pdf.download(`${fileName}.pdf`);
    resolve(true);
  } catch (e) {
    reject(e);
  }
});

export const pdf = { createPdf };
