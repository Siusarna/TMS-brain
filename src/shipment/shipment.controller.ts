import {
  Body,
  Controller,
  Get, Param,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateShipmentDto } from './dtos/create-shipment.dto';
import { ShipmentService } from './shipment.service';
import { PaginationDto } from './dtos/pagination.dto';

@Controller('shipment')
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {}

  @Version('1')
  @Post()
  @UseGuards(AuthGuard)
  createShipment(@Request() req, @Body() data: CreateShipmentDto) {
    return this.shipmentService.createShipment(
      req.user.id,
      data,
      req.headers.authorization,
    );
  }

  @Version('1')
  @Post('/rate')
  @UseGuards(AuthGuard)
  rateShipment(@Request() req, @Body() data: CreateShipmentDto) {
    return this.shipmentService.rateShipment(
        req.user.id,
        data,
        req.headers.authorization,
    );
  }

  @Version('1')
  @Get()
  @UseGuards(AuthGuard)
  getShipments(@Request() req) {
    return this.shipmentService.getShipments(req.user.id);
  }

  @Version('1')
  @Get('/:trackingNumber')
  getShipmentByTrackingNumber(@Param('trackingNumber') trackingNumber: string) {
    return this.shipmentService.getShipmentByTrackingNumber(trackingNumber);
  }

  @Version('1')
  @Get('tracking')
  @UseGuards(AuthGuard)
  getShipmentsForTracking(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    data: PaginationDto,
  ) {
    return this.shipmentService.getShipmentsForTracking(data);
  }

  @Version('1')
  @Get('tracking/:trackingNumber')
  @UseGuards(AuthGuard)
  trackShipment(
    @Request() req,
    @Param('trackingNumber')
    trackingNumber: string,
  ) {
    return this.shipmentService.trackShipment(
      req.user.id,
      trackingNumber,
      req.headers.authorization,
    );
  }
}
