import { fileURLToPath } from 'url'
import { dirname } from 'path'

const FileURLToPath = fileURLToPath(import.meta.url)
const __dirname = dirname(FileURLToPath)

export default __dirname;