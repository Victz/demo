import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './customer-account.reducer';
import { ICustomerAccount } from 'app/shared/model/customer-account.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerAccountProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CustomerAccount = (props: ICustomerAccountProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { customerAccountList, match, loading } = props;
  return (
    <div>
      <h2 id="customer-account-heading">
        <Translate contentKey="demoApp.customerAccount.home.title">Customer Accounts</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="demoApp.customerAccount.home.createLabel">Create new Customer Account</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {customerAccountList && customerAccountList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.customerAccount.accountNumber">Account Number</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.customerAccount.currency">Currency</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.customerAccount.accountName">Account Name</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.customerAccount.balance">Balance</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.customerAccount.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.customerAccount.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.customerAccount.createDate">Create Date</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.customerAccount.updateBy">Update By</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.customerAccount.updateDate">Update Date</Translate>
                </th>
                <th>
                  <Translate contentKey="demoApp.customerAccount.customer">Customer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customerAccountList.map((customerAccount, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${customerAccount.id}`} color="link" size="sm">
                      {customerAccount.id}
                    </Button>
                  </td>
                  <td>{customerAccount.accountNumber}</td>
                  <td>{customerAccount.currency}</td>
                  <td>{customerAccount.accountName}</td>
                  <td>{customerAccount.balance}</td>
                  <td>{customerAccount.active ? 'true' : 'false'}</td>
                  <td>{customerAccount.createdBy}</td>
                  <td>
                    {customerAccount.createDate ? (
                      <TextFormat type="date" value={customerAccount.createDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{customerAccount.updateBy}</td>
                  <td>
                    {customerAccount.updateDate ? (
                      <TextFormat type="date" value={customerAccount.updateDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {customerAccount.customer ? (
                      <Link to={`customer/${customerAccount.customer.id}`}>{customerAccount.customer.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${customerAccount.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customerAccount.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customerAccount.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="demoApp.customerAccount.home.notFound">No Customer Accounts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ customerAccount }: IRootState) => ({
  customerAccountList: customerAccount.entities,
  loading: customerAccount.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccount);
