# 🧠 Guía completa de personalizaciones Clevercel (Theme Canopy)

Esta guía documenta **todas las personalizaciones realizadas en el tema Canopy** de la tienda **Clevercel.mx**.  
Está escrita paso a paso, en un lenguaje accesible, para que cualquier miembro del equipo pueda mantener o replicar los cambios sin romper la estructura del tema.

---

## 📑 Índice de Contenidos

- [🧠 Guía completa de personalizaciones Clevercel (Theme Canopy)](#-guía-completa-de-personalizaciones-clevercel-theme-canopy)
  - [📑 Índice de Contenidos](#-índice-de-contenidos)
  - [1. 🧭 Introducción general](#1--introducción-general)
  - [2. ⚙️ Acceso al código del tema](#2-️-acceso-al-código-del-tema)
    - [🔹 Dónde editar el código](#-dónde-editar-el-código)
  - [3. 🎨 Variables globales de color](#3--variables-globales-de-color)
  - [4. 🏷️ Etiquetas de descuento dinámicas](#4-️-etiquetas-de-descuento-dinámicas)
    - [📄 Archivo: `/assets/custom.js`](#-archivo-assetscustomjs)
    - [🔧 Cómo funciona](#-cómo-funciona)
    - [🎨 Estilos CSS relacionados](#-estilos-css-relacionados)
  - [5. 🖤💛 Botones personalizados](#5--botones-personalizados)
    - [📄 Archivo: `/assets/custom.css`](#-archivo-assetscustomcss)
    - [🚫 Exclusión para botones específicos](#-exclusión-para-botones-específicos)
  - [6. 💳 Bloque “Métodos de pago”](#6--bloque-métodos-de-pago)
    - [🧩 Código del bloque](#-código-del-bloque)
    - [💅 Estilos CSS](#-estilos-css)
    - [📍 Resultado](#-resultado)
  - [7. 🔗 Enlace de menú al bloque](#7--enlace-de-menú-al-bloque)
    - [💡 Problema](#-problema)
    - [✅ Solución](#-solución)
  - [8. 🤖 Shopify Flow — Sincronización de metaobjects](#8--shopify-flow--sincronización-de-metaobjects)
    - [🧩 Estructura general](#-estructura-general)
    - [⚙️ Ejemplo de mapeo](#️-ejemplo-de-mapeo)
    - [⚠️ Errores comunes](#️-errores-comunes)
  - [9. 🧾 Recomendaciones y mantenimiento](#9--recomendaciones-y-mantenimiento)

---

## 1. 🧭 Introducción general

Durante la personalización del tema **Canopy**, se realizaron múltiples ajustes para adaptar el diseño, los colores, las etiquetas dinámicas y la integración de datos de productos (metaobjects).  
El objetivo principal fue **mantener la compatibilidad con las actualizaciones del tema** sin alterar los archivos base.

---

## 2. ⚙️ Acceso al código del tema

### 🔹 Dónde editar el código

1. Entra al **admin de Shopify**.
2. Ve a **Online Store → Themes**.
3. En el tema activo (Canopy), haz clic en **... → Edit code**.

Desde allí puedes editar los siguientes archivos o secciones:

- **/assets/custom.css** → para los estilos personalizados globales.
- **/assets/custom.js** → para scripts de comportamiento dinámico.
- **Theme settings → Advanced → Custom HTML** → para incluir los archivos externos (`custom.js` y `custom.css`).

⚠️ **Importante:** nunca modifiques directamente los archivos del tema base (`theme.css`, `theme.js`). Usa los archivos `custom.*` para mantener los cambios separados.

---

## 3. 🎨 Variables globales de color

En el archivo `/assets/custom.css` se definió una **paleta de colores global**, usando variables CSS dentro del `:root`:

```css
:root {
  --discount-low-bg: #b5b5b5;
  --discount-low-color: #fff;
  --discount-medium-bg: #3cb371;
  --discount-medium-color: #fff;
  --discount-high-bg: #4169e1;
  --discount-high-color: #fff;
  --discount-extra-bg: #262626;
  --discount-extra-color: #fff;
  --global-yellow: #ffea00;
  --global-black: #262626;
}
```

Estas variables se usan en botones, etiquetas de descuento y componentes visuales.  
Si necesitas cambiar un color, **solo ajusta el valor hexadecimal** aquí — no en los componentes individuales.

---

## 4. 🏷️ Etiquetas de descuento dinámicas

### 📄 Archivo: `/assets/custom.js`

Este script colorea automáticamente las etiquetas de descuento según el porcentaje visible (por ejemplo, `28% off`).

### 🔧 Cómo funciona

1. Detecta los elementos con clase `.product-label--sale`.
2. Extrae el número de porcentaje usando una expresión regular.
3. Aplica una clase CSS dependiendo del rango de descuento.

```js
const LOW_MAX = 8;
const MEDIUM_MAX = 18;
const HIGH_MAX = 30;

if (pct <= LOW_MAX) el.classList.add("discount--low");
else if (pct <= MEDIUM_MAX) el.classList.add("discount--medium");
else if (pct <= HIGH_MAX) el.classList.add("discount--high");
else el.classList.add("discount--extra");
```

### 🎨 Estilos CSS relacionados

Las clases usadas se encuentran en `custom.css`:

```css
.discount--low {
  background: var(--discount-low-bg);
  color: var(--discount-low-color);
}
.discount--medium {
  background: var(--discount-medium-bg);
  color: var(--discount-medium-color);
}
.discount--high {
  background: var(--discount-high-bg);
  color: var(--discount-high-color);
}
.discount--extra {
  background: var(--discount-extra-bg);
  color: var(--discount-extra-color);
}
```

💡 _Puedes ajustar los rangos o colores sin tocar el resto del código._

---

## 5. 🖤💛 Botones personalizados

### 📄 Archivo: `/assets/custom.css`

Se redefinió el estilo de `.btn--primary` para usar los colores corporativos (`negro y amarillo`) y animación de transición:

```css
.btn--primary,
.shopify-payment-button .shopify-payment-button__button--unbranded {
  background: var(--global-black);
  color: var(--global-yellow);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn--primary:hover {
  background: var(--global-yellow);
  color: var(--global-black);
}
```

### 🚫 Exclusión para botones específicos

Se excluyó el estilo de hover para botones con la clase `.btn--extra-narrow`:

```css
.btn--primary:not(.btn--extra-narrow):hover {
  background: var(--global-yellow);
  color: var(--global-black);
}
```

## Personalización de estilos del botón "Añadir al carrito"

Si se requiere modificar los estilos visuales del botón **"Añadir al carrito"** (por ejemplo: colores, gradiente, fondo, etc.), estos cambios se pueden realizar directamente desde el archivo `custom.css` del tema.

### Línea de referencia

Buscar la **línea 190** dentro del archivo.
Allí encontrarán un bloque similar al siguiente:

```css
.image-banner .btn--secondary,
body .product-info__add-to-cart button.btn--secondary {
  background: linear-gradient(
      104deg,
      var(--global-black) 60%,
      rgba(255, 255, 255, 1) 60% 100%
    )
    no-repeat 100% 100%;
  background-size: 300% 100%;
  color: var(--global-black);
}
```

Desde este bloque se pueden modificar los estilos del botón, incluyendo colores, gradientes y apariencia visual general.


---

## 6. 💳 Bloque “Métodos de pago”

Este bloque se insertó como **Custom HTML** dentro del theme editor (solo en la página de inicio).

### 🧩 Código del bloque

```html
<div id="clevercel-payment-methods" class="cc-three-cols">
  <div class="cc-col">
    <img
      src="//clevercel.mx/cdn/shop/files/KueskiPayLogo.svg"
      alt="KueskiPay"
    />
    <a href="/collections/nuevos" class="cc-btn">Conoce sus beneficios</a>
  </div>
  <div class="cc-col">
    <img src="//clevercel.mx/cdn/shop/files/PayPal.svg" alt="PayPal" />
    <a href="/collections/ofertas" class="cc-btn">Conoce sus beneficios</a>
  </div>
  <div class="cc-col">
    <img
      src="//clevercel.mx/cdn/shop/files/MercadoPago.svg"
      alt="Mercado Pago"
    />
    <a href="/pages/contacto" class="cc-btn">Conoce sus beneficios</a>
  </div>
</div>
```

### 💅 Estilos CSS

```css
.cc-three-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  text-align: center;
  margin: 40px auto;
  max-width: 1200px;
  padding: 0 20px;
}
.cc-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
.cc-col img {
  max-width: 140px;
  height: auto;
  margin-bottom: 16px;
}
.cc-btn {
  background: var(--global-black);
  color: var(--global-yellow);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}
.cc-btn:hover {
  background: var(--global-yellow);
  color: var(--global-black);
}
@media (max-width: 768px) {
  .cc-three-cols {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

### 📍 Resultado

Tres columnas limpias, centradas, con logos proporcionados y aire entre elementos.

---

## 7. 🔗 Enlace de menú al bloque

### 💡 Problema

El bloque está solo en el **home**, por lo tanto, los enlaces tipo `#metodos-de-pago` no funcionan desde otras páginas.

### ✅ Solución

Crea el link del menú así:

```
/#metodos-de-pago
```

Shopify redirige primero al home (`/`) y luego hace scroll hasta el ancla, manteniendo la funcionalidad global.

---

## 8. 🤖 Shopify Flow — Sincronización de metaobjects

Se creó un **flujo automatizado** en Shopify Flow para sincronizar la información del metaobjeto “Ficha técnica” con los metafields del producto.

### 🧩 Estructura general

1. **Trigger:** Scheduled time (ejecución programada).
2. **Action:** Get metaobject entries → tipo `Ficha técnica`.
3. **Loop:** Por cada metaobjeto, buscar productos relacionados con `referencedBy`.
4. **Action:** Actualizar los metafields del producto con los valores de la ficha.
5. **Validación:** Solo actualizar si el campo no tiene valor o si no ha sido modificado recientemente.

### ⚙️ Ejemplo de mapeo

| Campo metaobject  | Campo producto (metafield) |
| ----------------- | -------------------------- |
| procesador        | custom.procesador          |
| memoria_ram       | custom.memoria_ram         |
| almacenamiento    | custom.almacenamiento      |
| camara            | custom.camara              |
| bateria           | custom.bateria             |
| sistema_operativo | custom.sistema_operativo   |

### ⚠️ Errores comunes

- “Value can’t be blank” → ocurre si se intenta guardar un campo vacío en un metafield tipo `multi_line_text_field`.  
  ✅ Solución: agregar validación en Liquid `if val != blank` antes del update.
- Productos sin relación `referencedBy` no se actualizan (no hay referencia al metaobject).

---

## 9. 🧾 Recomendaciones y mantenimiento

✅ **Después de cada actualización del tema:**

- Revisa que `custom.css` y `custom.js` sigan referenciados desde _Custom HTML_.
- Verifica que el bloque de “Métodos de pago” siga cargando correctamente.

✅ **Antes de editar el Flow:**

- Duplica el flujo actual (“Ficha Técnica Sync”) y trabaja en una copia.
- Revisa los filtros de fecha (`updated_at`) para no procesar los mismos items.

✅ **Pruebas rápidas:**

1. Abre un producto con descuento → revisa color de la etiqueta.
2. Prueba el hover de un botón “Opciones”.
3. En el Home, verifica la sección de pagos y el scroll desde el menú.

---

> 📘 _Esta guía es mantenida por el equipo técnico._  
> Última actualización: **octubre 2025**
