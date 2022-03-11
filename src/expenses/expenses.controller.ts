import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { ExpenseDto } from './dto/expense.dto';
import { Expense } from '@prisma/client';
import { ExpenseEditDto } from './dto/expense-edit.dto';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get()
  async getAllExpenses(): Promise<Expense[]> {
    return await this.expensesService.getAll();
  }

  @Get('user/:userId')
  async getAllExpensesByUser(
    @Param('userId') userId: string,
  ): Promise<Expense[]> {
    return await this.expensesService.getAllByUser(Number(userId));
  }

  @Get(':id')
  async getExpense(@Param('id') id: string): Promise<Expense> {
    return await this.expensesService.getOne(id);
  }

  @Post()
  async createExpense(@Body() expense: ExpenseDto): Promise<Expense> {
    return await this.expensesService.create(expense);
  }

  @Delete(':id')
  async deleteExpenses(@Param('id') id: string): Promise<Expense> {
    return await this.expensesService.delete(id);
  }

  @Put(':id')
  async updateExpense(
    @Param('id') id: string,
    @Body() expense: ExpenseEditDto,
  ): Promise<Expense> {
    return await this.expensesService.update(id, expense);
  }
}
