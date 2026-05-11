import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/** GitHub project pages need `/<repo>/`. Override with `VITE_BASE` or rely on `GITHUB_REPOSITORY` in Actions. */
function resolveBase(mode: string): string {
  const fromEnv = process.env.VITE_BASE?.trim()
  if (fromEnv) {
    let b = fromEnv
    if (!b.startsWith('/')) b = `/${b}`
    if (!b.endsWith('/')) b = `${b}/`
    return b
  }
  const ghRepo = process.env.GITHUB_REPOSITORY?.trim()
  if (ghRepo) {
    const repo = ghRepo.split('/')[1]
    if (repo) return `/${repo}/`
  }
  if (mode === 'production') {
    return '/Matchateahousesite/'
  }
  return '/'
}

export default defineConfig(({ mode }) => ({
  base: resolveBase(mode),
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
}))
