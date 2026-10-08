import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, la tarea no filtra
 * datos de cuenta, y responsable sin nombre.
 *
 * «Cualquier tarea, suelta o dentro de la lista» son tres lecturas distintas
 * —`GET /tasks/:id`, `GET /tasks` y la tarea que devuelve `POST /tasks`—, y cada
 * scenario se comprueba en todas, porque cada una arma su `assignee` con su
 * propio transformer.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const HOY = '2026-10-07'

  async function sesion(client: any, email: string, fullName: string | null) {
    await User.create({ fullName, email, password: 'secreto123' })

    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return response.body().data.token as string
  }

  async function responsable(fullName: string | null, email: string) {
    const user = await User.create({ fullName, email, password: 'secreto123' })
    const task = await Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: user.id,
    })

    return { user, task }
  }

  test('una tarea suelta trae el nombre y las iniciales de su responsable', async ({
    client,
    assert,
  }) => {
    const { task } = await responsable('Ada Lovelace', 'ada@example.com')
    const token = await sesion(client, 'alan@example.com', 'Alan Turing')

    const response = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('en la lista, cada tarea trae el nombre y las iniciales de su responsable', async ({
    client,
    assert,
  }) => {
    const { task } = await responsable('Ada Lovelace', 'ada@example.com')
    const token = await sesion(client, 'alan@example.com', 'Alan Turing')

    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    // La BD de tests es la del servidor de desarrollo: se busca la tarea
    // propia y no se asume que sea la única de la lista.
    const { assignee } = response.body().data.find((t: { id: number }) => t.id === task.id)
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('la tarea recién creada trae el nombre y las iniciales de quien la crea', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client, 'ada@example.com', 'Ada Lovelace')

    const response = await client
      .post('/api/v1/tasks')
      .json({ title: 'Revisar el informe' })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(201)

    const { assignee } = response.body().data
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('una tarea suelta no filtra el email ni otros datos de la cuenta', async ({
    client,
    assert,
  }) => {
    const { task } = await responsable('Ada Lovelace', 'ada@example.com')
    const token = await sesion(client, 'alan@example.com', 'Alan Turing')

    const response = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.notProperty(assignee, 'email')
    assert.notProperty(assignee, 'password')
    assert.notProperty(assignee, 'createdAt')
    assert.notProperty(assignee, 'updatedAt')
    assert.notInclude(JSON.stringify(response.body()), 'ada@example.com')
  })

  test('la lista no filtra el email ni otros datos de la cuenta del responsable', async ({
    client,
    assert,
  }) => {
    const { task } = await responsable('Ada Lovelace', 'ada@example.com')
    const token = await sesion(client, 'alan@example.com', 'Alan Turing')

    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data.find((t: { id: number }) => t.id === task.id)
    assert.notProperty(assignee, 'email')
    assert.notProperty(assignee, 'password')
    assert.notProperty(assignee, 'createdAt')
    assert.notProperty(assignee, 'updatedAt')
    assert.notInclude(JSON.stringify(assignee), 'ada@example.com')
  })

  test('la tarea recién creada no filtra el email de quien la crea', async ({ client, assert }) => {
    const token = await sesion(client, 'ada@example.com', 'Ada Lovelace')

    const response = await client
      .post('/api/v1/tasks')
      .json({ title: 'Revisar el informe' })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(201)

    const { assignee } = response.body().data
    assert.notProperty(assignee, 'email')
    assert.notProperty(assignee, 'createdAt')
    assert.notProperty(assignee, 'updatedAt')
    assert.notInclude(JSON.stringify(response.body()), 'ada@example.com')
  })

  test('una tarea suelta con responsable sin nombre trae nombre nulo e iniciales', async ({
    client,
    assert,
  }) => {
    const { task } = await responsable(null, 'ada@example.com')
    const token = await sesion(client, 'alan@example.com', 'Alan Turing')

    const response = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'AE')
    assert.notInclude(JSON.stringify(response.body()), 'ada@example.com')
  })

  test('en la lista, un responsable sin nombre trae nombre nulo e iniciales', async ({
    client,
    assert,
  }) => {
    const { task } = await responsable(null, 'ada@example.com')
    const token = await sesion(client, 'alan@example.com', 'Alan Turing')

    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data.find((t: { id: number }) => t.id === task.id)
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'AE')
    assert.notInclude(JSON.stringify(assignee), 'ada@example.com')
  })

  test('la tarea recién creada por una cuenta sin nombre trae nombre nulo e iniciales', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client, 'ada@example.com', null)

    const response = await client
      .post('/api/v1/tasks')
      .json({ title: 'Revisar el informe' })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(201)

    const { assignee } = response.body().data
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'AE')
    assert.notInclude(JSON.stringify(response.body()), 'ada@example.com')
  })
})
