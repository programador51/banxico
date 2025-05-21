import * as yup from "yup"

import type { BankOption } from "~molecules/BankSelect/types"

export const bankOptions: BankOption[] = [
  { value: "40133", label: "ACTINVER" },
  { value: "40062", label: "AFIRME" },
  { value: "90721", label: "albo" },
  { value: "90706", label: "ARCUS FI" },
  { value: "90659", label: "ASP INTEGRA OPC" },
  { value: "40128", label: "AUTOFIN" },
  { value: "40127", label: "AZTECA" },
  { value: "37166", label: "BaBien" },
  { value: "40030", label: "BAJIO" },
  { value: "40002", label: "BANAMEX" },
  { value: "40154", label: "BANCO COVALTO" },
  { value: "37006", label: "BANCOMEXT" },
  { value: "40137", label: "BANCOPPEL" },
  { value: "40160", label: "BANCO S3" },
  { value: "40152", label: "BANCREA" },
  { value: "37019", label: "BANJERCITO" },
  { value: "40147", label: "BANKAOOL" },
  { value: "40106", label: "BANK OF AMERICA" },
  { value: "40159", label: "BANK OF CHINA" },
  { value: "37009", label: "BANOBRAS" },
  { value: "40072", label: "BANORTE" },
  { value: "40058", label: "BANREGIO" },
  { value: "40060", label: "BANSI" },
  { value: "2001", label: "BANXICO" },
  { value: "40129", label: "BARCLAYS" },
  { value: "40145", label: "BBASE" },
  { value: "40012", label: "BBVA MEXICO" },
  { value: "40112", label: "BMONEX" },
  { value: "90677", label: "CAJA POP MEXICA" },
  { value: "90683", label: "CAJA TELEFONIST" },
  { value: "90715", label: "Cartera Digital" },
  { value: "90630", label: "CB INTERCAM" },
  { value: "40143", label: "CIBANCO" },
  { value: "90631", label: "CI BOLSA" },
  { value: "40124", label: "CITI MEXICO" },
  { value: "90901", label: "CLS" },
  { value: "90903", label: "CoDi Valida" },
  { value: "40130", label: "COMPARTAMOS" },
  { value: "40140", label: "CONSUBANCO" },
  { value: "90652", label: "CREDICAPITAL" },
  { value: "90688", label: "CREDICLUB" },
  { value: "90680", label: "CRISTOBAL COLON" },
  { value: "90723", label: "Cuenca" },
  { value: "40151", label: "DONDE" },
  { value: "90616", label: "FINAMEX" },
  { value: "90634", label: "FINCOMUN" },
  { value: "90734", label: "FINCO PAY" },
  { value: "90689", label: "FOMPED" },
  { value: "90699", label: "FONDEADORA" },
  { value: "90685", label: "FONDO (FIRA)" },
  { value: "90601", label: "GBM" },
  { value: "40167", label: "HEY BANCO" },
  { value: "37168", label: "HIPOTECARIA FED" },
  { value: "40021", label: "HSBC" },
  { value: "40155", label: "ICBC" },
  { value: "40036", label: "INBURSA" },
  { value: "90902", label: "INDEVAL" },
  { value: "40150", label: "INMOBILIARIO" },
  { value: "40136", label: "INTERCAM BANCO" },
  { value: "40059", label: "INVEX" },
  { value: "40110", label: "JP MORGAN" },
  { value: "90661", label: "KLAR" },
  { value: "90653", label: "KUSPIT" },
  { value: "90670", label: "LIBERTAD" },
  { value: "90602", label: "MASARI" },
  { value: "90722", label: "Mercado Pago W" },
  { value: "40042", label: "MIFEL" },
  { value: "40158", label: "MIZUHO BANK" },
  { value: "90600", label: "MONEXCB" },
  { value: "40108", label: "MUFG" },
  { value: "40132", label: "MULTIVA BANCO" },
  { value: "37135", label: "NAFIN" },
  { value: "90638", label: "NU MEXICO" },
  { value: "90710", label: "NVIO" },
  { value: "40148", label: "PAGATODO" },
  { value: "90732", label: "Peibo" },
  { value: "90620", label: "PROFUTURO" },
  { value: "40156", label: "SABADELL" },
  { value: "40014", label: "SANTANDER" },
  { value: "40044", label: "SCOTIABANK" },
  { value: "40157", label: "SHINHAN" },
  { value: "90728", label: "SPIN BY OXXO" },
  { value: "90646", label: "STP" },
  { value: "90703", label: "TESORED" },
  { value: "90684", label: "TRANSFER" },
  { value: "40138", label: "UALA" },
  { value: "90656", label: "UNAGRA" },
  { value: "90617", label: "VALMEX" },
  { value: "90605", label: "VALUE" },
  { value: "90608", label: "VECTOR" },
  { value: "40113", label: "VE POR MAS" },
  { value: "40141", label: "VOLKSWAGEN" }
]

export const cep = yup
  .object({
    tipoCriterio: yup
      .string()
      .oneOf(
        ["R", "T"],
        'El criterio debe ser por referencia o clave ("R" o "T")'
      )
      .required("Campo obligatorio"),
    fecha: yup
      .date()
      .max(new Date(), "La fecha limite es la actual")
      .required("La fecha de la transferencia es obligatoria"),
    criterio: yup.string().min(1, "Al menos 1 caracter").trim(),
    emisor: yup
      .string()
      .oneOf(
        bankOptions.map((item) => item.value),
        "El banco seleccionado no es válido"
      )
      .required("El banco es requerido"),
    receptor: yup
      .string()
      .oneOf(
        bankOptions.map((item) => item.value),
        "El banco seleccionado no es válido"
      )
      .required("El banco es requerido"),
    cuenta: yup
      .string()
      .min(1, "Al menos 1 caracter")
      .required("La cuenta del receptor es obligatoria").trim(),
    receptorParticipante: yup.number().default(0),
    monto: yup
      .number()
      .moreThan(0, "El monto debe ser mayor a $0.00")
      .required("El monto es obligatorio"),
    captcha: yup.string().default("c"),
    tipoConsulta: yup.number().default(1)
  })
  .required()
