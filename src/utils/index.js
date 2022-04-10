import { ElMessage } from 'element-plus'
export function checkContent(content) {
  content = content.trim()
  if(!content) {
    ElMessage({
      message: 'Please enter the content',
      type: 'error'
    })
  }
  return content
}
