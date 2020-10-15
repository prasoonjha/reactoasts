import babel from 'rollup-plugin-babel'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import postcss from 'rollup-plugin-postcss'
import svgr from '@svgr/rollup'

import pkg from './package.json'

const config = {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named', sourcemap: false },
    { file: pkg.module, format: 'es', exports: 'named', sourcemap: false }
  ],
  external: ['react', 'prop-types', 'react-dom'],
  plugins: [
    external(),
    postcss({
      extensions: [ '.css' ],
    }),
    url({ exclude: ['**/*.svg'] }),
    svgr(),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

export default config