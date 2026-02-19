import { dirname, join } from 'path'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'

import { Command } from '@h3ravel/musket'
import { Config } from 'src/types'
import { createRequire } from 'module'
import { defineConfig } from 'src/utility'

export class CliApp {
    public command!: Command
    private config: Config = {} as Config

    constructor(config: Partial<Config> = {}) {
        this.config = defineConfig(config)

        const require = createRequire(import.meta.url)
        const possibleConfigPaths = [
            join(process.cwd(), 'resora.config.ts'),
            join(process.cwd(), 'resora.config.js'),
            join(process.cwd(), 'resora.config.cjs'),
        ]

        for (const configPath of possibleConfigPaths) {
            if (existsSync(configPath)) {
                try {
                    const { default: userConfig } = require(configPath)
                    Object.assign(this.config, defineConfig(userConfig))
                    break
                } catch (e) {
                    console.error(`Error loading config file at ${configPath}:`, e)
                }
            }
        }
    }

    /**
     * Utility to ensure directory exists
     *
     * @param filePath
     */
    ensureDirectory (filePath: string) {
        const dir = dirname(filePath)
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true })
        }
    }

    /**
     * Utility to generate file from stub
     *
     * @param stubPath
     * @param outputPath
     * @param replacements
     */
    generateFile (stubPath: string, outputPath: string, replacements: Record<string, string>, options?: any) {
        if (existsSync(outputPath) && !options?.force) {
            this.command.error(`Error: ${outputPath} already exists.`)
            process.exit(1)
        } else if (existsSync(outputPath) && options?.force) {
            rmSync(outputPath)
        }

        let content = readFileSync(stubPath, 'utf-8')
        for (const [key, value] of Object.entries(replacements)) {
            content = content.replace(new RegExp(`{{${key}}}`, 'g'), value)
        }

        this.ensureDirectory(outputPath)
        writeFileSync(outputPath, content)

        return outputPath
    }

    /**
     * Command to create a new resource or resource collection file
     *
     * @param name
     * @param options
     */
    makeResource (name: string, options: any) {
        let resourceName = name
        if (options?.collection && !name.endsWith('Collection') && !name.endsWith('Resource')) {
            resourceName += 'Collection'
        } else if (!options?.collection && !name.endsWith('Resource') && !name.endsWith('Collection')) {
            resourceName += 'Resource'
        }

        const fileName = `${resourceName}.ts`
        const outputPath = join(this.config.resourcesDir, fileName)
        const stubPath = join(
            this.config.stubsDir,
            options?.collection || name.endsWith('Collection') ? this.config.stubs.collection : this.config.stubs.resource,
        )

        if (!existsSync(stubPath)) {
            this.command.error(`Error: Stub file ${stubPath} not found.`)
            process.exit(1)
        }

        const collectsName = resourceName.replace(/(Resource|Collection)$/, '') + 'Resource'
        const collects = `/** 
     * The resource that this collection collects.
     */
    collects = ${collectsName}
    `
        const collectsImport = `import ${collectsName} from './${collectsName}'\n`
        const hasCollects = (!!options?.collection || name.endsWith('Collection')) && existsSync(join(this.config.resourcesDir, `${collectsName}.ts`))

        const path = this.generateFile(stubPath, outputPath, {
            ResourceName: resourceName,
            CollectionResourceName: resourceName.replace(/(Resource|Collection)$/, '') + 'Resource',
            'collects = Resource': hasCollects ? collects : '',
            'import = Resource': hasCollects ? collectsImport : '',
        }, options)

        return { name: resourceName, path }
    }
}
