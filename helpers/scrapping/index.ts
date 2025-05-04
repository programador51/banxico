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
