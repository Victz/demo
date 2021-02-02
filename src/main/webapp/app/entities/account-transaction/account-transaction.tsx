import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './account-transaction.reducer';
import { IAccountTransaction } from 'app/shared/model/account-transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAccountTransactionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AccountTransaction = (props: IAccountTransactionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { accountTransactionList, match, loading } = props;
  return (
    <div>
      <h2 id="account-transaction-heading">
        <Translate contentKey="demoApp.accountTransaction.home.title">Account Transactions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="demoApp.accountTransaction.home.createLabel">Create new Account Transaction</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {accountTransactionList && accountTransactionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.accountTransaction.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.accountTransaction.amount">Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.accountTransaction.transactionDate">Transaction Date</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.accountTransaction.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.accountTransaction.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.accountTransaction.createDate">Create Date</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.accountTransaction.updateBy">Update By</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.accountTransaction.updateDate">Update Date</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.accountTransaction.customerAccount">Customer Account</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {accountTransactionList.map((accountTransaction, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${accountTransaction.id}`} color="link" size="sm">
                      {accountTransaction.id}
                    </Button>
                  </td>
                  <td>{accountTransaction.type}</td>
                  <td>{accountTransaction.amount}</td>
                  <td>
                    {accountTransaction.transactionDate ? (
                      <TextFormat type="date" value={accountTransaction.transactionDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{accountTransaction.status}</td>
                  <td>{accountTransaction.createdBy}</td>
                  <td>
                    {accountTransaction.createDate ? (
                      <TextFormat type="date" value={accountTransaction.createDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{accountTransaction.updateBy}</td>
                  <td>
                    {accountTransaction.updateDate ? (
                      <TextFormat type="date" value={accountTransaction.updateDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {accountTransaction.customerAccount ? (
                      <Link to={`customer-account/${accountTransaction.customerAccount.id}`}>{accountTransaction.customerAccount.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${accountTransaction.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${accountTransaction.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${accountTransaction.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="demoApp.accountTransaction.home.notFound">No Account Transactions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ accountTransaction }: IRootState) => ({
  accountTransactionList: accountTransaction.entities,
  loading: accountTransaction.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransaction);
