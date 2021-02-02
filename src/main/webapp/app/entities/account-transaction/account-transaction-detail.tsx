import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './account-transaction.reducer';
import { IAccountTransaction } from 'app/shared/model/account-transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAccountTransactionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AccountTransactionDetail = (props: IAccountTransactionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { accountTransactionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="demoApp.accountTransaction.detail.title">AccountTransaction</Translate> [
          <b>{accountTransactionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="type">
              <Translate contentKey="demoApp.accountTransaction.type">Type</Translate>
            </span>
          </dt>
          <dd>{accountTransactionEntity.type}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="demoApp.accountTransaction.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{accountTransactionEntity.amount}</dd>
          <dt>
            <span id="transactionDate">
              <Translate contentKey="demoApp.accountTransaction.transactionDate">Transaction Date</Translate>
            </span>
          </dt>
          <dd>
            {accountTransactionEntity.transactionDate ? (
              <TextFormat value={accountTransactionEntity.transactionDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="demoApp.accountTransaction.status">Status</Translate>
            </span>
          </dt>
          <dd>{accountTransactionEntity.status}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="demoApp.accountTransaction.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{accountTransactionEntity.createdBy}</dd>
          <dt>
            <span id="createDate">
              <Translate contentKey="demoApp.accountTransaction.createDate">Create Date</Translate>
            </span>
          </dt>
          <dd>
            {accountTransactionEntity.createDate ? (
              <TextFormat value={accountTransactionEntity.createDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updateBy">
              <Translate contentKey="demoApp.accountTransaction.updateBy">Update By</Translate>
            </span>
          </dt>
          <dd>{accountTransactionEntity.updateBy}</dd>
          <dt>
            <span id="updateDate">
              <Translate contentKey="demoApp.accountTransaction.updateDate">Update Date</Translate>
            </span>
          </dt>
          <dd>
            {accountTransactionEntity.updateDate ? (
              <TextFormat value={accountTransactionEntity.updateDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="demoApp.accountTransaction.customerAccount">Customer Account</Translate>
          </dt>
          <dd>{accountTransactionEntity.customerAccount ? accountTransactionEntity.customerAccount.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/account-transaction" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/account-transaction/${accountTransactionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ accountTransaction }: IRootState) => ({
  accountTransactionEntity: accountTransaction.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransactionDetail);
