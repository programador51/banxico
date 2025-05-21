import React, { Fragment, useEffect, useState } from "react"

import { getWebhookCep, setStorageValue } from "~helpers/storage"
import type { WebHook, WebHookCep, WebHookState } from "~helpers/storage/types"
import AccordionContainer from "~structure/Accordion"

export default function Webhook({ type }: { type: WebHook }) {
  const [webhook, setWebhook] = useState<WebHookState>({
    init: "",
    url: ""
  })

  useEffect(() => {
    getWebhookCep().then((data) => {
      setWebhook({
        url: data.url,
        init: `${data.init}`
      })
    })
  }, [])

  useEffect(() => {
    let init = ""

    try {
      init = JSON.stringify(webhook.init)
    } catch (error) {
      init = webhook.init
    }

    setStorageValue(type, {
      url: webhook.url,
      init: JSON.parse(init)
    })
  }, [webhook])

  const updateUrl = (url: string) => {
    setWebhook((current) => ({
      ...current,
      url
    }))
  }

  const updateInit = (init: string) => {
    setWebhook((current) => ({
      ...current,
      init
    }))
  }

  return (
    <AccordionContainer summary="⚙️ Webhook">
      <Fragment>
        <p className="m-0">
          Contacta a tu equipo de TI para que te ayude a configurar el flujo
          para las reglas de negocio de tu sistema. Si no dispones de una
          infraestructura que soporte webhooks, puedes utilizar el siguiente
          recurso para las pruebas{" "}
          <strong>
            <a href="https://webhook.site" target="_blank">
              https://webhook.site
            </a>
          </strong>
        </p>
        <p className="mt-2">
          De igual forma puedes contactar a un freelancer de confianzar para
          ayudarte a configurar el webhook:{" "}
          <strong>
            <a href="https://ko-fi.com/s/4dc3bfb118" target="_blank">
              programador51 (contacto)
            </a>
          </strong>
        </p>

        <div className="has-success">
          <label className="form-label m-0">
            <strong>URL</strong>
          </label>
          <input
            placeholder="Escribe aquí"
            type="text"
            className="form-control"
            value={webhook.url}
            onChange={(e) => updateUrl(e.target.value)}
          />
        </div>

        <div className="has-success">
          <label className="form-label m-0">
            <strong>Configuracion peticion</strong>
          </label>
          <textarea
            value={webhook.init}
            onChange={(e) => updateInit(e.target.value)}
            className="form-control"></textarea>
          <small className="form-text text-muted">
            Objeto JSON que recibe el metodo <strong>fetch</strong> para hacer
            las peticiones HTTPS. Se recomienda acompañar en los{" "}
            <strong>headers</strong> un usuario y contraseña para hacer seguras
            las llamadas de la extension con su sistema.
          </small>
        </div>
      </Fragment>
    </AccordionContainer>
  )
}
