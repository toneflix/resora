#!/usr/bin/env ts-node

import { CliApp } from './actions'
import { Kernel } from '@h3ravel/musket'
import logo from './logo'
import path from 'node:path'

const app = new CliApp()

await Kernel.init(app, {
    logo,
    name: 'Resora CLI',
    discoveryPaths: [path.join(process.cwd(), 'src/cli/commands/*.ts')],
    exceptionHandler (exception) {
        throw exception
    },
})
