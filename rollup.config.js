import babel from 'rollup-plugin-babel';

export default {
	entry: 'test-src.js',
	sourceMap: true,
	format: 'iife',
	moduleName: 'Ribbon',
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
};
