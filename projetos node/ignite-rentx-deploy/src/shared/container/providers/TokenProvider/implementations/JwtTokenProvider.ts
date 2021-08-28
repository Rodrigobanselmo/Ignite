import auth from '@config/auth';
import { sign, verify } from 'jsonwebtoken';

import {
  IPayload,
  ITokenProvider,
  IVerifyToken,
} from '../models/ITokenProvider';

export class JwtTokenProvider implements ITokenProvider {
  public generateToken(id: string, roles: string[]): string {
    const { secret_token, expires_in_token } = auth.jwt;
    const token = sign({ roles }, secret_token, {
      subject: id,
      expiresIn: expires_in_token,
    });

    return token;
  }

  public generateRefreshToken(
    id: string,
    email: string,
    roles: string[],
  ): string {
    const { secret_refresh_token, expires_in_refresh_token } = auth.jwt;
    const token = sign({ email, roles }, secret_refresh_token, {
      subject: id,
      expiresIn: expires_in_refresh_token,
    });

    return token;
  }

  public expiresRefreshTokenDays(): number {
    const { expires_refresh_token_days } = auth.jwt;
    return expires_refresh_token_days;
  }

  public verifyIsValidToken({ secret_type, token }: IVerifyToken): IPayload {
    const { secret_refresh_token, secret_token } = auth.jwt;
    let secret: string;

    if (secret_type === 'refresh') {
      secret = secret_refresh_token;
    } else {
      secret = secret_token;
    }

    const decode = verify(token, secret, {
      algorithms: ['HS256'],
    }) as IPayload;

    return decode;
  }
}
