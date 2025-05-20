import { Fragment, useEffect, useState } from "react"

import { alertAtMidnightMexicoRecurring, customDate } from "~helpers/dates"
import { scrapBanxico, validateCEP } from "~helpers/scrapping"
import DownlaodTcs from "~molecules/DownloadTcs"
import LinkIcon from "~molecules/LinkIcon"
import TcBanxico from "~molecules/TcBanxico"
import type { Tcs } from "~types"

import "~styles.scss"

import type { XMLSPEI } from "~helpers/scrapping/types"
import SPEI from "~structure/SPEI"

function IndexPopup() {
  const [data, setData] = useState<Tcs[]>([])
  const [xml, setXml] = useState<File | Blob | null>(null)
  const [spei, setSpei] = useState<null | XMLSPEI>(null)

  useEffect(() => {
    ;(async function () {
      alertAtMidnightMexicoRecurring(() => {
        scrapBanxico()
          .then((tcs) => {
            setData(tcs)
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

  const handleFiles = async (e) => {
    setSpei(null)
    const file = e.target.files[0]
    if (!file) return

    setXml(file)
    const speiInfo = await validateCEP(file)

    if (speiInfo) setSpei(speiInfo)
  }

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

      <hr />
          
      <div>
        {xml===null && <p className="m-0 mb-2">Carga un archivo XML para validar la transferencia CEP</p>}
        <label htmlFor="formFile" className="form-label m-0">
          <strong>Validar CEP</strong>
        </label>
        <input
          className="form-control"
          type="file"
          accept=".xml"
          id="formFile"
          onChange={handleFiles}
        />

        {spei && <SPEI {...spei} />}
      </div>
    </div>
  )
}

export default IndexPopup
