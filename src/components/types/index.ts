export type Form = {
  hasBeenSubmitted: boolean;
}

export enum InputType {
  Text = 'text',
  Email = 'email',
  Textarea = 'textarea',
}

export enum InputType2 {
  Text = 'text',
  Email = 'email',
  Textarea = 'textarea',
}

export type FieldType = {
  value: string;
  name: string;
  id: string;
  label: string;
  type: InputType;
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

export type EntryType = Partial<FormTransferType>;
