# Yum-Fit

> Landing page moderna, minimalista y responsive para el restaurante de comida saludable y deliciosa **Yum & Fit**.

## 🥑 Características
- **Identidad de Marca**: Integración del logo oficial con la bulldog chef y video promocional cinematográfico.
- **Menú Interactivo**: Filtros instantáneos por categorías (Bowls Proteicos, Ensaladas Gourmet, Keto & Low Carb, Bebidas & Smoothies).
- **Fichas Nutricionales**: Calorías y macronutrientes (proteína, carbohidratos) detallados por platillo.
- **Pedidos Directos por WhatsApp**: Enlace dinámico para enviar la orden con nombre del plato y precio al número `098 184 0168`.
- **Showcase de Video**: Reproductor interactivo integrado para el video de cocina (`gemini_generated_video_27d573df.mp4`).
- **Diseño Responsive & Minimalista**: Mobile-first, construido con HTML5 semántico, Tailwind CSS y Vanilla JS (cero dependencias pesadas).

## 🚀 Cómo Ejecutar Localmente

No se requiere ningún paso de compilación ni dependencias externas. Puedes:

1. Abrir directamente `index.html` en tu navegador favorito.
2. O iniciar un servidor web local con Python:
   ```bash
   python -m http.server 8000
   ```
   Luego visita `http://localhost:8000` en tu navegador.

## 🧪 Pruebas Automatizadas
El proyecto incluye pruebas unitarias y de integración end-to-end:
```bash
node tests/menu_data.test.js
python tests/e2e_verify.py
```
