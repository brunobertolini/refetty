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
