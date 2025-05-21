import { Storage } from "@plasmohq/storage"

import type { WebHook, WebHookCep } from "./types"

const KEY_WEBHOOK = "webhookCep"
const KEY_WEBHOOK_XML = "webhookXml"

export async function getWebhookCep(): Promise<WebHookCep> {
  const storage = new Storage()

  const webhook = (await storage.get(KEY_WEBHOOK)) as undefined | WebHookCep // "value"

  if (!webhook) {
    // const init: RequestInit = {}

    await storage.set(KEY_WEBHOOK, {
      url: "",
      init:""
    })

    const data = (await storage.get(KEY_WEBHOOK)) as WebHookCep
    return data
  }

  return webhook
}

export async function setStorageValue(key: WebHook, value: WebHookCep) {
  const storage = new Storage()

  await storage.set(key, value)
}

export async function getWebhook(key: WebHook): Promise<WebHookCep> {
  const storage = new Storage()

  const data = (await storage.get(key)) as WebHookCep
  return data
}

export async function sendWebHookSignal(dto: WebHookCep) {

    console.log(dto)

  try {
    const res = await fetch(dto.url, {
      ...dto.init,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...dto.init.headers
      }
    })

    if (!res.ok) {
      alert(
        "El webhook fue enviado pero su sistema no lo procesó correctamente"
      )
    }

    return res.ok
  } catch (error) {
    return false
  }
}
