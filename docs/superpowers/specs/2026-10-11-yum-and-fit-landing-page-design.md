# Especificación de Diseño: Landing Page Yum & Fit

**Fecha**: 2026-10-11  
**Proyecto**: Yum & Fit - Landing Page  
**Estado**: Aprobado por el usuario  
**Enfoque**: Fresh & Clean Minimal  

---

## 1. Visión General del Proyecto

### 1.1 Contexto de Marca
**Yum & Fit** ("*Healthy & Delicious*") es un restaurante de comida saludable, fitness y gourmet para personas. Su propuesta de valor se basa en platillos balanceados con ingredientes 100% frescos (aguacate hass, lomo magro grillado, quinoa, vegetales de temporada, aderezos caseros sin ultraprocesados). 

La identidad visual cuenta con una mascota carismática (una bulldog chef con lazo rosa) que representa el cariño, la devoción y la cocina honesta. La marca cuenta con un número de contacto y pedidos directo (`098 184 0168`) y un video promocional cinematográfico (`gemini_generated_video_27d573df.mp4`) que exhibe la preparación artesanal de los bowls.

### 1.2 Objetivo Principal
Diseñar y construir una landing page moderna, minimalista y 100% responsive que presente la propuesta gastronómica de Yum & Fit, exhiba su video de cocina y maximice la conversión de pedidos directos y reservas vía WhatsApp.

### 1.3 Objetivos Secundarios
- Carga ultrarrápida (First Contentful Paint < 1.2s) sin dependencias de compiladores pesados.
- Menú interactivo con filtrado por categorías y fichas nutricionales (calorías y gramos de proteína).
- Experiencia de usuario pulcra en móvil (*mobile-first*), tablet y escritorio.

---

## 2. Stack Tecnológico y Arquitectura

### 2.1 Tecnologías
- **HTML5 Semántico**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`. Metadatos SEO y Open Graph integrados para vista previa en WhatsApp y redes sociales.
- **Tailwind CSS**: Estilos utilitarios modernos vía CDN optimizado, con configuración extendida de colores y fuentes de la marca.
- **Vanilla JavaScript (ES6+)**: Lógica reactiva modular sin dependencias de frameworks ni pasos de build.
- **Iconografía**: SVG inline limpios (estilo Lucide Icons) para rendimiento inmediato.

### 2.2 Estructura del Proyecto
```text
YumAndFit/
├── Assets/
│   ├── logo.jpg                         # Logo oficial de la marca
│   └── gemini_generated_video_27d573df.mp4 # Video promocional
├── css/
│   └── styles.css                       # Estilos personalizados, glassmorphism, microanimaciones
├── js/
│   ├── menu-data.js                     # Base de datos de platillos, precios, ingredientes y macros
│   └── main.js                          # Controladores: filtros, WhatsApp generator, video player, drawer
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-10-11-yum-and-fit-landing-page-design.md
└── index.html                           # Landing page completa y responsive
```

---

## 3. Sistema de Diseño Visual (Design System)

### 3.1 Paleta Cromática
- **Primario (Verde Bosque Orgánico)**: `#1E3B2B` — Transmite frescura, salud y calidad prémium.
- **Secundario (Verde Salvia)**: `#3D6A4E` — Utilizado para acentos vegetales y contrastes medios.
- **Fondo Suave de Badges (Salvia Light)**: `#E9F2EC` — Para tags de macros y etiquetas de categorías.
- **Acento Cálido (Dorado Culinario)**: `#C99738` / `#D4A359` — Inspirado en los detalles dorados del logo; para botones de acción destacados, estrellas de calificación y badges especiales.
- **Fondo Base (Warm Linen / Cream)**: `#FAF8F5` — Tono orgánico y acogedor que evita el blanco sintético plano.
- **Superficie de Tarjetas**: `#FFFFFF` con sutiles sombras difuminadas orgánicas (`rgba(30, 59, 43, 0.06)`).
- **Texto Principal**: `#19241C` (alto contraste, cumple WCAG AAA).
- **Texto Secundario**: `#54655B` (legibilidad descansada para ingredientes y metadatos).

