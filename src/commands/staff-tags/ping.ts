import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ContainerBuilder,
	Message,
	MessageActionRowComponentBuilder,
	MessageFlags,
	SeparatorBuilder,
	SeparatorSpacingSize,
	TextDisplayBuilder
} from 'discord.js';

import { Command } from '@kaname-png/plugin-subcommands-advanced';

export class PingCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			name: 'ping',
			aliases: ['ping', 'latency'],
			cooldownDelay: 10_000,
			runIn: 'GUILD_TEXT',
			preconditions: ['OwnerOnly'],
			registerSubCommand: {
				parentCommandName: 'staff-tags'
			}
		});
	}

	public override async messageRun(message: Message) {
		const latency = Date.now() - (message.createdTimestamp || 0);
		const websocketLatency = Math.round(this.container.client.ws.ping);

		return message.reply({
			components: [
				new ContainerBuilder()
					.addTextDisplayComponents(
						new TextDisplayBuilder().setContent(
							`### Discord API Latency\n\`\`\`\n[ ${websocketLatency}ms ]\n\`\`\`\n### Bot Latency\n\`\`\`\n[ ${latency}ms ]\n\`\`\``
						)
					)
					.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true))
					.addActionRowComponents(
						new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
							new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Discord Status Page').setURL('https://discordstatus.com/')
						)
					)
			],
			flags: [MessageFlags.IsComponentsV2],
			allowedMentions: {}
		});
	}
}
