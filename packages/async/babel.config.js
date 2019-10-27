const path = require('path')

module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
	],
	plugins: [
		'@babel/plugin-proposal-optional-chaining',
		[
			'module-resolver',
			{
				alias: {
					'~': path.join(process.cwd(), 'src'),
				},
			},
		],
	],
}
