export interface Job {
    id?:                   string;
    titulo:                string;
    criado_por?:           OrgSummary;
    descricao:             string;
    requisitos:            string[];
    areas:                 Area[];
    carga_horaria_semanal: number;
    remuneracao:           number;
    periodo:               string;
    nivel:                 string;
    formato:               string;
    duracao_meses:         number;
    imagem_url?:           string;
    endereco:              Endereco;
    contato:               Contato;
    destinatarios:         OrgSummary[];
}

export interface Area {
    name: string;
    id:   string;
}

export interface Contato {
    id:       string;
    tipo:     string;
    email:    string;
    telefone: string;
}

export interface OrgSummary {
    nome: string;
    id:   string;
    ie:   boolean;
}

export interface Endereco {
    id:     string;
    tipo:   string;
    rua:    string;
    bairro: string;
    cidade: string;
    estado: string;
    pais:   string;
}
