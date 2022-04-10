export default function(moduleFiles) {
  const files = {}
  moduleFiles.keys().forEach(key => {
    // 这种做法多级目录下会出现state命名带有斜杠，但对其它操作无影响
    // 各文件夹可以利用一个中间文件进行中转，达到不修改原设定并且命名不冲突
    // const propKey = key.replace(/\.\/(.*)\.js$/g, '$1')

    // 多层级文件结构最终变为单层级文件结构，无法利用多层级避免的命名冲突
    const propKey = key.replace(/\.\/(.*\/)?(\w+)\.js$/g, '$2')

    files[propKey] = moduleFiles(key).default
  })
  return files
}

// 'Vue Element admin'做法整体利用reduce使代码整洁
// export default function(moduleFiles) {
//   return moduleFiles.keys().reduce((modules, fileName) => {
//     const propKey = fileName.replace(/\.\/(.*)\.js$/g, '$1')
//     modules[propKey] = moduleFiles(fileName).default
//     return modules
//   }, {})
// }
