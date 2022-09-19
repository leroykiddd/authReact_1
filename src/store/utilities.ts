import { RootState } from '.';

export const enum RequestStatusEnum {
  REJECTED = 'rejected',
  PENDING = 'pending',
  LOADED = 'loaded',
  SHOULD_LOAD = 'shouldLoad',
}

export const selectSelf = (state: RootState) => state;
