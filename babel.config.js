/*
 * @Author: your name
 * @Date: 2020-05-25 17:38:37
 * @LastEditTime: 2020-10-13 13:42:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \git项目\jiayixiu\babel.config.js
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
