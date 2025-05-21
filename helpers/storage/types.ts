export interface WebHookCep {
  url: string
  init: RequestInit
}

export interface WebHookState {
  url: string
  init: string
}

export type WebHook = "webhookCep" | "webhookXml"

export type StorageData = {
  type: "webhookCep"
  payload: WebHookCep
}
