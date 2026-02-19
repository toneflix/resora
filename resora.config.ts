import { defineConfig } from './src/utility'

export default defineConfig({
  resourcesDir: 'src/dev/http/resources',
  stubs: {
    resource: 'resource.stub',
  },
})