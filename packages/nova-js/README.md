# Nova.js

Nova.js is a simple library used to interact with the nova discord framework.

## Example
> This example requires a nova instance running, you can do so with the `@discordnova/nova-cli` package wich packages a nova all-in-one instance.
```js
import { Client } from "@discordnova/nova-js";

const client = new Client({
  rest: { api: 'http://localhost:8090' },
  transport: { queue: 'my-super-bot', nats: { servers: ['localhost:4222'] } },
});

client.on('messageCreate', async (message) => {
  console.log('Received a message: ', message.content);
});

(async () => client.start())();
```

