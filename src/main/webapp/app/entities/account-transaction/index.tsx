import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AccountTransaction from './account-transaction';
import AccountTransactionDetail from './account-transaction-detail';
import AccountTransactionUpdate from './account-transaction-update';
import AccountTransactionDeleteDialog from './account-transaction-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AccountTransactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AccountTransactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AccountTransactionDetail} />
      <ErrorBoundaryRoute path={match.url} component={AccountTransaction} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AccountTransactionDeleteDialog} />
  </>
);

export default Routes;
