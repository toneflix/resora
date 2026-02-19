#!/usr/bin/env ts-node

import { CliApp } from './actions'
import { Kernel } from '@h3ravel/musket'
import { MakeResource } from './commands/MakeResource'
import logo from './logo'

const app = new CliApp()

await Kernel.init(app, {
    logo,
    name: 'Resora CLI',
    baseCommands: [
        MakeResource
    ],
    exceptionHandler (exception) {
        throw exception
    },
})
