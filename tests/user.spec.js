import { test, expect } from '@playwright/test'

test.describe('GET', () => {

  test('GET - Deve retornar um usuário existente', async ({ request }) => {
    const response = await request.get('/public/v2/users/7508112') // Faz a requisição GET (se retirarmos o id de usuário retorna todos os usuarios)
    const responseJson = await response.json() // Variavel que armazena response em formato Json
    console.log(responseJson) // Exibe o corpo da response no console

    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)
    expect(response.status()).toBe(200) // Valida que o status é 200 (OK)
  })

  test('GET - Deve validar dados de retorno de um usuario existente', async ({ request }) => {
    const response = await request.get('/public/v2/users/7508112') // Faz a requisição GET
    const responseJson = await response.json() // Variavel que armazena response em formato Json
    console.log(responseJson) // Exibe o corpo da response no console

    expect(responseJson).toHaveProperty('name')
    expect(responseJson).toHaveProperty('email')
    expect(responseJson).toHaveProperty('gender')
    expect(responseJson).toHaveProperty('status')

    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)
    expect(response.status()).toBe(200) // Valida que o status é 200 (OK)
  })

})

test.describe('POST', () => {

  test('POST - Deve realizar criação de usuário e validar retorno e estrutura da response', async ({ request }) => {
    const response = await request.post('/public/v2/users', {
      headers:{
        "Authorization": "Bearer 95f12fb31b77179d5cdafef4ca9bb5c1d7e1f08d55549d41ca1f774d886e78de"
      },
      data: {
      "id": 1232323, // alterar algum campo para criar usuario
      "name": "Fernando",
      "email": "teste7@email.com",
      "gender": "male",
      "status": "active"
      }
    }) // Faz a requisição POST
    const responseJson = await response.json() // Variavel que armazena response em formato Json
    console.log(responseJson) // Exibe o corpo da response no console

    expect(responseJson).toHaveProperty('name', 'Fernando') // Valida campos de usuario criado
    expect(responseJson).toHaveProperty('email', 'teste7@email.com')
    expect(responseJson).toHaveProperty('gender', 'male')
    expect(responseJson).toHaveProperty('status', 'active')

    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)
    expect(response.status()).toBe(201) // Valida que o status é 201 (CREATED)
  })

})

test.describe('PUT', () => {

  test('PUT - Deve modificar parcialmente dados de um usuário', async ({ request }) => {
      const response = await request.put('/public/v2/users/8202446', {
      headers:{
        "Authorization": "Bearer 3c4e41dca2ce7e85cdc6ef280e83b1536e052eba7aa6744ba97642e2cc62d749"
      },
      data: {
      "name": "Kamlesh Pilla", //modificar algum campo 
      "email": "kamlesh_pillai@mraz-predovic.example",
      "gender": "male",
      "status": "active"
      }
    }) // Faz a requisição PUT
    const responseJson = await response.json() // Variavel que armazena response em formato Json
    console.log(responseJson) // Exibe o corpo da response no console

    expect(responseJson).toHaveProperty('name', 'Kamlesh Pilla') // validar mudança feita no "data"
    expect(responseJson).toHaveProperty('email', 'kamlesh_pillai@mraz-predovic.example')
    expect(responseJson).toHaveProperty('gender', 'male')
    expect(responseJson).toHaveProperty('status', 'active')

    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)
    expect(response.status()).toBe(200) // Valida que o status é 200 (OK)
  })

})


test.describe('DELETE', () => {

  test('DELETE - Deve deletar um usuário', async ({ request }) => {
    const response = await request.delete('/public/v2/users/8202445', {
      headers:{
        "Authorization": "Bearer 3c4e41dca2ce7e85cdc6ef280e83b1536e052eba7aa6744ba97642e2cc62d749"
      }
    }) // Faz a requisição DELETE
    const responseJson = await response.text() // Variavel que armazena response em formato Json (neste caso não possui conteudo usamo o text())
    console.log(responseJson) // Exibe o corpo da response no console

    expect(response.status()).toBe(204) // Valida que o status é 204 (NO CONTENT)
    expect(response.ok()).toBeTruthy() // Valida que a response é bem-sucedida (status 2xx)

  })

})