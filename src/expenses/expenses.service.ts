import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExpenseDto } from './dto/expense.dto';
import { ExpenseEditDto } from './dto/expense-edit.dto';

@Injectable()
export class ExpensesService {
  constructor(private db: PrismaService) {}

  async check(id: number) {
    return this.db.expense.findFirst({ where: { id } });
  }

  async getAll() {
    return await this.db.expense.findMany();
  }

  async getAllByUser(userId: number) {
    return await this.db.expense.findMany({ where: { userId } });
  }

  async getOne(id: string) {
    const expense = this.check(Number(id));

    if (!expense) {
      throw new HttpException(
        'Item with this ID doenst exists',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return expense;
  }

  async create(expense: ExpenseDto) {
    return await this.db.expense.create({
      data: {
        text: expense.text,
        userId: expense.userId,
        amount: expense.amount,
      },
    });
  }

  async delete(id: string) {
    const expense = this.check(Number(id));

    if (!expense) {
      throw new HttpException(
        'Item with this ID doenst exists',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return await this.db.expense.delete({ where: { id: Number(id) } });
  }

  async update(id: string, expense: ExpenseEditDto) {
    const expenseItem = this.check(Number(id));

    if (!expenseItem) {
      throw new HttpException(
        'Item with this ID doenst exists',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return await this.db.expense.update({
      where: { id: Number(id) },
      data: { ...expense },
    });
  }
}
