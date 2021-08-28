/* eslint-disable consistent-return */
// var Vimeo = require("vimeo").Vimeo;

import ejs from 'ejs';
import pdf from 'html-pdf';
import path from 'path';

import { AppError } from '@shared/errors/AppError';

const contents = [
  {
    name: 'Joyce',
    flightNumber: 7859,
    time: '18h00',
  },
  {
    name: 'Brock',
    flightNumber: 7859,
    time: '18h00',
  },
  {
    name: 'Eve',
    flightNumber: 7859,
    time: '18h00',
  },
];

function onCreatePdf(
  html: string,
  options: pdf.CreateOptions,
): Promise<string | Buffer> {
  return new Promise(resolve => {
    pdf.create(html, options).toBuffer((err, buffer) => {
      console.log(2);
      if (err) {
        resolve('Erro ao gerar o PDF');
      }
      resolve(buffer);
    });
  });
}

function onEjs(body: any): Promise<string | Buffer> {
  const { name, cpf, cursoName, date } = body;

  if (!name || !cpf || !cursoName || !date) throw new AppError('missing data');

  return new Promise(resolve => {
    const filePath = path.join(__dirname, 'print.ejs');
    ejs.renderFile(filePath, { contents, body }, async (err, html) => {
      if (err) {
        resolve(`Erro na leitura do arquivo ${err}`);
      }

      const options = {
        // format: 'A4',
        height: '595px',
        width: '841px',
        header: { height: '0px' },
      };

      console.log(1);
      const pdfBuffer = await onCreatePdf(html, options as pdf.CreateOptions);
      console.log('pdfBuffer', pdfBuffer);
      resolve(pdfBuffer);
    });
  });
}

class TestUseCase {
  async execute(body: any): Promise<string | Buffer> {
    console.log(body);
    const pdfBuffer = onEjs(body);

    if (typeof pdfBuffer === 'string') {
      throw new AppError(pdfBuffer);
    }
    return pdfBuffer;
  }
}

export { TestUseCase };
