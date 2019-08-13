module.exports = {
  plugins: [
    require('postcss-import')(),
    require('autoprefixer')({ browsers: ['last 5 versions'] })// 自动添加css前缀
  ]
}
