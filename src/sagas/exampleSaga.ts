import { put, delay,  takeLatest } from "redux-saga/effects";
import {exampleActions} from '@/reducers/example.slice';


export function* addSaga({payload}:ReturnType<typeof exampleActions.addRequest>){
  try {
    yield(delay(5000))
    yield put(exampleActions.addSuccess(payload));
  } catch(error) {
    yield put(exampleActions.addFail(error));
  }
}

const sagas = [
  takeLatest(exampleActions.addRequest, addSaga)
]
export default sagas