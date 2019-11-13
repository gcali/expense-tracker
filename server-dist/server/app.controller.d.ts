import { AppService } from './app.service';
import { InputExpense } from '@common/dto/expense';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): InputExpense;
}
