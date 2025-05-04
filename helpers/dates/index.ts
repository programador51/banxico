
export function customDate(fecha: Date): string {
  const diaSemana = new Intl.DateTimeFormat("es-MX", {
    weekday: "long"
  }).format(fecha)

  const dia = fecha.getDate()
  const mes = new Intl.DateTimeFormat("es-MX", {
    month: "short"
  }).format(fecha)
  const año = fecha.getFullYear()

  return `${diaSemana}, ${dia}/${mes}/${año}`
}

export function alertAtMidnightMexico(callback: () => void): void {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Mexico_City",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })

  const getMexicoNow = (): Date => {
    const parts = formatter.formatToParts(new Date())
    const map: Record<string, string> = {}
    parts.forEach(({ type, value }) => {
      map[type] = value
    })

    const dateStr = `${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}:${map.second}`
    return new Date(dateStr)
  }

  const mexicoNow = getMexicoNow()

  // Calcular la próxima medianoche en hora de México
  const nextMidnight = new Date(mexicoNow)
  nextMidnight.setHours(24, 1, 0, 0) // 00:00:00 del día siguiente

  const delay = nextMidnight.getTime() - mexicoNow.getTime()
  
  setTimeout(() => {
    callback()
  }, delay)
}

export function alertAtMidnightMexicoRecurring(callback: () => void): void {
  const runOnce = () => {
    alertAtMidnightMexico(() => {
      callback()
      runOnce() // vuelve a programarse para la siguiente noche
    })
  }

  runOnce()
}
