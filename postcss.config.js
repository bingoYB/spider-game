const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	// parser: 'sugarss',
	plugins: [
		postcssPresetEnv({
			stage: 3,
			browsers: 'last 2 versions',
			features: {
				'nesting-rules': true
			}
		}),
	]
}