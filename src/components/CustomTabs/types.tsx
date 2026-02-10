export interface TabOption {
  label: string;
  value: string;
}

export interface CustomTabProps {
  options: TabOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}
