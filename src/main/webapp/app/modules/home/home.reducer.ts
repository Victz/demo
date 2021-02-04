import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IChart } from 'app/shared/layout/home/chart';


export const ACTION_TYPES = {
  FETCH_CHART_LIST: 'chart/FETCH_CHART_LIST',
  RESET: 'chart/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChart>,
};

export type ChartState = Readonly<typeof initialState>;

// Reducer

export default (state: ChartState = initialState, action): ChartState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHART_LIST):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CHART_LIST):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHART_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/customer/chart';

// Actions

export const getEntities: ICrudGetAllAction<IChart> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHART_LIST,
  payload: axios.get<IChart>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});
export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
