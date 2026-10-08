# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Lee los scenarios de la spec viva de esta feature "Lo que cada tarea muestra de su responsable" y los tests existentes.
  Genera una tabla de trazabilidad: cada criterio de aceptación → qué prueba lo cubre → cubierto / NO cubierto.
  No cambies nada.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.
Funciono, me dio resultado de que ninguno de los casos tiene pruebas. Pero, tambien reviso el siguiente requerimiento no solo el que le pedi.
---

## Prompt 2

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Lee los scenarios de la spec viva de esta feature "Lo que cada tarea muestra de su responsable" y los tests existentes.
  Genera una tabla de trazabilidad: cada criterio de aceptación → qué prueba lo cubre → cubierto / NO cubierto.
  No cambies nada.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

---

## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
SHALL trabajar sobre el requerimiento "Lo que cada tarea muestra de su responsable" y SHALL NOT trajar ningun otro. Escribir los test necesarios para cubrir el requerimiento. Los test deben SHALL ser concretos, utilizando solo los
  estados y la information actual, SHALL NOT inventar valores sin sentido. Los tests que escribas van en backend/tests/functional/tasks/, siguiendo el estilo de los que ya hay en backend/tests/functional/auth/. No toques nada fuera de backend/tests/
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.
Escribio los tests aunque algunos fallaron. 

---

## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
hay algun edge case en la feature que se me este pasando basandote en la spec.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.
me mostro edge cases de los caules algunos considero validos.

---

## Prompt 5


```
de los tests que escribiste, comprobastes que estuvieran correctos? o presentan fallas?
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.
me dio informacion a cerca de porque 4 test fallan pero debido a la restriccion de no tocar nada fuera de /test no intento arreglar el codigo ya que presenta fallas en la logica.