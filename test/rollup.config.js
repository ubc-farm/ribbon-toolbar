import babel from 'rollup-plugin-babel';

export default {
	entry: './test/entry.js',
	format: 'cjs',
	plugins: [
		babel({
			plugins: ['transform-react-jsx', 'external-helpers'],
		}),
	],
	external: ['react', 'enzyme', 'tape'],
	moduleName: 'Ribbon',
	exports: 'named',
};
