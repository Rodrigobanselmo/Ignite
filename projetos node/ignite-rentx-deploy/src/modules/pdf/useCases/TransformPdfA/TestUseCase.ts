/* eslint-disable consistent-return */
// var Vimeo = require("vimeo").Vimeo;

import CloudmersiveConvertApiClient from 'cloudmersive-convert-api-client';
import ejs from 'ejs';
import fs from 'fs';
import pdf from 'html-pdf';
import path from 'path';

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
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    pdf.create(html, options).toBuffer((err, buffer) => {
      console.log(2);
      if (err) {
        reject(new AppError('Erro ao gerar o PDF'));
      }
      resolve(buffer);
    });
  });
}

function onEjs(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, 'print.ejs');
    ejs.renderFile(filePath, { passengers }, async (err, html) => {
      if (err) {
        reject(new AppError(`Erro na leitura do arquivo ${err}`));
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

function onConvert(pdf: Buffer): Promise<string | Buffer> {
  return new Promise((resolve, reject) => {
    // const filePath = path.join(__dirname, 'pdf.pdf');
    const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;

    // Configure API key authorization: Apikey
    const { Apikey } = defaultClient.authentications;
    Apikey.apiKey = 'e7115500-21cc-4e73-ba98-48462da56b1f';
    const apiInstance = new CloudmersiveConvertApiClient.EditPdfApi();
    const inputFile = pdf; // File | Input file to perform the operation on.
    const opts = {};
    const callback = function (error: any, data: any, response: any) {
      if (error) {
        reject(new AppError('Erro ao converter documento'));
      } else {
        resolve(data);
        // console.log(`API called successfully. Returned data: ${data}`);
      }
    };
    apiInstance.editPdfConvertToPdfA(inputFile, opts, callback);
  });
}

class TestUseCase {
  async execute(): Promise<string | Buffer> {
    const pdf = await onEjs();
    const pdfBuffer = onConvert(pdf);

    return pdfBuffer;
  }
}

export { TestUseCase };
