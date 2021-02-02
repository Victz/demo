import { Moment } from 'moment';
import { IAccountTransaction } from 'app/shared/model/account-transaction.model';
import { ICustomer } from 'app/shared/model/customer.model';

export interface ICustomerAccount {
  id?: number;
  accountNumber?: string;
  currency?: string;
  accountName?: string;
  balance?: number;
  active?: boolean;
  createdBy?: string;
  createDate?: string;
  updateBy?: string;
  updateDate?: string;
  accountTransactions?: IAccountTransaction[];
  customer?: ICustomer;
}

export const defaultValue: Readonly<ICustomerAccount> = {
  active: false,
};
