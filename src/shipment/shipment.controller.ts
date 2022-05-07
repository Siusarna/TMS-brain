import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateShipmentDto } from './dtos/create-shipment.dto';
import { ShipmentService } from './shipment.service';

@Controller('shipment')
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {}

  @Version('1')
  @Post()
  @UseGuards(AuthGuard)
  createShipment(@Request() req, @Body() data: CreateShipmentDto) {
    return this.shipmentService.createShipment(req.user.id, data);
  }
}
