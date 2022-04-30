import { HttpService } from '@nestjs/axios';
import { defaultConfig } from '../../config';
import { lastValueFrom, map } from 'rxjs';
import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AuthRequestsService {
  constructor(private httpService: HttpService) {}

  getUser(token: string): Promise<User> {
    const observable = this.httpService
      .get(`${defaultConfig.authUrl}/user`, {
        headers: { authorization: token },
      })
      .pipe(map((response) => response.data));
    return lastValueFrom(observable);
  }
}
