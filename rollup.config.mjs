import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { dts } from 'rollup-plugin-dts'

export default [
	// 1. Node.js Outputs (ESM & CJS)
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/index.js',
				format: 'es',
				sourcemap: true
			},
			{
				file: 'dist/index.cjs',
				format: 'cjs',
				sourcemap: true
			}
		],
		plugins: [
			typescript({
				declaration: false,
				tsconfig: './tsconfig.json'
			})
		]
	},

	// 2. Browser Outputs (ESM + UMD)
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/index.browser.js',
				format: 'es',
				sourcemap: true
			},
			{
				file: 'dist/index.umd.js',
				format: 'umd',
				name: 'cloudevents',
				sourcemap: true
			}
		],
		plugins: [
			nodeResolve({ browser: true }),
			commonjs(),
			typescript({
				declaration: false,
				tsconfig: './tsconfig.json'
			})
		]
	},

	// 3. Unified Types
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/index.d.ts',
				format: 'es'
			}
		],
		plugins: [dts()]
	}
]