### 3.2 Tipografía
- **Titulares**: *Outfit* o *Plus Jakarta Sans* (Google Fonts), pesos 700 y 800, tracking ligeramente ajustado (`tracking-tight`).
- **Cuerpo y UI**: *Plus Jakarta Sans*, pesos 400, 500 y 600.
- **Interlineado**: Holgado (`leading-relaxed`) para máxima legibilidad en dispositivos móviles.

### 3.3 Microinteracciones y Bordes
- Radios de curvatura: `rounded-2xl` (16px) y `rounded-3xl` (24px).
- Efecto Glassmorphism: `backdrop-blur-md bg-white/85 border border-emerald-900/10` en el navbar flotante.
- Elevación hover en tarjetas: `hover:-translate-y-1 hover:shadow-xl transition-all duration-300`.

---

## 4. Estructura Detallada de la Landing Page

### 4.1 Navbar Flotante
- **Logotipo**: Imagen en miniatura de `Assets/logo.jpg` con borde circular dorado y texto "Yum & Fit".
- **Enlaces de navegación**: *Inicio*, *Menú*, *Nuestra Cocina*, *Por Qué Elegirnos*, *Contacto*.
- **Acción Rápida**: Botón *"Pedir Ahora"* con icono de WhatsApp.
- **Modo Móvil**: Botón hamburguesa accesible que despliega un menú lateral/drawer fluido.

### 4.2 Hero Section (Primer Impacto)
- **Tagline superior**: `🌱 100% Ingredientes Frescos • Sin Ultraprocesados`.
- **Titular Principal**: *"Comida real que nutre tu cuerpo y deleita tu día"*.
- **Subtítulo**: *"Descubre nuestros bowls gourmet, ensaladas frescas y proteínas limpias, preparados con el balance exacto de sabor y nutrientes."*
- **CTAs**:
  - Principal: *"Explorar el Menú"* (desplazamiento suave con scroll hacia la sección del menú).
  - Secundario: *"Ver Video de Preparación"* (lleva a la sección de video interactivo).
- **Card Destacada de Platillo Estrella**:
  - Muestra el *Power Steak & Avocado Bowl* con imagen apetitosa, rating de 4.9 ★, indicador de 42g de proteína y botón directo para pedirlo.
- **Cinta de Métricas de Confianza**:
  - `0%` Ultraprocesados y aditivos artificiales.
  - `100%` Ingredientes de origen fresco y local.
  - `+40g` Proteína limpia promedio por bowl.
  - `30-45m` Entrega rápida en empaques biodegradables.

### 4.3 Menú Interactivo por Categorías
- **Filtros por Tabs**:
  - `Todos`
  - `Bowls Proteicos`
  - `Ensaladas Gourmet`
  - `Keto & Low-Carb`
  - `Bebidas & Smoothies`
- **Catálogo de Platillos**: Cada tarjeta incluye:
  - Imagen nítida del platillo.
  - Badge de especialidad (*Favorito del Chef*, *High Protein*, *Keto*).
  - Nombre del plato y descripción de ingredientes clave.
  - Ficha de macros: Kcal y gramos de proteína.
  - Precio.
  - Botón *"Pedir por WhatsApp"* con generación de mensaje preconfigurado.

### 4.4 Sección "Nuestra Cocina" (Video Promocional Showcase)
- **Titular**: *"De la Cocina a Tu Mesa: Pasión por lo Fresco"*.
- **Narrativa**: Explicación del proceso culinario: corte de aguacates frescos, cocción de carnes magras en su punto y aderezos emulsionados artesanalmente.
- **Reproductor de Video Integrado**:
  - Carga optimizada del archivo `Assets/gemini_generated_video_27d573df.mp4`.
  - Poster de precarga para renderizado instantáneo.
  - Controles elegantes personalizados: Play/Pausa central, botón Mute/Unmute y pantalla completa.
  - Soporte `playsinline` para dispositivos iOS y Android.

