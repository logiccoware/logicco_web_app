export interface IAccountPayload {
  name: string;
  currency: string;
  markDefault?: boolean;
}

export interface IAccountCreatePayload extends IAccountPayload {}
export interface IAccountUpdatePayload extends IAccountPayload {}
