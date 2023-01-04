import { ExampleState } from '@/reducers/example.slice';
import {GlobalState} from '@/reducers/global.slice';

export interface RootState {
  global: GlobalState
  example: ExampleState
  services:any
}

export const getRoot = (state: RootState) => state;
export const getGlobal = (state: RootState) => state.global;
export const getServices = (state: RootState) => state.services
export const getExample = (state: RootState) => state.example;
