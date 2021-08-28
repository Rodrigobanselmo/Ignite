/* eslint-disable consistent-return */
// var Vimeo = require("vimeo").Vimeo;

import ejs from 'ejs';
import pdf from 'html-pdf';
import path from 'path';
import puppeteer from 'puppeteer';

import { AppError } from '@shared/errors/AppError';

const passengers = [
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

function onEjs(): Promise<string | Buffer> {
  return new Promise(resolve => {
    const filePath = path.join(__dirname, 'print.ejs');
    ejs.renderFile(filePath, { passengers }, async (err, html) => {
      if (err) {
        resolve(`Erro na leitura do arquivo ${err}`);
      }

      const options = {
        format: 'A4',
      };

      console.log(1);
      const pdfBuffer = await onCreatePdf(html, options as pdf.CreateOptions);
      console.log('pdfBuffer', pdfBuffer);
      resolve(pdfBuffer);
    });
  });
}

class TestUseCase {
  async execute(): Promise<string | Buffer> {
    const pdfBuffer = onEjs();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3333/', {
      waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({
      printBackground: true,
      format: 'letter',
    } as puppeteer.PDFOptions);

    await browser.close();

    if (typeof pdf === 'string') {
      throw new AppError(pdf);
    }
    return pdf;
  }
}

export { TestUseCase };
