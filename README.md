# Visor ATES

Mapa interactiu per la visualització de l'Escala d'Exposició del Terreny d'Allaus (ATES en anglès) i l'exposició de diferents rutes de muntanya hivernal.

![preview](https://github.com/andorra-ri/ates-visor/assets/12972543/8e057da5-0f00-4f99-984f-b5cd2291ce64)

## Desenvolupament

Clonar el repository i instal·lar dependències

```bash
git clone https://github.com/andorra-ri/ates-visor
cd ates-visor
npm install
```

Crear un fitxer `.env` amb els tokens d'accés a Supabase i Mapbox

```env
VITE_SUPABASE_ID=
VITE_SUPABASE_TOKEN=
VITE_MAPBOX_TOKEN=
```

Iniciar servidor de desenvolupament

```bash
npm run dev
```

## Desplegament

El desplegament a Netlify és automàtic en cada push a aquest repositori :tada:

La branca `main` es publica a <https://ates-visor.netlify.app>  
La branca `dev` es publica a <https://dev--ates-visor.netlify.app>
