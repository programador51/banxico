

  export interface BankOption {
  label: string
  value: string
}

export interface BankSelectProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (bankValue: string) => void
}