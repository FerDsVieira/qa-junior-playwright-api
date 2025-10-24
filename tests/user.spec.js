import { test, expect } from '@playwright/test'

test.describe('/users', () => {

  test('GET - Deve retornar um usuário existente', async ({ request }) => {
    const response = await request.get('/public/v2/users/8202458') // Faz a requisição GET
    console.log(await response.json()) // Exibe o corpo da resposta no console

    expect(response.ok()).toBeTruthy() // Valida que a resposta é bem-sucedida (status 2xx)
    expect(response.status()).toBe(200) // Valida que o status é 200 (OK)
  })

})
