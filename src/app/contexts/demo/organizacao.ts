export interface Org { 
    id?:                   string;   
    nome:                  string;
    credenciais:           Credentials;
    cnpj:                  string;
    instituicao_de_ensino: boolean;
    info:                  string;
    contato_principal:     Contact;
    contato_candidaturas?: Contact;
    endereco:              Address;
    website:               string;
    redes_sociais?:        string[];
    criado_em?:            Date;
    atualizado_em?:        Date;
}


export interface Contact {
    id?:      string;   
    email:    string;
    telefone: string;
    tipo?:    string;
}


export interface Credentials {
    email:  string;
    senha?: string;
}


export interface OrgSummary {
    nome: string;
    id:   string;
    ie:   boolean;
}


export interface Address {
    id?:     string;
    rua?:    string;
    bairro?: string;
    tipo?:   string;
    cidade:  string;
    estado:  string;
    pais:    string;
}

