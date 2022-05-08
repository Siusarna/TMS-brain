import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AddCarrierDto } from './dtos/add-carrier.dto';
import { UserCarrierService } from './user-carrier.service';
import { Carriers } from '../constants/carriers.constants';
import { CarrierDto } from './dtos/carrier.dto';

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
  @Get()
  @UseGuards(AuthGuard)
  getCarriers(@Request() req) {
    return this.userCarrierService.getUserCarriers(req.user.id);
  }

  @Version('1')
  @Get('services')
  @UseGuards(AuthGuard)
  getServicesByCarrier(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    data: CarrierDto,
  ) {
    return this.userCarrierService.getServicesByCarrier(data.carrier);
  }
}
