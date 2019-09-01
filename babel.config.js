module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
        // edge: '17',
          ie: '8'
        },
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime'
    ],
    [
      // 笔者为了兼容IE8才用了这个插件，代价是不能tree shaking
      // 没有IE8兼容需求的同学可以把这个插件去掉
      '@babel/plugin-transform-modules-commonjs'
    ]
    // ['transform-es2015-modules-commonjs', {
    //   'allowTopLevelThis': true
    // }]
  ]
}
