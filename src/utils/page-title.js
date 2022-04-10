import settings from '@/settings.js'

const title = settings.title || 'Imitate Vue Page'

export default function(pageTitle) {
  return pageTitle ? pageTitle + '-' + title : title
}
