export interface Form {
  hasBeenSubmitted: boolean;
}

export interface Input {
  type: 'text' | 'email';
}

export type FieldType = {
  value: string;
  name: string;
  id: string;
  label: string;
  type: string;
  placeholder: string;
  isValid: boolean;
  isRequired: boolean;
}

export type FormTransferType = {
  firstName: string;
  lastName: string;
  email: string;
  customerQuery?: string;
}
