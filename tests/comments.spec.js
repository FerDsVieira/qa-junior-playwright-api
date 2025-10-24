import { test, expect } from '@playwright/test'

test.describe('GET', () => {

  test('GET - Deve retornar um comments existente', async ({ request }) => {
    const response = await request.get('/public/v2/comments/172043') // Faz a requisição GET (se retirarmos o id de usuário retorna todos os usuarios)
    const responseJson = await response.json() // Variavel que armazena response em formato Json
    console.log(responseJson) // Exibe o corpo da response no console

    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)
    expect(response.status()).toBe(200) // Valida que o status é 200 (OK)
  })

  test('GET - Deve validar dados de retorno de um usuario existente', async ({ request }) => {
    const response = await request.get('/public/v2/comments/172043') // Faz a requisição GET
    const responseJson = await response.json() // Variavel que armazena response em formato Json
    console.log(responseJson) // Exibe o corpo da response no console

    expect(responseJson).toHaveProperty('id')
    expect(responseJson).toHaveProperty('post_id')
    expect(responseJson).toHaveProperty('name')
    expect(responseJson).toHaveProperty('email')
    expect(responseJson).toHaveProperty('body')

    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)
    expect(response.status()).toBe(200) // Valida que o status é 200 (OK)
  })

})

test.describe('POST', () => {

  test('POST - Deve realizar criação de comments e validar retorno e estrutura da response', async ({ request }) => {
    const response = await request.post('/public/v2/comments', {
      headers:{
        "Authorization": "Bearer 95f12fb31b77179d5cdafef4ca9bb5c1d7e1f08d55549d41ca1f774d886e78de"
      },
      data: {
      "id": 172043, // alterar algum campo para criar comments
      "post_id": 252765,
      "name": "Nanda Devar",
      "email": "devar_nanda@feil.test",
      "body": "Qui doloribus voluptatem. Tenetur nihil quia. Ratione quisquam tenetur."
      }
    }) // Faz a requisição POST
    const responseJson = await response.json() // Variavel que armazena response em formato Json
    console.log(responseJson) // Exibe o corpo da response no console

    expect(responseJson).toHaveProperty('id') // Valida campos de comments criado
    expect(responseJson).toHaveProperty('post_id', 252765)
    expect(responseJson).toHaveProperty('name', 'Nanda Devar')
    expect(responseJson).toHaveProperty('email', 'devar_nanda@feil.test')
    expect(responseJson).toHaveProperty('body', 'Qui doloribus voluptatem. Tenetur nihil quia. Ratione quisquam tenetur.')

    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)
    expect(response.status()).toBe(201) // Valida que o status é 201 (CREATED)
  })

})

test.describe('PUT', () => {

  test('PUT - Deve modificar totalmente dados de um usuário', async ({ request }) => {
      const response = await request.put('/public/v2/comments/172043', {
      headers:{
        "Authorization": "Bearer 95f12fb31b77179d5cdafef4ca9bb5c1d7e1f08d55549d41ca1f774d886e78de"
      },
      data: {
      "id": 172043, // alterar algum campo para editar comments
      "post_id": 252765,
      "name": "Nanda Devar",
      "email": "devar_nanda@feil.test",
      "body": "Qui doloribus voluptatem. Tenetur nihil quia. Ratione quisquam tenetur."
      }
    }) // Faz a requisição PUT
    const responseJson = await response.json() // Variavel que armazena response em formato Json
    console.log(responseJson) // Exibe o corpo da response no console

    expect(responseJson).toHaveProperty('id') // validar mudança feita no "data"
    expect(responseJson).toHaveProperty('post_id', 252765)
    expect(responseJson).toHaveProperty('name', 'Nanda Devar')
    expect(responseJson).toHaveProperty('email', 'devar_nanda@feil.test')
    expect(responseJson).toHaveProperty('body', 'Qui doloribus voluptatem. Tenetur nihil quia. Ratione quisquam tenetur.')

    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)
    expect(response.status()).toBe(200) // Valida que o status é 200 (OK)
  })

})


test.describe('DELETE', () => {

  test('DELETE - Deve deletar um usuário', async ({ request }) => {
    const response = await request.delete('/public/v2/comments/172039', {
      headers:{
        "Authorization": "Bearer 95f12fb31b77179d5cdafef4ca9bb5c1d7e1f08d55549d41ca1f774d886e78de"
      }
    }) // Faz a requisição DELETE
    const responseJson = await response.text() // Variavel que armazena response em formato Json (neste caso não possui conteudo usamo o text())
    console.log(responseJson) // Exibe o corpo da response no console

    expect(response.status()).toBe(204) // Valida que o status é 204 (NO CONTENT)
    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)

  })

})