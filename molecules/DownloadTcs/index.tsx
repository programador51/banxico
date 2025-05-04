import React from "react"

export default function DownlaodTcs({ data }: { data: any }) {
  function downloadJSONAsCSV(data, filename = "data.csv") {
    if (!data.length) return

    // Extract CSV headers
    const headers = Object.keys(data[0])
    const csvRows = []

    // Add headers
    csvRows.push(headers.join(","))

    // Add rows
    for (const row of data) {
      const values = headers.map((header) => {
        const val = row[header]
        // Escape double quotes and commas
        const escaped = `${val}`.replace(/"/g, '""')
        return `"${escaped}"`
      })
      csvRows.push(values.join(","))
    }

    // Combine rows
    const csvContent = csvRows.join("\n")

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.display = "none"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button onClick={()=>downloadJSONAsCSV(data)} className="download">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
    </button>
  )
}
