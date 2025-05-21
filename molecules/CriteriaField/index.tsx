import React, { useRef } from "react"

import type { PropsCriteriaField } from "./types"

export default function CriteriaField(props: PropsCriteriaField) {
  const id = useRef(`${window.crypto.randomUUID()}`)

  const { type } = props

  const inputProps = { ...props }
  delete inputProps.type

  return (
    <div className="has-success">
      <label className="form-label m-0" htmlFor={id.current}>
        <strong>
          {type === "R" ? "Número de referencia" : "Clave de rastreo"}
        </strong>
      </label>
      <input
      placeholder="Escribe aquí"
        type="text"
        id={id.current}
        className="form-control"
        {...inputProps}
      />
    </div>
  )
}
