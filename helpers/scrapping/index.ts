import { XMLParser } from "fast-xml-parser"

import type { CepDto } from "~helpers/schemas/types"

import type { XMLSPEI } from "./types"

export async function scrapBanxico() {
  try {
    const res = await fetch(
      `https://www.banxico.org.mx/tipcamb/tipCamMIAction.do?idioma=sp`
    )
    const html = await res.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")

    const rowsPartA = doc.querySelectorAll(`tr.renglonPar`)
    const rowsPartB = doc.querySelectorAll(`tr.renglonNon`)

    const merged = [...rowsPartA, ...rowsPartB]

    const scrapTc = merged.map((row) => {
      const cells = row.querySelectorAll("td")

      const [day, month, year] = cells[0]?.textContent.trim().split("/")

      const txtFIX = cells[1]?.textContent.trim()
      const txtDOF = cells[2]?.textContent.trim()
      const txtPayments = cells[3]?.textContent.trim()
      const noAvailable = `N/E`

      return {
        date: new Date(`${year}-${month}-${day}:`),
        fix: txtFIX === noAvailable ? 0 : +txtFIX,
        dof: txtDOF === noAvailable ? 0 : +txtDOF,
        forPayments: txtPayments === noAvailable ? 0 : +txtPayments
      }
    })

    const tcs = scrapTc.sort((a, b) => b.date.getTime() - a.date.getTime())
    return tcs
  } catch (error) {
    return []
  }
}

/**
 * Validate if the xml is `OK`against BANXICO
 * @param xml - XML file "downloaded" from the CEP PORTAL
 * @returns Flag indicating if the file is actually valid against BANXICO
 */
export async function validateCEP(xml: File | Blob): Promise<null | XMLSPEI> {
  try {
    const isAnXml = xml.type === "text/xml"

    if (!isAnXml) {
      alert("Por favor, sube un archivo xml")
      return null
    }

    const formData = new FormData()
    formData.append("file[0]", xml)

    const res = await fetch(
      `https://www.banxico.org.mx/validador-cep-spei/Validador`,
      {
        method: "POST",
        body: formData
      }
    )

    const htmlContent = await res.text()

    const isValidXml = checkIsValidXml(htmlContent)

    if (!isValidXml) {
      alert("El CEP no es válido, no esta registrado en BANXICO")
      return null
    }

    const txtXml = await readBlobAsText(xml)

    const parser = new XMLParser({
      ignoreAttributes: false, // keep all XML attributes
      attributeNamePrefix: "", // no "@" before attribute names
      allowBooleanAttributes: true // for completeness
    })

    const json: XMLSPEI = parser.parse(txtXml)

    return json
  } catch (error) {
    console.log(error)
    alert("El CEP no es válido, no esta registrado en BANXICO")

    return null
  }
}

export function readHTML(html:string){
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html");
  return doc;
}

export function checkIsValidXml(html: string) {
  // Parse HTML string into DOM
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")

  // Select the formatted-table
  const table = doc.querySelector("table.formatted-table")

  if (table) {
    const thirdTd = table.querySelector("tbody tr td:nth-child(3)")
    if (thirdTd) {
      const value = parseInt(thirdTd.textContent.trim(), 10)
      if (value === 1) {
        return false
      } else if (value === 0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}

async function readBlobAsText(blob: Blob | File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)

    reader.readAsText(blob) // Read as UTF-8 text
  })
}

export async function validateCep(dto: CepDto) {
  const queryString = toQueryParams(dto)

  try {
    const res = await fetch(
      `https://www.banxico.org.mx/cep/valida.do?${queryString}`,{
        method:"POST"
      }
    );
    const html = await res.text()

    const doc = readHTML(html);

    const containerRes = doc.querySelector('#dSeleccionaFormato');

    if(!containerRes) return false;

    return true;

    
  } catch (error) {
    return false
  }
}

function toQueryParams(obj: Record<string, any>): string {
  return Object.entries(obj)
    .map(
      ([key, val]) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(String(val))
    )
    .join("&")
}
