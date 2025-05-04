import React from "react"
import Copy from "~atoms/copy"
import "~molecules/TcBanxico/styles.scss"

export default function TcBanxico({ children = 0 }) {


  if (children <= 0) return <span className="text-end">N/E</span>

  return (
    <div className="tcItem">
      <Copy text={`${children}`} />
      <span className="amount"> {children}</span>
    </div>
  )
}
