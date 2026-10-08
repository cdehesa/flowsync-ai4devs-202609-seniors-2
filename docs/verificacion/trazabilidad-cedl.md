# Trazabilidad: «Lo que cada tarea muestra de su responsable»

Requisito: `openspec/specs/tasks/spec.md` (líneas 97-114).

## Resultado

Ninguno de los tres criterios está cubierto. No hay ningún test de `tasks`: los únicos specs son los cuatro de `backend/tests/functional/auth/` (`signup`, `login`, `session`, `initials`), y ninguno consulta una tarea ni su `assignee`.

| # | Criterio de aceptación (scenario) | Qué prueba lo cubre | Estado |
|---|---|---|---|
| 1 | **Responsable identificable**: el `assignee` de una tarea de "Ada Lovelace" trae el nombre y las iniciales | Ninguna | **NO cubierto** |
| 2 | **La tarea no filtra datos de cuenta**: el `assignee` no incluye email ni datos de acceso, ni en la tarea suelta ni en la lista | Ninguna | **NO cubierto** |
| 3 | **Responsable sin nombre**: el nombre llega nulo y las iniciales siguen llegando | Ninguna | **NO cubierto** |

## Pruebas cercanas que no cuentan

- `initials.spec.ts` comprueba las iniciales de la cuenta a través de `POST /auth/login` (`data.user.initials`). No pasa por una tarea ni por el `assignee`.
  - Sus casos "Ada Lovelace" → `AL` y "sin nombre" → `AE` se parecen a los criterios 1 y 3, pero prueban el transformer de usuario. Un fallo en el transformer de tareas no los haría fallar.
- `signup.spec.ts` ("la contraseña nunca sale en la respuesta") prueba que la contraseña no sale en el registro. No dice nada sobre el email en `assignee`, que es lo que pide el criterio 2.

## Hueco extra, fuera de este requisito

Los scenarios de «Tres estados fijos» y «Cambio de estado de cualquier tarea» tampoco tienen test.
