import React from "react"

import type { XMLSPEI } from "~helpers/scrapping/types"

import ui from "./styles.module.scss"

// import ui from "~structure/SPEI/styles.scss"

export default function SPEI(data: XMLSPEI) {
  if (!data || !data.SPEI_Tercero)
    return <div className="spei-viewer">No data</div>

  const { SPEI_Tercero } = data
  const { Beneficiario, Ordenante } = SPEI_Tercero

  function formatToMexicoTime(datetimeStr: string) {
    // Replace the first colon after the date with 'T' to make it ISO-compliant
    const isoString = datetimeStr.replace(":", "T")
    const date = new Date(isoString)

    if (!date) return "ND" // Return null if invalid date

    const formatter = new Intl.DateTimeFormat("es-MX", {
      timeZone: "America/Mexico_City",
      weekday: "long", // Lunes, Martes...
      year: "numeric",
      month: "long", // enero, febrero...
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    })

    return formatter.format(date);

  }

  return (
    <div className={ui["spei-viewer"]}>
      <h2 className="text-center">Comprobante CEP</h2>

      <section>
        <h3 className="text-info">Datos de la Transferencia</h3>
        <p>
          <strong>Fecha de Operación:</strong>{" "}
          {formatToMexicoTime(
            `${SPEI_Tercero.FechaOperacion}:${SPEI_Tercero.Hora}`
          )}
        </p>

        <p>
          <strong>Clave SPEI:</strong> {SPEI_Tercero.ClaveSPEI}
        </p>
        <p>
          <strong>Clave de Rastreo:</strong> {SPEI_Tercero.claveRastreo}
        </p>
        <p>
          <strong>Número de Certificado:</strong>{" "}
          {SPEI_Tercero.numeroCertificado}
        </p>
        <p>
          <strong>Cadena CDA:</strong> {SPEI_Tercero.cadenaCDA}
        </p>
        <p>
          <strong>Sello:</strong> {SPEI_Tercero.sello}
        </p>
      </section>

      <section>
        <h3 className="text-info">Beneficiario</h3>
        <p>
          <strong>Banco Receptor:</strong> {Beneficiario.BancoReceptor}
        </p>
        <p>
          <strong>Nombre:</strong> {Beneficiario.Nombre}
        </p>
        <p>
          <strong>Tipo de Cuenta:</strong> {Beneficiario.TipoCuenta}
        </p>
        <p>
          <strong>Cuenta:</strong> {Beneficiario.Cuenta}
        </p>
        <p>
          <strong>Concepto:</strong> {Beneficiario.Concepto}
        </p>
        <p>
          <strong>IVA:</strong> {Beneficiario.IVA}
        </p>
        <p>
          <strong>Monto de Pago:</strong> ${Beneficiario.MontoPago}
        </p>
      </section>

      <section>
        <h3 className="text-info">Ordenante</h3>
        <p>
          <strong>Banco Emisor:</strong> {Ordenante.BancoEmisor}
        </p>
        <p>
          <strong>Nombre:</strong> {Ordenante.Nombre}
        </p>
        <p>
          <strong>Tipo de Cuenta:</strong> {Ordenante.TipoCuenta}
        </p>
        <p>
          <strong>Cuenta:</strong> {Ordenante.Cuenta}
        </p>
      </section>
    </div>
  )
}
