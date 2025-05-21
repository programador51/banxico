import React, { useState } from "react"

import ui from "./styles.module.scss"

export default function AccordionContainer({
  children = <></>,
  summary = "Acordion"
}) {
  const [open, setIsOpen] = useState(true)

  return (
    <>
      <div className="accordion">
        <details className="accordion-item" open={open}>
          <summary
            className={`accordion-button ${open === false ? "" : "collapsed"}`}
            onClick={() => setIsOpen((current) => !current)}>
            {summary}
          </summary>
          <div className={ui.container}>{children}</div>
        </details>
      </div>
    </>
  )
}
