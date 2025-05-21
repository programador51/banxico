import React, { useRef } from "react"

export default function Account(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  const id = useRef(`${window.crypto.randomUUID()}`)

  return (
    <div className="has-success">
      <label className="form-label m-0" htmlFor={id.current}>
        <strong>Cuenta </strong>
      </label>
      <input
        placeholder="Escribe aquí"
        type="text"
        id={id.current}
        className="form-control"
        {...props}
      />
    </div>
  )
}
