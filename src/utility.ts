import { Config } from './types'
import { existsSync } from 'fs'
import path from 'path'

let stubsDir = path.resolve(process.cwd(), 'node_modules/resora/stubs')
if (!existsSync(stubsDir)) {
    stubsDir = path.resolve(process.cwd(), 'stubs')
}

export const getDefaultConfig = (): Config => {
    return {
        stubsDir,
        preferredCase: 'camel',
        paginatedExtras: ['meta', 'links'],
        paginatedLinks: {
            first: 'first',
            last: 'last',
            prev: 'prev',
            next: 'next',
        },
        paginatedMeta: {
            to: 'to',
            from: 'from',
            links: 'links',
            path: 'path',
            total: 'total',
            per_page: 'per_page',
            last_page: 'last_page',
            current_page: 'current_page',
        },
        resourcesDir: 'src/resources',
        stubs: {
            config: 'resora.config.stub',
            resource: 'resource.stub',
            collection: 'resource.collection.stub',
        },
    }
}

/**
 * Define the configuration for the package
 * 
 * @param userConfig  The user configuration to override the default configuration
 * @returns The merged configuration object
 */
export const defineConfig = (
    userConfig: Partial<Omit<Config, 'stubs'>> & { stubs?: Partial<Config['stubs']> } = {}
): Config => {
    const defaultConfig = getDefaultConfig()

    return Object.assign(
        defaultConfig,
        userConfig,
        {
            stubs: Object.assign(defaultConfig.stubs, userConfig.stubs || {}),
        }
    )
}