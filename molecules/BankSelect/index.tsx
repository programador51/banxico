import React, { useRef } from "react"

import type { BankSelectProps } from "./types"
import { bankOptions } from "~helpers/schemas"

export default function BankSelect(props: BankSelectProps) {
  const id = useRef(`bank-select-${crypto.randomUUID()}`)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLabel = e.target.value
    const match = bankOptions.find((option) => option.label === selectedLabel)
    if (match && props.onChange) {
      props.onChange(match.value)
    }
  }

  return (
    <div>
      <label htmlFor={id.current} className="form-label m-0">
        <strong>Banco</strong>
      </label>
      <input
        {...props}
        list="bank-options"
        onChange={handleChange}
        className="form-control"
        id={id.current}
        placeholder="Escribe/Selecciona el nombre del banco"
      />
      <datalist id="bank-options">
        {bankOptions.map((option) => (
          <option key={option.value} value={option.label} />
        ))}
      </datalist>
    </div>
  )
}

