import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomerAccount } from 'app/shared/model/customer-account.model';
import { getEntities as getCustomerAccounts } from 'app/entities/customer-account/customer-account.reducer';
import { getEntity, updateEntity, createEntity, reset } from './account-transaction.reducer';
import { IAccountTransaction } from 'app/shared/model/account-transaction.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAccountTransactionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AccountTransactionUpdate = (props: IAccountTransactionUpdateProps) => {
  const [customerAccountId, setCustomerAccountId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { accountTransactionEntity, customerAccounts, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/account-transaction');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomerAccounts();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...accountTransactionEntity,
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
          <h2 id="demoApp.accountTransaction.home.createOrEditLabel">
            <Translate contentKey="demoApp.accountTransaction.home.createOrEditLabel">Create or edit a AccountTransaction</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : accountTransactionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="account-transaction-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="account-transaction-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeLabel" for="account-transaction-type">
                  <Translate contentKey="demoApp.accountTransaction.type">Type</Translate>
                </Label>
                <AvField
                  id="account-transaction-type"
                  type="text"
                  name="type"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="account-transaction-amount">
                  <Translate contentKey="demoApp.accountTransaction.amount">Amount</Translate>
                </Label>
                <AvField
                  id="account-transaction-amount"
                  type="text"
                  name="amount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="transactionDateLabel" for="account-transaction-transactionDate">
                  <Translate contentKey="demoApp.accountTransaction.transactionDate">Transaction Date</Translate>
                </Label>
                <AvField
                  id="account-transaction-transactionDate"
                  type="date"
                  className="form-control"
                  name="transactionDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="account-transaction-status">
                  <Translate contentKey="demoApp.accountTransaction.status">Status</Translate>
                </Label>
                <AvField
                  id="account-transaction-status"
                  type="text"
                  name="status"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="account-transaction-createdBy">
                  <Translate contentKey="demoApp.accountTransaction.createdBy">Created By</Translate>
                </Label>
                <AvField id="account-transaction-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createDateLabel" for="account-transaction-createDate">
                  <Translate contentKey="demoApp.accountTransaction.createDate">Create Date</Translate>
                </Label>
                <AvField id="account-transaction-createDate" type="date" className="form-control" name="createDate" />
              </AvGroup>
              <AvGroup>
                <Label id="updateByLabel" for="account-transaction-updateBy">
                  <Translate contentKey="demoApp.accountTransaction.updateBy">Update By</Translate>
                </Label>
                <AvField id="account-transaction-updateBy" type="text" name="updateBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updateDateLabel" for="account-transaction-updateDate">
                  <Translate contentKey="demoApp.accountTransaction.updateDate">Update Date</Translate>
                </Label>
                <AvField id="account-transaction-updateDate" type="date" className="form-control" name="updateDate" />
              </AvGroup>
              <AvGroup>
                <Label for="account-transaction-customerAccount">
                  <Translate contentKey="demoApp.accountTransaction.customerAccount">Customer Account</Translate>
                </Label>
                <AvInput id="account-transaction-customerAccount" type="select" className="form-control" name="customerAccount.id">
                  <option value="" key="0" />
                  {customerAccounts
                    ? customerAccounts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/account-transaction" replace color="info">
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
  customerAccounts: storeState.customerAccount.entities,
  accountTransactionEntity: storeState.accountTransaction.entity,
  loading: storeState.accountTransaction.loading,
  updating: storeState.accountTransaction.updating,
  updateSuccess: storeState.accountTransaction.updateSuccess,
});

const mapDispatchToProps = {
  getCustomerAccounts,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransactionUpdate);
