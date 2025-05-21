import React from "react"

export default function Money(props:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <div>
      <label className="form-label m-0">
        <strong>Monto del pago</strong>
      </label>
      <div>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
            {...props}
          />
        </div>
      </div>
    </div>
  )
}
