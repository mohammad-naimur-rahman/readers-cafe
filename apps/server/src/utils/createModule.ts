import fs from 'fs'
import path from 'path'

// A shortcut for me to create all the neccesarry files for modules, to save tons of time and boredom
export default function createModule(moduleName: string) {
  const modulePath = path.join(path.join(''), moduleName)

  if (!fs.existsSync(modulePath)) {
    fs.mkdirSync(modulePath, { recursive: true })
  }

  const files = [
    'constants.ts',
    'controller.ts',
    'interface.ts',
    'model.ts',
    'routes.ts',
    'service.ts',
  ]

  files.forEach(file => {
    const filePath = path.join(modulePath, `${moduleName}.${file}`)
    fs.writeFileSync(filePath, '', { flag: 'wx' })
  })

  console.log(`Module '${moduleName}' created successfully.`)
}
