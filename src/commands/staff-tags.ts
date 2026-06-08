import { ApplicationCommandRegistry } from '@sapphire/framework';
import { Subcommand } from '@kaname-png/plugin-subcommands-advanced';

export class ParentCommand extends Subcommand {
    public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
        super(context, {
            ...options,
            name: 'staff-tags',
            description: 'Staff tag management commands.',
            preconditions: ['OwnerOnly']
        });
    }

    public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName(this.name)
                .setDescription(this.description)
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('ping')
                        .setDescription('Check the bot and API latency.')
                )
        );
    }
}