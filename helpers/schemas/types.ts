export interface CepFormSchema {
  tipoCriterio: "R" | "T"
  fecha: Date
  criterio: string
  emisor: string
  receptor: string
  cuenta: string
  receptorParticipante: number
  monto: number
  captcha: string
  tipoConsulta: number
}

export interface CepDto extends Omit<CepFormSchema, "fecha"> {
  fecha: string
}
