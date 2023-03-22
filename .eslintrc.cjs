module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['prettier', '@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'@typescript-eslint/no-unused-vars': ['error'],
	},
	overrides: [
		{
			files: ['*.cjs'],
			globals: {
				module: false,
				require: false,
			},
			rules: {
				'@typescript-eslint/no-var-requires': 0,
			},
		},
	],
}
