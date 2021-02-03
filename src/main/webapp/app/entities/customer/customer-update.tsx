import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerUpdate = (props: ICustomerUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/customer');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...customerEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  const maxDateOfBirth  = new Date();
  maxDateOfBirth.setDate(maxDateOfBirth.getDate() - 1);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="demoApp.customer.home.createOrEditLabel">
            <Translate contentKey="demoApp.customer.home.createOrEditLabel">Create or edit a Customer</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="cifNumberLabel" for="customer-cifNumber">
                  <Translate contentKey="demoApp.customer.cifNumber">Cif Number</Translate>
                </Label>
                <AvField
                  id="customer-cifNumber"
                  type="text"
                  name="cifNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="customer-firstName">
                  <Translate contentKey="demoApp.customer.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="customer-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                    pattern: { value: '^[A-Za-z]+$', errorMessage: translate('entity.validation.pattern', { pattern: '^[A-Za-z]+$' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="middleNameLabel" for="customer-middleName">
                  <Translate contentKey="demoApp.customer.middleName">Middle Name</Translate>
                </Label>
                <AvField
                  id="customer-middleName"
                  type="text"
                  name="middleName"
                  validate={{
                    pattern: { value: '^[A-Za-z]+$', errorMessage: translate('entity.validation.pattern', { pattern: '^[A-Za-z]+$' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="customer-lastName">
                  <Translate contentKey="demoApp.customer.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="customer-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                    pattern: { value: '^[A-Za-z]+$', errorMessage: translate('entity.validation.pattern', { pattern: '^[A-Za-z]+$' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="customer-phone">
                  <Translate contentKey="demoApp.customer.phone">Phone</Translate>
                </Label>
                <AvField
                  id="customer-phone"
                  type="text"
                  name="phone"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: { value: '^(9|8)\\d{7}$', errorMessage: translate('entity.validation.pattern', { pattern: '^(9|8)\\d{7}$' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="customer-email">
                  <Translate contentKey="demoApp.customer.email">Email</Translate>
                </Label>
                <AvField
                  id="customer-email"
                  type="text"
                  name="email"
                  validate={{
                    pattern: {
                      value: '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$',
                      errorMessage: translate('entity.validation.pattern', {
                        pattern: '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$',
                      }),
                    },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfBirthLabel" for="customer-dateOfBirth">
                  <Translate contentKey="demoApp.customer.dateOfBirth">Date Of Birth</Translate>
                </Label>
                <AvField
                  id="customer-dateOfBirth"
                  type="date"
                  max={maxDateOfBirth}
                  className="form-control"
                  name="dateOfBirth"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="customer-createdBy">
                  <Translate contentKey="demoApp.customer.createdBy">Created By</Translate>
                </Label>
                <AvField id="customer-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createDateLabel" for="customer-createDate">
                  <Translate contentKey="demoApp.customer.createDate">Create Date</Translate>
                </Label>
                <AvField id="customer-createDate" type="date" className="form-control" name="createDate" />
              </AvGroup>
              <AvGroup>
                <Label id="updateByLabel" for="customer-updateBy">
                  <Translate contentKey="demoApp.customer.updateBy">Update By</Translate>
                </Label>
                <AvField id="customer-updateBy" type="text" name="updateBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updateDateLabel" for="customer-updateDate">
                  <Translate contentKey="demoApp.customer.updateDate">Update Date</Translate>
                </Label>
                <AvField id="customer-updateDate" type="date" className="form-control" name="updateDate" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer" replace color="info">
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
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUpdate);
