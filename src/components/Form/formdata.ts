import { FieldType, InputType } from 'types/types.ts';

const fields: FieldType[] = [
  {
    value: '',
    name: 'First name',
    id: 'firstName',
    label: 'First Name',
    type: InputType.Text,
    placeholder: 'Please enter your first name',
    isValid: false,
    isRequired: true,
  },
  {
    value: '',
    name: 'Last name',
    id: 'lastName',
    label: 'Last name',
    type: InputType.Text,
    placeholder: 'Please enter your last name',
    isValid: false,
    isRequired: true,
  },
  {
    value: '',
    name: 'Email',
    id: 'email',
    label: 'Email',
    type: InputType.Email,
    placeholder: 'Please enter your email',
    isValid: false,
    isRequired: true,
  },
  {
    value: '',
    name: 'Customer Query',
    id: 'customerQuery',
    label: 'Customer query',
    type: InputType.Textarea,
    placeholder: 'Please enter your customer query',
    isValid: true,
    isRequired: false,
  },
];

export default fields;
