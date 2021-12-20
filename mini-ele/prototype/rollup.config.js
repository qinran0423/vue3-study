import babel from '@rollup/plugin-babel'
import vuePlugin from 'rollup-plugin-vue'

const es = {
  input: 'src/entry.js',
  output: {
    file:'dist/index.bundle.js',
    name: 'Ele',
    format: 'es',
    globals: {
      vue:'Vue'
    },
  },
  external: ['vue'],
  plugins: [
    babel(),
    vuePlugin({
      css: true
    })
  ]
}

const iife = {
  input: 'src/entry.js',
  output: {
    file:'dist/index.js',
    name: 'Ele',
    format: 'iife',
    globals: {
      vue:'Vue'
    },
  },
  external: ['vue'],
  plugins: [
    babel(),
    vuePlugin({
      css: true
    })
  ]
}



import {terser} from 'rollup-plugin-terser'

const minEs = {
  input: 'src/entry.js',
  external: ['vue'],
  output: {
    file: 'dist/index.min.js',
    name: 'Ele',
    format: 'umd'
  },
  plugins: [
    babel(),
    vuePlugin({
      css:true
    })
  ]
}

const cjs = {
  input: 'src/entry.js',
  external: ['vue'],
  output: {
    file: 'dist/index.cjs.js',
    name: 'Ele',
    format: 'cjs'
  },
  plugins: [
    babel(),
    vuePlugin({
      css:true
    })
  ]
}

export default [es, iife, minEs, cjs]