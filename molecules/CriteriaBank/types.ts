export interface PropsCriteriaBank
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  onChange?: (type: "R" | "T") => void
}
