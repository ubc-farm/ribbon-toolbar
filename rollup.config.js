import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/index.js',
	sourceMap: true,
	plugins: [
		babel({
			plugins: ['transform-react-jsx', 'external-helpers'],
		}),
	],
	external: ['react', 'react-dom', 'tape'],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		tape: 'test',
	},
	moduleName: 'Ribbon',
	exports: 'named',
	targets: [
		{ dest: 'dist/ribbon.es.js', format: 'es' },
		{ dest: 'dist/ribbon.cjs.js', format: 'cjs' },
		{ dest: 'dist/ribbon.iife.js', format: 'iife' },
	],
};
