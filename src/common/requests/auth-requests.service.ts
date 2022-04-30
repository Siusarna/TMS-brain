import { HttpService } from '@nestjs/axios';
import { defaultConfig } from '../../config';
import { lastValueFrom, map } from 'rxjs';
import { User } from '../../user-accounts/entities/user.entity';
import { Injectable } from '@nestjs/common';

export type TransformedUser = Omit<User, 'password' | 'passwordVersion' | 'iv'>;

@Injectable()
export class AuthRequestsService {
  constructor(private httpService: HttpService) {}

  getUser(token: string): Promise<TransformedUser> {
    const observable = this.httpService
      .get(`${defaultConfig.authUrl}/user`, {
        headers: { authorization: token },
      })
      .pipe(map((response) => response.data));
    return lastValueFrom(observable);
  }
}
