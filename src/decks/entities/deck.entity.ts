export interface Property {
  name: string;
  value: string;
  type:
  | 'text'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime'
  | 'color'
  | 'range'
  | 'file'
  | 'checkbox'
  | 'select';
}

