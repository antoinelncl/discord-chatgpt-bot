import { init } from '@sentry/node';
import { DiscordjsError, DiscordjsErrorCodes } from 'discord.js';
import { errorHelper } from '~/helpers/error-helper';

export class EnvVarHelper {
  public sentryDsn: string;
  public discordToken: string;
  public discordApplicationId: string;
  public openAiToken: string;

  constructor(
    sentryDsn: string | undefined,
    discordToken: string | undefined,
    discordApplicationId: string | undefined,
    openAiToken: string | undefined,
  ) {
    try {
      if (!sentryDsn) throw new Error('Sentry DSN environement variable missing.');
      if (!discordToken) throw new DiscordjsError(DiscordjsErrorCodes.TokenMissing);
      if (!discordApplicationId) throw new Error('Application id of Eustache missing.');
      if (!openAiToken) throw new Error('OpenAi token of Eustache missing.');
    } catch (error) {
      errorHelper('envHelper', error);
      process.exit(1);
    }

    // Sentry
    this.sentryDsn = sentryDsn;
    init({
      dsn: this.sentryDsn,
      tracesSampleRate: 1.0,
    });

    this.discordToken = discordToken;
    this.discordApplicationId = discordApplicationId;
    this.openAiToken = openAiToken;
  }
}
