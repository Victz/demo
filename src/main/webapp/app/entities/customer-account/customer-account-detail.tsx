import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer-account.reducer';
import { ICustomerAccount } from 'app/shared/model/customer-account.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerAccountDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerAccountDetail = (props: ICustomerAccountDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerAccountEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="demoApp.customerAccount.detail.title">CustomerAccount</Translate> [<b>{customerAccountEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="accountNumber">
              <Translate contentKey="demoApp.customerAccount.accountNumber">Account Number</Translate>
            </span>
          </dt>
          <dd>{customerAccountEntity.accountNumber}</dd>
          <dt>
            <span id="currency">
              <Translate contentKey="demoApp.customerAccount.currency">Currency</Translate>
            </span>
          </dt>
          <dd>{customerAccountEntity.currency}</dd>
          <dt>
            <span id="accountName">
              <Translate contentKey="demoApp.customerAccount.accountName">Account Name</Translate>
            </span>
          </dt>
          <dd>{customerAccountEntity.accountName}</dd>
          <dt>
            <span id="balance">
              <Translate contentKey="demoApp.customerAccount.balance">Balance</Translate>
            </span>
          </dt>
          <dd>{customerAccountEntity.balance}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="demoApp.customerAccount.active">Active</Translate>
            </span>
          </dt>
          <dd>{customerAccountEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="demoApp.customerAccount.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{customerAccountEntity.createdBy}</dd>
          <dt>
            <span id="createDate">
              <Translate contentKey="demoApp.customerAccount.createDate">Create Date</Translate>
            </span>
          </dt>
          <dd>
            {customerAccountEntity.createDate ? (
              <TextFormat value={customerAccountEntity.createDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updateBy">
              <Translate contentKey="demoApp.customerAccount.updateBy">Update By</Translate>
            </span>
          </dt>
          <dd>{customerAccountEntity.updateBy}</dd>
          <dt>
            <span id="updateDate">
              <Translate contentKey="demoApp.customerAccount.updateDate">Update Date</Translate>
            </span>
          </dt>
          <dd>
            {customerAccountEntity.updateDate ? (
              <TextFormat value={customerAccountEntity.updateDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="demoApp.customerAccount.customer">Customer</Translate>
          </dt>
          <dd>{customerAccountEntity.customer ? customerAccountEntity.customer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer-account" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer-account/${customerAccountEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customerAccount }: IRootState) => ({
  customerAccountEntity: customerAccount.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccountDetail);
