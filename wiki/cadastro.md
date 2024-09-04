# Cadastro

Você tem a opção de realizar o cadastro da empresa ou Instituição de Ensino (IE) que você representa por meio de um formulário Web ou por requisições HTTP para a API.

Para ambos os casos, lembre que ao realizar o cadastro, você estará de acordo com os **Termos de Uso** e a **Política de Privacidade** encontrados nesta seção: [Termo de Uso](/sobre). Leia-os com atenção antes de prosseguir!

> Para realizar o cadastro via formulário web, siga para esta página: [Cadastro](/demo/cadastro)

 - - -

## Cadastro via API

Este endpoint permite o cadastro de uma nova instituição:

## ```POST /api/v1/orgs```

---

### 1. Request Body

Você precisa enviar no corpo de sua requisição a seguinte estrutura de dados:

- **nome**: Nome da Organização
- **credenciais**:
  - **email**: Email para autenticação no sistema. Utilize um email a que apenas as pessoas autorizadas tenham acesso
  - **senha**: Senha de autenticação
- **cnpj**: CNPJ válido da organização
- **instituicao_de_ensino**: Indica se é uma instituição de ensino (true ou false)
- **info**: Informações sobre a organização
- **contato_principal**: 
  - **email**: Principal email de contato da organização
  - **telefone**: Principal telefone de contato, com DDD
- **contato_candidaturas**: (opcional)
- **endereco**:
  - **rua**: Nome do logradouro e número
  - **bairro**: Nome do bairro
  - **cidade**: Nome da cidade
  - **estado**: sigla da UF (com apenas 2 letras)
  - **pais**: sigla do país (com apenas 3 letras)
- **website**: Website da organização (opcional)
- **redes_sociais**: Lista de redes sociais da organização (opcional)
  
#### Exemplo JSON

Um JSON enviado como requisição para o cadastro de uma organização pode ser construído assim:

```json
{
    "nome": "Nobanks",
        "credenciais": {
            "email": "nobanks@nobanks.com",
            "senha": "senhaForte42#%"
    },
    "cnpj": "18009962000177",
    "instituicao_de_ensino": false,
    "info": "Uma organização sem bancos",
    "contato_principal": {
        "email": "contato@nobanks.com",
        "telefone": "1234567890"
    },
    "contato_candidaturas": {
        "email": "candidaturas@nobanks.com",
        "telefone": "0987654321"
    },
    "endereco": {
        "rua": "Rua Exemplo, 501",
        "bairro": "Centro",
        "cidade": "Cidade Exemplo",
        "estado": "CE",
        "pais": "BRA"
    },
    "website": "https://nobanks.com",
    "redes_sociais": [
        "https://twitter.com/nobanks",
        "https://facebook.com/nobanks"
    ]
}'
```

### 2. Requisição

Veja a seguir um exemplo de requisição http:

```http
POST '/api/v1/orgs' 
Content-Type: 'application/json'
{
    "nome": "Nobanks",
        "credenciais": {
        "email": "nobanks@nobanks.com",
        "senha": "senhaForte42#%"
    },
    "cnpj": "18009962000177",
    "instituicao_de_ensino": false,
    "info": "Uma organização sem bancos",
    "contato_principal": {
        "email": "contato@nobanks.com",
        "telefone": "1234567890"
    },
    "contato_candidaturas": {
        "email": "candidaturas@nobanks.com",
        "telefone": "0987654321"
    },
    "endereco": {
        "rua": "Rua Exemplo, 501",
        "bairro": "Centro",
        "cidade": "Cidade Exemplo",
        "estado": "CE",
        "pais": "BRA"
    },
    "website": "https://nobanks.com",
    "redes_sociais": [
        "https://twitter.com/nobanks",
        "https://facebook.com/nobanks"
    ]
}
```

### 3. Respostas

Resposta de sucesso:

- **201 Created**: Se tudo ocorreu bem na sua solicitação, espere esta resposta da aplicação, indicando que o cadastro foi realizado e retornando no body o ID e os dados do perfil de sua organização

Os erros mais comuns para esta solicitação são:

- **400 Bad Request**: Solicitação inválida. Verifique o formato e os dados enviados.

- **429 Too Many Requests**: Você excedeu o limite de requisições.
