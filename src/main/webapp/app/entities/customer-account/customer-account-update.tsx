import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './customer-account.reducer';
import { ICustomerAccount } from 'app/shared/model/customer-account.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerAccountUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerAccountUpdate = (props: ICustomerAccountUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerAccountEntity, customers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/customer-account');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...customerAccountEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="demoApp.customerAccount.home.createOrEditLabel">
            <Translate contentKey="demoApp.customerAccount.home.createOrEditLabel">Create or edit a CustomerAccount</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerAccountEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-account-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-account-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="accountNumberLabel" for="customer-account-accountNumber">
                  <Translate contentKey="demoApp.customerAccount.accountNumber">Account Number</Translate>
                </Label>
                <AvField
                  id="customer-account-accountNumber"
                  type="text"
                  name="accountNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="currencyLabel" for="customer-account-currency">
                  <Translate contentKey="demoApp.customerAccount.currency">Currency</Translate>
                </Label>
                <AvField
                  id="customer-account-currency"
                  type="text"
                  name="currency"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="accountNameLabel" for="customer-account-accountName">
                  <Translate contentKey="demoApp.customerAccount.accountName">Account Name</Translate>
                </Label>
                <AvField
                  id="customer-account-accountName"
                  type="text"
                  name="accountName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="balanceLabel" for="customer-account-balance">
                  <Translate contentKey="demoApp.customerAccount.balance">Balance</Translate>
                </Label>
                <AvField id="customer-account-balance" type="text" name="balance" />
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="customer-account-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="demoApp.customerAccount.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="customer-account-createdBy">
                  <Translate contentKey="demoApp.customerAccount.createdBy">Created By</Translate>
                </Label>
                <AvField id="customer-account-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createDateLabel" for="customer-account-createDate">
                  <Translate contentKey="demoApp.customerAccount.createDate">Create Date</Translate>
                </Label>
                <AvField id="customer-account-createDate" type="date" className="form-control" name="createDate" />
              </AvGroup>
              <AvGroup>
                <Label id="updateByLabel" for="customer-account-updateBy">
                  <Translate contentKey="demoApp.customerAccount.updateBy">Update By</Translate>
                </Label>
                <AvField id="customer-account-updateBy" type="text" name="updateBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updateDateLabel" for="customer-account-updateDate">
                  <Translate contentKey="demoApp.customerAccount.updateDate">Update Date</Translate>
                </Label>
                <AvField id="customer-account-updateDate" type="date" className="form-control" name="updateDate" />
              </AvGroup>
              <AvGroup>
                <Label for="customer-account-customer">
                  <Translate contentKey="demoApp.customerAccount.customer">Customer</Translate>
                </Label>
                <AvInput id="customer-account-customer" type="select" className="form-control" name="customer.id">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer-account" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  customers: storeState.customer.entities,
  customerAccountEntity: storeState.customerAccount.entity,
  loading: storeState.customerAccount.loading,
  updating: storeState.customerAccount.updating,
  updateSuccess: storeState.customerAccount.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccountUpdate);
