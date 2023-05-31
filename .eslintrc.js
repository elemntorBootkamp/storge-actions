module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'commonjs': true,
	},
	'extends': 'airbnb-base',
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'eslint-comments'
	  ],
	'rules': {
		'eslint-comments/no-unused-disable': 'error',
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
	}
};
