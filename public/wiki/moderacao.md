# Moderação

Esta seção é exclusiva para Instituições de Ensino (IEs) entenderem como podem moderar e gerenciar as vagas em nossa plataforma.

Entendemos que é essencial que todas as vagas divulgadas estejam em conformidade com os códigos de conduta da IE e garantam a segurança e a qualidade das informações para a comunidade estudantil.

## Moderação de Vagas

As instituições de ensino têm a responsabilidade de moderar as vagas recebidas e garantir que apenas anúncios apropriados sejam divulgados para os alunos. É importante ter cuidado ao gerenciar os diferentes tipos de informações e endpoints disponíveis.

## 1. Endpoints de Vagas Não Moderadas

**Existem endpoints que mostram vagas que ainda não passaram pelo processo de moderação**. Essas vagas podem ser de outras organizações e ainda não foram verificadas pela sua instituição. Estes são os pontos onde você deve estar particularmente atento:

## `GET /api/v1/org/vagas/recebidas`

```http
GET '/api/v1/org/vagas/recebidas'
Authentication: Bearer <seu_access_token>
```

Descrição: Este endpoint lista como uma busca paginada todas as vagas que sua instituição recebeu de outras organizações. **Antes de permitir que qualquer uma dessas vagas seja divulgada, é crucial revisar o conteúdo para garantir que esteja livre de informações maldosas ou que não viole o código de conduta da sua instituição.**

## 2. Processo de Moderação

Para garantir que apenas as vagas apropriadas sejam divulgadas, sua instituição pode moderar as vagas recebidas. O processo de moderação envolve aceitar ou rejeitar as vagas de acordo com as diretrizes estabelecidas. Aqui está como você pode gerenciar isso:

### Aceitar uma Vaga

### `PUT /api/v1/org/vagas/disponiveis`

```http
PUT '/api/v1/org/vagas/disponiveis'
Authentication: Bearer <seu_access_token>
Content-Type: 'application/json'
{
    ["<vaga_id>", "<vaga_id>"]
}
```

Descrição: Use este endpoint para aceitar e liberar uma vaga para divulgação. Após a aceitação, a vaga será movida para o endpoint de vagas disponíveis e será visível para a comunidade estudantil.

### Rejeitar uma Vaga

### `PUT /api/v1/org/vagas/rejeitadas`

```http
PUT '/api/v1/org/vagas/rejeitadas'
Authentication: Bearer <seu_access_token>
Content-Type: 'application/json'
{
    ["<vaga_id>", "<vaga_id>"]
}
```

Descrição: Use este endpoint para rejeitar uma vaga que não esteja em conformidade com os critérios ou o código de conduta da instituição. A vaga rejeitada não será exibida para a comunidade estudantil.

## 3. Vagas Disponíveis

Após a moderação, apenas as vagas que foram aceitas ou criadas diretamente pela instituição aparecerão em:

## `GET /api/v1/org/vagas/disponiveis`

```http
GET '/api/v1/org/vagas/disponiveis'
Authentication: Bearer <seu_access_token>
```

Descrição: Este endpoint mostra todas as vagas que foram aceitas e estão prontas para divulgação. É aqui que os alunos podem encontrar as vagas seguras e aprovadas pela sua instituição.

## 4. Dicas de Moderação

**Revise com Atenção**: Sempre revise o conteúdo das vagas recebidas antes de aceitá-las para garantir que estejam de acordo com o código de conduta da instituição.

**Cuidado com Informações Maliciosas**: Fique atento a qualquer conteúdo que possa ser prejudicial ou inapropriado.

**Mantenha a Transparência**: Assegure-se de que o processo de moderação seja claro e transparente para manter a confiança dos alunos e das organizações parceiras.
