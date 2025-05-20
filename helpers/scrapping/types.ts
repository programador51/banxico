export interface XMLSPEI {
    "?xml":       XML;
    SPEI_Tercero: SPEITercero;
}

export interface XML {
    version:  string;
    encoding: string;
}

export interface SPEITercero {
    Beneficiario:      Beneficiario;
    Ordenante:         Ordenante;
    FechaOperacion:    string;
    Hora:              string;
    ClaveSPEI:         string;
    sello:             string;
    numeroCertificado: string;
    cadenaCDA:         string;
    claveRastreo:      string;
}

export interface Beneficiario {
    BancoReceptor: string;
    Nombre:        string;
    TipoCuenta:    string;
    Cuenta:        string;
    RFC:           string;
    Concepto:      string;
    IVA:           string;
    MontoPago:     string;
}

export interface Ordenante {
    BancoEmisor: string;
    Nombre:      string;
    TipoCuenta:  string;
    Cuenta:      string;
    RFC:         string;
}