### 4.5 Bento Grid: "Por Qué Yum & Fit"
- **Bloque 1**: *Sabor Gourmet Real* — Recetas creadas para disfrutar cada bocado, no dietas aburridas.
- **Bloque 2**: *Ingredientes Rigurosamente Seleccionados* — Aguacates Hass madurados a la perfección y proteína magra de primera calidad.
- **Bloque 3**: *Compromiso Eco-Friendly* — Envases 100% biodegradables y compostables para cuidar nuestro entorno.

### 4.6 Contacto, Horarios y Ubicación
- **Información del Local**:
  - Teléfono de atención y pedidos: `098 184 0168`.
  - Horarios de atención: Lunes a Sábado de 10:00 a 21:00 / Domingos de 11:00 a 18:00.
  - Métodos de servicio: Consumo en local, Takeout y Delivery a domicilio.
- **Acciones directas**: Botón de llamada directa `tel:0981840168` y botón de WhatsApp.

### 4.7 Footer y Botón Flotante
- Footer con derechos reservados, enlaces rápidos, redes sociales y mención a la bulldog chef.
- **Botón Flotante de WhatsApp**: Fijado en la esquina inferior derecha con tooltip *"¿Tienes hambre? Pide aquí"* y badge de disponibilidad.

---

## 5. Lógica de Negocio y Flujo de Datos

### 5.1 Estructura de Datos (`menu-data.js`)
```javascript
const MENU_ITEMS = [
  {
    id: 'power-steak-bowl',
    name: 'Power Steak & Avocado Bowl',
    category: 'bowls',
    description: 'Lomo magro a la plancha, aguacate hass fresco, quinoa tricolor, kale crocante y vinagreta de la casa.',
    price: 8.99,
    calories: 540,
    protein: '42g',
    badge: 'Más Vendido',
    image: 'Assets/frame_120.jpg' // O asset de alta definición
  },
  // Más platillos organizados por categoría...
];
```

### 5.2 Generación de Enlace a WhatsApp
- Número objetivo: `593981840168` (formato estándar para el prefijo `098 184 0168`).
- Formato del mensaje:
  ```text
  Hola Yum & Fit! Me gustaría hacer el siguiente pedido:
  🍽️ Platillo: [Nombre]
  💵 Precio: $[Precio]
  📍 Dirección de entrega: [Ingresar dirección]
  ```
- Función utilitaria en `main.js`:
  ```javascript
  function openWhatsAppOrder(dishName, price) {
    const text = `Hola Yum & Fit! 🥑 Me gustaría pedir: ${dishName} ($${price}). Por favor indíquenme el tiempo estimado de entrega.`;
    const url = `https://wa.me/593981840168?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }
  ```

---

## 6. Accesibilidad y Casos Borde

1. **Rendimiento Multimedia**: El video no se reproduce con audio por defecto para cumplir con las políticas de reproducción de los navegadores y no sorprender al usuario.
2. **Fallback de Red**: Si la red del usuario es lenta, el video tiene un poster de alta resolución y el contenido textual/menú es completamente visible e interactivo de inmediato.
3. **Responsive Breakpoints**:
   - Móvil pequeño: `< 640px` (menú apilado en 1 columna, tipografía ajustada).
   - Tablet: `640px - 1024px` (grid de 2 columnas).
   - Desktop: `> 1024px` (grid de 3 columnas, hero expandido con composición lado a lado).
4. **Accesibilidad (a11y)**:
   - Contraste superior a 4.5:1 en todos los textos sobre fondos.
   - Atributos `alt` descriptivos en todas las imágenes.
   - Botones con `aria-label` para lectores de pantalla.

---

## 7. Plan de Verificación

- [ ] Cargar `index.html` en navegador y verificar ausencia de errores en la consola.
- [ ] Comprobar funcionamiento del navbar y menú responsive en resoluciones de 375px, 768px y 1440px.
- [ ] Verificar el filtrado instantáneo por categorías del menú.
- [ ] Comprobar que los botones de pedido abran la URL de WhatsApp correcta con el texto esperado.
- [ ] Probar controles y reproducción del video `gemini_generated_video_27d573df.mp4`.
- [ ] Validar botón flotante de WhatsApp y navegación por anclas suaves.
