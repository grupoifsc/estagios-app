# Criar Anúncio de Vaga

Neste tutorial você verá como a sua aplicação pode acessar os endpoints para inserir um novo anúncio, ver um anúncio criado e acessar todas as vagas criadas pela sua instituição.

Todos os endpoints deste tutorial requerem autenticação. Certifique-se de que o accessToken esteja sempre incluído nas solicitações.

## `POST /api/v1/vagas`

- - -

### Cadastrar um anúncio

Para cadastrar um novo anúncio de vaga, você precisa fazer uma solicitação POST ao endpoint de criação de anúncios.

Requer Autorização: **SIM**

#### Request Body

O corpo de sua solicitação deve incluir as seguintes informações sobre a vaga:

- **titulo**: Título da vaga (obrigatório).

- **descricao**: Descrição da vaga (obrigatório).

- **requisitos**: Lista de requisitos para a vaga (opcional). Ex: ["requisito A", "requisito B"]

- **areas_ids**: Lista de ids das áreas relacionadas à vaga (obrigatório). Veja todas as áreas por meio do endpoint `GET /api/v1/areas`

- **destinatarios_ids**: Identificadores das instituições de ensino para as quais a vaga se destina. **ATENÇÃO: Se deixado em branco, a vaga será disponibilizada para todas as instituições com acesso ao sistema enquanto a vaga estiver publicada.** Veja todas as IEs e seus ids por meio do endpoint `GET /api/v1/orgs/schools`

- **carga_horaria_semanal**: Carga horária semanal em horas (obrigatório). Apenas números.

- **remuneracao**: Remuneração da vaga (obrigatório). Apenas números.

- **periodo**: Período da vaga (obrigatório). Valores aceitos: <"matutino" | "vespertino" | "noturno">.

- **nivel**: Nível educacional requerido (obrigatório). Valores aceitos: <"fundamental" | "medio" | "tecnico" | "graduacao" | "pos">

- **formato**: Formato da vaga (obrigatório). Valores aceitos: <"presencial" | "hibrido" | "remoto">

- **duracao_meses**: Duração da vaga em meses (opcional). Apenas números

- **data_inicio**: Data de início do estágio (opcional). Formato: YYYY/MM/DD

- **data_fim**: Data de término do estágio (opcional). Formato: YYYY/MM/DD

- **imagem_url**: URL da imagem associada à vaga (opcional).

- **endereco_id**: Identificador do endereço da vaga (obrigatório). Ver seus endereços em: `GET /api/v1/org/addresses`

- **contato_id**: Identificador do contato para candidatura (obrigatório). Ver seus contatos em: `GET /api/v1/org/contacts`

#### Requisição

Veja a seguir um exemplo de requisição http para criação de anúncio de vaga:

```http
POST /api/v1/vagas
Authorization: Bearer seu_access_token
Content-Type: application/json
{
  "titulo": "Desenvolvedor FullStack Jr",
  "descricao": "Desenvolver, testar e implementar aplicações web",
  "requisitos": [
    "Lavar", "Cozinhar", "Passar", "Conhecimentos em Assembly", "4 anos de experiência"
  ],
  "areas_ids": [
    "1", "2", "3"
  ],
  "carga_horaria_semanal": 60,
  "remuneracao": 500,
  "periodo": "matutino",
  "nivel": "pos",
  "formato": "presencial",
  "duracao_meses": 3,
  "data_inicio": "2024-01-22",
  "data_fim": "2024-06-30",
  "imagem_url": "http://imagens.com/img01.png",
  "endereco_id": "1",
  "contato_id": "2",
  "destinatarios_ids": [
  ]
}
```

#### Respostas

Resposta de sucesso:

- **201 Created**: Se tudo ocorreu bem na sua solicitação, espere esta resposta da aplicação, indicando que o cadastro foi realizado e retornando no body o ID e os dados do perfil de sua organização

Os erros mais comuns para esta solicitação são:

- **400 Bad Request**: Solicitação inválida. Verifique o formato e os dados enviados.

- **401 Unauthorized**: Verifique se seu accessToken é válido e foi enviado na requisição

- **429 Too Many Requests**: Você excedeu o limite de requisições.

 - - -

## `GET /api/v1/vagas/{id}`

 - - -

### Ver uma vaga

Se você deseja ver os detalhes de uma vaga específica que você criou, você pode fazer uma solicitação GET para o endpoint de detalhes da vaga.

Requer Autorização: **SIM**

No endpoint, substitua {id} pelo identificador único da vaga que você deseja visualizar. Este identificador foi fornecido na resposta quando você criou o anúncio da vaga.

Exemplo de requisição:

```http
GET /api/v1/vagas/20
Authorization: Bearer seu_access_token
Accept: application/json
```

 - - -

## `GET /api/v1/org/vagas/owned`

 - - -

### Ver todas as vagas criadas

Para obter uma lista de todas as vagas que foram criadas pela sua organização, faça uma solicitação GET ao endpoint de listagem de vagas criadas.

Este endpoint sempre faz uma **busca paginada** na base de dados.

Requer Autorização: **SIM**

Parâmetros:

- **search** (opcional): busca por vagas que contenham o termo inserido no título

- **page** (opcional) (mínimo = 0 | padrão = 0): número da página a ser acessada. Se deixado sem o parâmetro, a busca usará o valor padrão

- **limit** (opcional) (mínimo = 1 | padrão = 10 | máximo = 50): número máximo de registros por página. Se deixado sem o parâmetro, a busca usará o valor padrão

Este endpoint retornará uma lista completa com todos os anúncios de vagas cadastrados pela sua instituição.

Exemplos de requisição sem parâmetros:

```http
GET /api/v1/org/vagas/owned
Authorization: Bearer seu_access_token
Accept: application/json
```

Exemplo de requisição com parâmetros:

```http
GET /api/v1/org/vagas/owned?search=vaga&page=0&limit=20
Authorization: Bearer seu_access_token
Accept: application/json
```

### Respostas

Resposta de sucesso:

- **200 OK**: Se tudo ocorreu bem na sua solicitação, você receberá os dados solicitados

Os erros mais comuns para estas solicitações são:

- **400 Bad Request**: Solicitação inválida. Você passou algum parâmetro inválido.

- **401 Unauthorized**: Verifique se seu accessToken é válido e foi enviado na requisição

- **403 Forbidden**: Talvez você esteja tentando acessar uma informação para a qual não tem autorização.

- **404 Unauthorized**: O recurso que você busca não existe ou você não possui acesso

- **429 Too Many Requests**: Você excedeu o limite de requisições.
