
# tg-channel-to-rss

A simple UI and API to create RSS feed from a Telegram channel. **\*\*(only works on public channels)\*\***


## Demo

[https://tg-channel-to-rss.vercel.app](https://tg-channel-to-rss.vercel.app/)


## API Reference

#### Get last messages

```http
  GET /api/rss/<channel_id>?from_id=<message_id>
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `channel_id` | `string` | **Required**. without \`@\` |
| `from_id` | `string` |  Get messages from a message_id  |


## Run Locally

### Setup
Clone the project

```bash
  git clone https://github.com/savaf/tg-channel-to-rss.git
```

Go to the project directory

```bash
  cd tg-channel-to-rss
```

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Start the server

```bash
  npm run start
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Author

- [@savaf](https://www.github.com/savaf)
