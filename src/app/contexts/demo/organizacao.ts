export interface Organizacao { 
    id?:                   string;   
    nome:                  string;
    credenciais:           Credenciais;
    cnpj:                  string;
    instituicao_de_ensino: boolean;
    info:                  string;
    contato_principal:     Contato;
    contato_candidaturas?: Contato;
    endereco:              Endereco;
    website:               string;
    redes_sociais?:        string;
    criado_em?:            Date;
    atualizado_em?:        Date;
}


export interface Contato {
    id?:      string;   
    email:    string;
    telefone: string;
}


export interface Credenciais {
    email:  string;
    senha?: string;
}

export interface Endereco {
    id?:     string;
    rua?:    string;
    bairro?: string;
    cidade:  string;
    estado:  string;
    pais:    string;
}

