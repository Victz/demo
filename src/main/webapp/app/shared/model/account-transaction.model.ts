import { Moment } from 'moment';
import { ICustomerAccount } from 'app/shared/model/customer-account.model';

export interface IAccountTransaction {
  id?: number;
  type?: string;
  amount?: number;
  transactionDate?: string;
  status?: string;
  createdBy?: string;
  createDate?: string;
  updateBy?: string;
  updateDate?: string;
  customerAccount?: ICustomerAccount;
}

export const defaultValue: Readonly<IAccountTransaction> = {};
