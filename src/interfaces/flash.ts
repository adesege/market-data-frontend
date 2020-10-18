export interface IFlashMessage {
  type: IFlashTypes;
  title?: string;
  messages: string[];
}

export enum IFlashTypes {
  error = 'error',
  info = 'info'
}
