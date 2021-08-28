import { TestPuppeteerController } from '@modules/pdf/useCases/PuppetTestPdf/TestController';
import { TestController } from '@modules/pdf/useCases/TestPdf/TestController';
import { TransformPdfAController } from '@modules/pdf/useCases/TransformPdfA/TestController';
import cors from 'cors';
import express, { Router } from 'express';

const pdfRoutes = Router();

const testHtmlPdf = new TestController();
const testPuppeteerController = new TestPuppeteerController();
const transformPdfAController = new TransformPdfAController();
pdfRoutes.use(cors());
pdfRoutes.use(express.urlencoded({ extended: true }));
pdfRoutes.post('/', testHtmlPdf.handle);
pdfRoutes.post('/puppet', testPuppeteerController.handle);
pdfRoutes.post('/pdfa', transformPdfAController.handle);

export { pdfRoutes };
