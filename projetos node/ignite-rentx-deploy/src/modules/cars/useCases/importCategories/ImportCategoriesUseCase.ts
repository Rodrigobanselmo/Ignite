import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import csvParser from 'csv-parser';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

interface IImportCategories {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const importCategories: IImportCategories[] = [];

      const parseFile = csvParser(['name', 'description']);
      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const { name, description } = line;

          importCategories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          // fs.promises.unlink(file.path);
          fs.unlinkSync(file.path);
          resolve(importCategories);
        })
        .on('error', err => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }

  /* 
  var input = require('fs').readFileSync('/dev/stdin', 'utf8');
  var lines = input.split('\n'); 
  */
}

export { ImportCategoriesUseCase };
