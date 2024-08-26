# Autenticação

Para lidar com a autenticação e autorização do do sistema de sua organização, utilizamos a estratégia de autenticação baseada em JWT (JSON Web Token). O sistema utiliza duas formas de tokens para gerenciar o acesso: accessToken e refreshToken.

## Fluxo de Autenticação

### 1. Obtenção dos Tokens

O primeiro passo para autenticação é obter os tokens. Para isso, você deve enviar uma solicitação de login para o endpoint `/auth/login` com suas credenciais (email e senha). Se as credenciais forem válidas, a resposta incluirá um accessToken e um refreshToken.

Exemplo de solicitação de login:

```http
POST /auth/login
Content-Type: application/json
{
  "email": "seu_email",
  "senha": "sua_senha"
}
```

Resposta:

```json
{
  "status": "success",
  "data": {
    "accessToken": "seu_access_token",
    "refreshToken": "seu_refresh_token"
  }
}
```

### 2. Utilização do accessToken

Após receber o accessToken, você deve incluí-lo no cabeçalho de autorização em todas as suas solicitações HTTP para acessar recursos protegidos da API. Esta será a sua forma de autenticação e autorização.

Exemplo de solicitação com accessToken:

```http
GET /org/vagas/owned
Authorization: Bearer seu_access_token
```

### 3. AccessToken expirado

Quando o accessToken expira, a aplicação cliente precisa detectar a expiração para solicitar um novo token usando o refreshToken.

A identificação de um accessToken expirado ocorre quando uma solicitação para um endpoint protegido retorna um erro de autenticação, como um código de status HTTP 401 Unauthorized, mesmo com o envio do accessToken.

Exemplo de resposta de erro devido a accessToken expirado:

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json
{
  "status": "error",
  "code: 401,
  "message": "Access token expired"
}
```

Sua aplicação deve estar preparada para checar estas respostas de erro em cada requisição para ser capaz de atualizar o accessToken.

### 3. Atualização do accessToken

Quando a aplicação detecta que o accessToken expirou, ela deve enviar uma solicitação para o endpoint `/auth/refresh_token` usando o refreshToken obtido anteriormente. O refreshToken deve ser incluído no corpo da solicitação para obter um novo accessToken.

Exemplo de solicitação para renovar o accessToken:

```http
POST /auth/refresh_token
Content-Type: application/json
{
  "refreshToken": "seu_refresh_token"
}
```

Resposta:

```json
{
  "status": "success",
  "data": {
    "accessToken": "novo_access_token",
    "refreshToken": "novo_refresh_token"
  }
}
```

Após receber o novo accessToken, a aplicação cliente deve atualizar o token armazenado e repetir a solicitação original que falhou devido à expiração do token.

Com o novo accessToken, a aplicação pode continuar a acessar os recursos protegidos sem precisar realizar a autenticação completa de login novamente.

Este processo ajuda a proteger suas informações sensíveis, como email de login, senha ou segredos da aplicação.
