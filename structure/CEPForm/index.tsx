import { yupResolver } from "@hookform/resolvers/yup"
import React, { Fragment, useState } from "react"
import DatePicker from "react-date-picker"

import BankSelect from "~molecules/BankSelect"

import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"

import { Controller, useForm } from "react-hook-form"

import Money from "~atoms/Money"
import { cep } from "~helpers/schemas"
import type { CepDto, CepFormSchema } from "~helpers/schemas/types"
import { validateCep } from "~helpers/scrapping"
import { getWebhook, sendWebHookSignal } from "~helpers/storage"
import Account from "~molecules/Account"
import CriteriaBank from "~molecules/CriteriaBank"
import CriteriaField from "~molecules/CriteriaField"
import Webhook from "~structure/Webhook"

import ui from "./styles.module.scss"

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]
export default function CEPForm() {
  const [value, onChange] = useState<Value>(new Date())
  const [isValidating, setIsValidating] = useState(false)

  const form = useForm<CepFormSchema>({
    resolver: yupResolver(cep),
    criteriaMode: "all",
    mode: "all",

    defaultValues: {
      tipoCriterio: "R"
    }
  })

  const type = form.watch("tipoCriterio")

  const onSubmit = async (data: CepFormSchema) => {
    let dto: CepDto = {
      ...data,
      fecha: data.fecha
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("-")
    }
    setIsValidating(true)
    const isSuccess = await validateCep(dto)

    if (isSuccess) {
      alert("La transferencia es válida")

      const dto = await getWebhook("webhookCep")

      let init = {}

      try {
        init = JSON.parse(`${dto.init}`)
      } catch (error) {
        init = {}
      }

      sendWebHookSignal({
        ...dto,
        init: {
          ...init,
          body: JSON.stringify(data)
        }
      })
    } else {
      alert(
        "La transferencia no es válida. Revisa que la operación se halla realizado con éxito o haber proporcionado los datos correctos en el formulario"
      )
    }

    setIsValidating(false)
  }

  return (
    <Fragment>
      <form
        className="mb-3"
        onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}>
        <h2>Emisor</h2>

        <div className={ui.fields}>
          <Controller
            name="fecha"
            control={form.control}
            render={({ field }) => (
              <Fragment>
                <DatePicker
                  className={"form-control"}
                  onChange={(date) => {
                    onChange(date)
                    field.onChange(date)
                  }}
                  value={value}
                  maxDate={new Date()}
                  calendarIcon={null}
                  clearIcon={null}
                />
                <p className="invalid-feedback d-block m-0">
                  {form.formState.errors?.fecha?.message}
                </p>
              </Fragment>
            )}
          />
          <Controller
            name="emisor"
            render={({ field }) => (
              <Fragment>
                <BankSelect onChange={(e) => field.onChange(e)} />
                <p className="invalid-feedback d-block m-0">
                  {form.formState.errors?.emisor?.message}
                </p>
              </Fragment>
            )}
            control={form.control}
          />

          <Controller
            name="tipoCriterio"
            render={({ field }) => (
              <Fragment>
                <CriteriaBank onChange={(e) => field.onChange(e)} />
                <p className="invalid-feedback d-block m-0">
                  {form.formState.errors?.criterio?.message}
                </p>
              </Fragment>
            )}
            control={form.control}
          />

          <Controller
            name="criterio"
            render={({ field }) => (
              <Fragment>
                <CriteriaField
                  type={type}
                  onChange={(e) => field.onChange(e)}
                />
                <p className="invalid-feedback d-block m-0">
                  {form.formState.errors?.criterio?.message}
                </p>
              </Fragment>
            )}
            control={form.control}
          />
        </div>

        <h2>Receptor</h2>

        <div className={ui.fields}>
          <Controller
            name="receptor"
            render={({ field }) => (
              <Fragment>
                <BankSelect onChange={(e) => field.onChange(e)} />
                <p className="invalid-feedback d-block m-0">
                  {form.formState.errors?.receptor?.message}
                </p>
              </Fragment>
            )}
            control={form.control}
          />

          <Controller
            name="monto"
            render={({ field }) => (
              <Fragment>
                <Money onChange={(e) => field.onChange(e.target.value)} />
                <p className="invalid-feedback d-block m-0">
                  {form.formState.errors?.monto?.message}
                </p>
              </Fragment>
            )}
            control={form.control}
          />

          <Controller
            name="cuenta"
            render={({ field }) => (
              <Fragment>
                <Account onChange={(e) => field.onChange(e.target.value)} />
                <p className="invalid-feedback d-block m-0">
                  {form.formState.errors?.cuenta?.message}
                </p>
              </Fragment>
            )}
            control={form.control}
          />
        </div>

        <div className="d-grid gap-2">
          <button
            className="btn btn-primary btn-sm"
            type="submit"
            disabled={isValidating}>
            {isValidating ? "Validando" : "Validar"}
          </button>
        </div>
      </form>

      <Webhook type="webhookCep" />
    </Fragment>
  )
}
