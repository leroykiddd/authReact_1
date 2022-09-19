export interface IRouteItem {
  path: string;
  element: JSX.Element;
}

export const enum PrivateRoutesEnum {
  CONTACTS = '/contacts',
}

export const enum PublicRoutesEnum {
  LOGIN = '/login',
}
