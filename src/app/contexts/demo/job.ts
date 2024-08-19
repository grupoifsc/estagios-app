import { Contact, Address, OrgSummary } from "./organizacao";

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
    endereco:              Address;
    contato:               Contact;
    destinatarios:         OrgSummary[];
    criado_em:             Date;
    atualizado_em:         Date;
    moderacao?:            Moderacao
}

export interface Moderacao {
    status?:            String,
    modificado_em?:     Date,
}


export interface Area {
    name: string;
    id:   string;
}


export interface JobEntryData {
    titulo:                string;
    descricao:             string;
    requisitos:            string[];
    areas_ids:             string[];
    carga_horaria_semanal: number;
    remuneracao:           number;
    periodo:               string;
    nivel:                 string;
    formato:               string;
    duracao_meses:         number;
    data_inicio?:          Date;
    data_fim?:             Date;
    imagem_url:            string;
    endereco_id:           string;
    contato_id:            string;
    destinatarios_ids:     string[];
}

