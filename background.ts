import banxico from "data-base64:~assets/banxico.jpg"
import { alertAtMidnightMexicoRecurring } from "~helpers/dates"

alertAtMidnightMexicoRecurring(() => {
  chrome.notifications.create({
    type: "basic",
    iconUrl: banxico,
    title: `BANXICO`,
    message: `Tipos de cambio actualizado`,
    priority: 0
  })
})

export {}
