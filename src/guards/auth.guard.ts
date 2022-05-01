import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthRequestsService } from '../common/requests/auth-requests.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authRequests: AuthRequestsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.header('Authorization');
    try {
      request.user = await this.authRequests.getUser(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
