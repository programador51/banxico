import React, { useRef } from "react"

import type { PropsCriteriaBank } from "./types"

export default function CriteriaBank(props: PropsCriteriaBank) {
  const id = useRef(`${window.crypto.randomUUID()}`)

  return (
    <div>
      <label htmlFor={id.current} className="form-label m-0">
        <strong> Criterio de busqueda</strong>{" "}
      </label>
      <select
        className="form-select"
        {...props}
        onChange={(e) =>
          props.onChange && props.onChange(e.target.value as "T" | "R")
        }>
        <option value="T">Clave de rastreo</option>
        <option value="R">Número de referencia</option>
      </select>
    </div>
  )
}
