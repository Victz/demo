import { Moment } from 'moment';
import { ICustomerAccount } from 'app/shared/model/customer-account.model';

export interface ICustomer {
  id?: number;
  cifNumber?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  dateOfBirth?: string;
  createdBy?: string;
  createDate?: string;
  updateBy?: string;
  updateDate?: string;
  customerAccounts?: ICustomerAccount[];
}

export const defaultValue: Readonly<ICustomer> = {};
