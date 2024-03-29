import * as cheerio from 'cheerio'
import { Feed } from 'feed'

class ChannelNotFound extends Error { }
class ChannelNotPublic extends Error { }

const cacheSeconds = 3600;

export default defineEventHandler(async (event) => {
  const channel = getRouterParam(event, 'channel') as string
  const query = getQuery(event)

  console.log(`Fetching feed for channel ${channel} before ${query.from_id}`)

  if (!validateChannelString(channel)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid channel name',
    })
  }

  try {
    const rssFeed = await getChannelFeed({ channel,  beforeId: query.from_id as string});

    setResponseHeader(event, 'Content-Type', 'text/xml;charset=UTF-8')
    setResponseHeader(event, 'Vercel-CDN-Cache-Control', `max-age=${cacheSeconds}`)
    setResponseHeader(event, 'CDN-Cache-Control', `max-age=${cacheSeconds}`)
    setResponseHeader(event, 'Cache-Control', `max-age=${cacheSeconds}`)

    return rssFeed
  } catch (error) {
    if (error instanceof ChannelNotFound) {
      throw createError({
        statusCode: 404,
        statusMessage: `Channel not found or it cannot be previewed at https://t.me/s/${channel}`,
      })
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      })
    }
  }
})

function validateChannelString(channel: string) {
  return channel.match(/^[A-Za-z][A-Za-z0-9_]{4,31}$/)
}

async function getChannelFeed(channelFeedOptions: {channel : string, beforeId : string}) {
  let url = `https://t.me/s/${channelFeedOptions.channel}`;
  if (channelFeedOptions.beforeId) {
    url += `?before=${channelFeedOptions.beforeId}`;
  }
  const html = await getPageHtml(url);

  const $ = cheerio.load(html) as cheerio.Root;

  if (checkChannelNotFound($)) {
      throw new ChannelNotFound();
  }

  const feed = new Feed({
    id: url,
    copyright: 'tg-channel-to-rss',
    title: $('title').text() as string,
    link: url,
    description: $('meta[property="og:description"]').attr('content') as string,
  });

  $('.tgme_widget_message').each((_, element) => {
    const $message = $(element);
    const content = getTextFromDiv($message) as string;
    const item = {
      id: ($message.data('post')).split('/').pop() as string,
      link: getLinkFromDiv($message),
      title: shorten(content, { width: 250, placeholder: '...' }),
      description: content,
      date: new Date($message.find('time.time').attr('datetime') as string),
    };
    feed.addItem(item);
  });

  const rssFeed = feed.rss2();
  return rssFeed;
}

async function getPageHtml(url : string) : Promise<string> {
  try {
      const response = await fetch(url);
      return response.text();
  } catch (error) {
      throw new ChannelNotFound();
  }
}

function checkChannelNotFound($ : cheerio.Root) : boolean {
  const $description = $('.tgme_page_description');
  return $description.length
    && $description
      .text()
      .trim()
      .startsWith('If you have Telegram, you can contact @');
}

function getLinkFromDiv($div : cheerio.Cheerio) : string {
  return $div.find('a.tgme_widget_message_date').attr('href') as string;
}

function getTextFromDiv($div : cheerio.Cheerio) : string {
  const $textElements = $div.find('div.tgme_widget_message_text');
  if ($textElements.length) {
      return $textElements.text().trim();
  } else {
      return getLinkFromDiv($div);
  }
}

function shorten(text: string, options: { width: number, placeholder: string }) : string {
  const { width, placeholder } = options;
  if (text.length <= width) {
      return text;
  }
  return text.slice(0, width - placeholder.length) + placeholder;
}
