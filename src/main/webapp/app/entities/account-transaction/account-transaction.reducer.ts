import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAccountTransaction, defaultValue } from 'app/shared/model/account-transaction.model';

export const ACTION_TYPES = {
  FETCH_ACCOUNTTRANSACTION_LIST: 'accountTransaction/FETCH_ACCOUNTTRANSACTION_LIST',
  FETCH_ACCOUNTTRANSACTION: 'accountTransaction/FETCH_ACCOUNTTRANSACTION',
  CREATE_ACCOUNTTRANSACTION: 'accountTransaction/CREATE_ACCOUNTTRANSACTION',
  UPDATE_ACCOUNTTRANSACTION: 'accountTransaction/UPDATE_ACCOUNTTRANSACTION',
  DELETE_ACCOUNTTRANSACTION: 'accountTransaction/DELETE_ACCOUNTTRANSACTION',
  RESET: 'accountTransaction/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAccountTransaction>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AccountTransactionState = Readonly<typeof initialState>;

// Reducer

export default (state: AccountTransactionState = initialState, action): AccountTransactionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACCOUNTTRANSACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ACCOUNTTRANSACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ACCOUNTTRANSACTION):
    case REQUEST(ACTION_TYPES.UPDATE_ACCOUNTTRANSACTION):
    case REQUEST(ACTION_TYPES.DELETE_ACCOUNTTRANSACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ACCOUNTTRANSACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ACCOUNTTRANSACTION):
    case FAILURE(ACTION_TYPES.CREATE_ACCOUNTTRANSACTION):
    case FAILURE(ACTION_TYPES.UPDATE_ACCOUNTTRANSACTION):
    case FAILURE(ACTION_TYPES.DELETE_ACCOUNTTRANSACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACCOUNTTRANSACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACCOUNTTRANSACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACCOUNTTRANSACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_ACCOUNTTRANSACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACCOUNTTRANSACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/account-transactions';

// Actions

export const getEntities: ICrudGetAllAction<IAccountTransaction> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ACCOUNTTRANSACTION_LIST,
  payload: axios.get<IAccountTransaction>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAccountTransaction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ACCOUNTTRANSACTION,
    payload: axios.get<IAccountTransaction>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAccountTransaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ACCOUNTTRANSACTION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAccountTransaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACCOUNTTRANSACTION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAccountTransaction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACCOUNTTRANSACTION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
