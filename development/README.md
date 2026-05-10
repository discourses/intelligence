<br>

## React + TypeScript + Vite

<br>

The **React + TypeScript + Vite** template provides a minimal setup of React $\mathbf{\large{+}}$ Vite with HMR (Hot Module Replacement) $\mathbf{\large{+}}$ a few ESLint rules.

At present, there are two official plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

<br>
<br>

### React Compiler

The React Compiler is disabled in this template due to its impact on dev & build performances. To enable it, [study this documentation](https://react.dev/learn/react-compiler/installation).

<br>
<br>

### Expanding the ESLint Configuration

For production applications, the recommendation is &Rarr; enable type-aware lint rules:


```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

Optionally, install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


<br>
<br>

## Development

```shell
npm create vite@latest
```

Questions:

- [x] Project name: .
- [x] Select a framework: React
- [x] Select a variant: TypeScript
- [x] Install withm npm and start now? Yes

```shell
npm install highcharts
npm install react-router-dom
npm install @types/jquery
```

<br>
<br>

<br>
<br>

<br>
<br>

<br>
<br>
