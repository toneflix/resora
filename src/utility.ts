import { Config } from './types'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = /* @__PURE__ */ path.dirname(fileURLToPath(import.meta.url))

let stubsDir = path.resolve(__dirname, '../node_modules/resora/stubs')
if (!existsSync(stubsDir)) {
    stubsDir = path.resolve(__dirname, '../stubs')
}

/**
 * Define the configuration for the package
 * 
 * @param userConfig  The user configuration to override the default configuration
 * @returns The merged configuration object
 */
export const defineConfig = (userConfig: Partial<Omit<Config, 'stubs'>> & { stubs?: Partial<Config['stubs']> } = {}): Config => {
    return Object.assign(
        {
            resourcesDir: 'src/resources',
            stubsDir,
            stubs: {
                resource: 'resource.stub',
                collection: 'resource.collection.stub',
            },
        },
        userConfig,
        {
            stubs: Object.assign({
                resource: 'resource.stub',
                collection: 'resource.collection.stub',
            }, userConfig.stubs || {}),
        })
}