import { container } from 'tsyringe';
import { DayJSProvider } from './DateProvider/implementations/DayJSProvider';
import { IDateProvider } from './DateProvider/models/IDateProvider';
import { BCryptProvider } from './HashProvider/implementations/BCryptProvider';
import { IHashProvider } from './HashProvider/models/IHashProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from './MailProvider/models/IMailProvider';
import { JwtTokenProvider } from './TokenProvider/implementations/JwtTokenProvider';
import { ITokenProvider } from './TokenProvider/models/ITokenProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayJSProvider);
container.registerSingleton<IHashProvider>('HashProvider', BCryptProvider);
container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
container.registerSingleton<ITokenProvider>('TokenProvider', JwtTokenProvider);
