import { Fragment, useEffect, useState } from "react"
import type { Tcs } from "~types"
import "~styles.scss"
import { alertAtMidnightMexicoRecurring, customDate } from "~helpers/dates"
import { scrapBanxico } from "~helpers/scrapping"
import DownlaodTcs from "~molecules/DownloadTcs"
import LinkIcon from "~molecules/LinkIcon"
import TcBanxico from "~molecules/TcBanxico"

function IndexPopup() {
  const [data, setData] = useState<Tcs[]>([])

  useEffect(() => {
    ;(async function () {
      alertAtMidnightMexicoRecurring(() => {
        scrapBanxico()
          .then((tcs) => {
            setData(tcs);
          })
          .catch(() => setData([]))
      })
    })()
  }, [])

  useEffect(() => {
    scrapBanxico()
      .then((tcs) => setData(tcs))
      .catch(() => setData([]))
  }, [])

  return (
    <div className="container">
      <div className="gridTcs">
        <span className="text-center">
          <strong> Fecha </strong>
        </span>
        <span className="text-center">
          {" "}
          <strong> FIX </strong>
        </span>
        <span className="text-center">
          {" "}
          <strong> Publicación DOF </strong>
        </span>
        <span className="text-center">
          {" "}
          <strong> Para pagos </strong>
        </span>
        {data.map((tc) => (
          <Fragment>
            <span>{customDate(tc.date)}</span>
            <TcBanxico>{tc.fix}</TcBanxico>
            <TcBanxico>{tc.dof}</TcBanxico>
            <TcBanxico>{tc.forPayments}</TcBanxico>
          </Fragment>
        ))}
      </div>

      <hr />

      <div className="actions">
        <LinkIcon>
          https://www.banxico.org.mx/tipcamb/tipCamMIAction.do?idioma=sp
        </LinkIcon>

        <DownlaodTcs
          data={data.map((tc) => ({
            Fecha: tc.date.toISOString().split("T")[0],
            FIX: tc.fix,
            "Publicacion DOF": tc.dof,
            "Para pagos": tc.forPayments
          }))}
        />
      </div>
    </div>
  )
}

export default IndexPopup
