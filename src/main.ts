import { client, env } from '~/container';
import * as events from '~/events';
import { logHelper } from './helpers/log-helper';

(async () => {
  await client.login(env.discordToken);

  Object.entries(events)
    .map((event) => event[1])
    .forEach((event) => {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    });

  logHelper.info(`${client.user?.username} is online`);
})();
