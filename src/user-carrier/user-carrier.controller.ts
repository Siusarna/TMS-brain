import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AddCarrierDto } from './dtos/add-carrier.dto';
import { UserCarrierService } from './user-carrier.service';
import { Carriers } from '../constants/carriers.constants';

@Controller('user-carrier')
export class UserCarrierController {
  constructor(private userCarrierService: UserCarrierService) {}

  @Version('1')
  @Post()
  @UseGuards(AuthGuard)
  addCarrier(@Request() req, @Body() data: AddCarrierDto) {
    return this.userCarrierService.addCarrier(req.user.id, data);
  }

  @Version('1')
  @Delete()
  @UseGuards(AuthGuard)
  removeCarrier(@Request() req, @Query('carrier') carrier: Carriers) {
    return this.userCarrierService.removeCarrier(req.user.id, carrier);
  }

  @Version('1')
  @Delete()
  @UseGuards(AuthGuard)
  getCarriers(@Request() req) {
    return this.userCarrierService.getUserCarriers(req.user.id);
  }
}
