import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) { }

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  findAll(
    @Query('title') title?: string,
    @Query('text') text?: string,
    @Query('id') id?: string
  ): Stock[] {
    if (id) {
      const stock = this.stocksService.findOne(+id);
      return stock ? [stock] : [];
    }

    return this.stocksService.findAll(title, text);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const stock = this.stocksService.findOne(+id);
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return stock;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    const stock = this.stocksService.findOne(+id);
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const stock = this.stocksService.findOne(+id);
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return this.stocksService.remove(+id);
  }
}