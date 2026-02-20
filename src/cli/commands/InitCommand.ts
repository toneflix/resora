import { CliApp } from '../CliApp'
import { Command } from '@h3ravel/musket'

export class InitCommand extends Command<CliApp> {
    protected signature = `init
        {--force : Force overwrite if config file already exists (existing file will be backed up) }
    `

    protected description = 'Initialize Resora'

    async handle () {
        this.app.command = this

        this.app.init()

        this.success('Resora initialized')
    }
}