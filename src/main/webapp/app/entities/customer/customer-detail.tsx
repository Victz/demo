import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDetail = (props: ICustomerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="demoApp.customer.detail.title">Customer</Translate> [<b>{customerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="cifNumber">
              <Translate contentKey="demoApp.customer.cifNumber">Cif Number</Translate>
            </span>
          </dt>
          <dd>{customerEntity.cifNumber}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="demoApp.customer.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.firstName}</dd>
          <dt>
            <span id="middleName">
              <Translate contentKey="demoApp.customer.middleName">Middle Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.middleName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="demoApp.customer.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.lastName}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="demoApp.customer.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{customerEntity.phone}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="demoApp.customer.email">Email</Translate>
            </span>
          </dt>
          <dd>{customerEntity.email}</dd>
          <dt>
            <span id="dateOfBirth">
              <Translate contentKey="demoApp.customer.dateOfBirth">Date Of Birth</Translate>
            </span>
          </dt>
          <dd>
            {customerEntity.dateOfBirth ? (
              <TextFormat value={customerEntity.dateOfBirth} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="demoApp.customer.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{customerEntity.createdBy}</dd>
          <dt>
            <span id="createDate">
              <Translate contentKey="demoApp.customer.createDate">Create Date</Translate>
            </span>
          </dt>
          <dd>
            {customerEntity.createDate ? <TextFormat value={customerEntity.createDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updateBy">
              <Translate contentKey="demoApp.customer.updateBy">Update By</Translate>
            </span>
          </dt>
          <dd>{customerEntity.updateBy}</dd>
          <dt>
            <span id="updateDate">
              <Translate contentKey="demoApp.customer.updateDate">Update Date</Translate>
            </span>
          </dt>
          <dd>
            {customerEntity.updateDate ? <TextFormat value={customerEntity.updateDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);
