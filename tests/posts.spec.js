import { test, expect } from '@playwright/test'

test.describe('GET', () => {

  test('GET - Deve retornar um post existente', async ({ request }) => {
    const response = await request.get('/public/v2/posts/252765') // Faz a requisição GET (se retirarmos o id de usuário retorna todos os usuarios)
    const responseJson = await response.json() // Variavel que armazena response em formato Json
    console.log(responseJson) // Exibe o corpo da response no console

    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)
    expect(response.status()).toBe(200) // Valida que o status é 200 (OK)
  })

  test('GET - Deve validar dados de retorno de um post existente', async ({ request }) => {
    const response = await request.get('/public/v2/posts/252765') // Faz a requisição GET
    const responseJson = await response.json() // Variavel que armazena response em formato Json
    console.log(responseJson) // Exibe o corpo da response no console

    expect(responseJson).toHaveProperty('id')
    expect(responseJson).toHaveProperty('user_id')
    expect(responseJson).toHaveProperty('title')
    expect(responseJson).toHaveProperty('body')

    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)
    expect(response.status()).toBe(200) // Valida que o status é 200 (OK)
  })

})

test.describe('POST', () => {

  test('POST - Deve realizar criação de um post e validar retorno e estrutura da response', async ({ request }) => {
    const response = await request.post('/public/v2/posts', {
      headers:{
        "Authorization": "Bearer 95f12fb31b77179d5cdafef4ca9bb5c1d7e1f08d55549d41ca1f774d886e78de"
      },
      data: {
      "id": 252776, // alterar algum campo para criar post
      "user_id": 8202458,
      "title": "Triginta omnis tabella amitto adaugeo suffoco toties amo.",
      "body": "Speculum soleo acerbitas. Ascit spero trucido. Aer cimentarius turpis. Callide ultra cum. Annus surculus appello. Debeo solio volubilis. Vulnus esse comparo. Aequitas amplexus accusamus. Subito delectatio adinventitias. Coma ager colo. Aurum alter corrumpo. Utor amo alias. Solum claudeo deripio. Virgo sollers solutio. Crapula adflicto ultio."
      }
    }) // Faz a requisição POST
    const responseJson = await response.json() // Variavel que armazena response em formato Json
    console.log(responseJson) // Exibe o corpo da response no console

    expect(responseJson).toHaveProperty('id') // Valida campos de posts criado
    expect(responseJson).toHaveProperty('user_id')
    expect(responseJson).toHaveProperty('title')
    expect(responseJson).toHaveProperty('body')

    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)
    expect(response.status()).toBe(201) // Valida que o status é 201 (CREATED)
  })

})

test.describe('PUT', () => {

  test('PUT - Deve modificar totalmente os dados de um post', async ({ request }) => {
      const response = await request.put('/public/v2/posts/252774', {
      headers:{
        "Authorization": "Bearer 95f12fb31b77179d5cdafef4ca9bb5c1d7e1f08d55549d41ca1f774d886e78de"
      },
      data: {
      "id": 252774, // alterar algum campo para modficar post.
      "user_id": 8202456,
      "title": "Tiginta omnis tabella amitto adaugeo suffoco toties amo.",
      "body": "Speculum soleo acerbitas. Ascit spero trucido. Aer cimentarius turpis. Callide ultra cum. Annus surculus appello. Debeo solio volubilis. Vulnus esse comparo. Aequitas amplexus accusamus. Subito delectatio adinventitias. Coma ager colo. Aurum alter corrumpo. Utor amo alias. Solum claudeo deripio. Virgo sollers solutio. Crapula adflicto ultio."
      }
    }) // Faz a requisição PUT
    const responseJson = await response.json() // Variavel que armazena response em formato Json
    console.log(responseJson) // Exibe o corpo da response no console

    expect(responseJson).toHaveProperty('id')
    expect(responseJson).toHaveProperty('user_id', 8202456) // validar mudança feita no "data"
    expect(responseJson).toHaveProperty('title', 'Tiginta omnis tabella amitto adaugeo suffoco toties amo.')
    expect(responseJson).toHaveProperty('body', 'Speculum soleo acerbitas. Ascit spero trucido. Aer cimentarius turpis. Callide ultra cum. Annus surculus appello. Debeo solio volubilis. Vulnus esse comparo. Aequitas amplexus accusamus. Subito delectatio adinventitias. Coma ager colo. Aurum alter corrumpo. Utor amo alias. Solum claudeo deripio. Virgo sollers solutio. Crapula adflicto ultio.')

    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)
    expect(response.status()).toBe(200) // Valida que o status é 201 (OK)
  })

})


test.describe('DELETE', () => {

  test('DELETE - Deve deletar um posts', async ({ request }) => {
    const response = await request.delete('/public/v2/posts/252764', {
      headers:{
        "Authorization": "Bearer 95f12fb31b77179d5cdafef4ca9bb5c1d7e1f08d55549d41ca1f774d886e78de"
      }
    }) // Faz a requisição DELETE, escolher id do posts que irá deletar
    const responseJson = await response.text() // Variavel que armazena response em formato Json (neste caso não possui conteudo usamo o text())
    console.log(responseJson) // Exibe o corpo da response no console

    expect(response.status()).toBe(204) // Valida que o status é 204 (NO CONTENT)
    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)

  })

})