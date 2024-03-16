<script setup lang="ts">
let channel = ref<string>('');

const rssLink = computed<string>(() => {
  return window.location.href + 'rss/' + channel.value;
});


function onInput(event: Event): void {
  let link = ''
  if (
    event.target instanceof HTMLInputElement
    && event.target.checkValidity()
    && event.target.value.length > 0
  ) {
    link = event.target.value;
  }
  channel.value = link;
}

function onPaste(event: ClipboardEvent): void {
  event.preventDefault();
  const paste = event.clipboardData?.getData("text") || '';
  const modifiedPaste = paste.replace(/(https:\/\/)?(t|telegram)\.me\//, "");
  if (event.target instanceof HTMLInputElement) {
      event.target.value = modifiedPaste;
      event.target.dispatchEvent(new Event("input"));
  }
}

</script>

<template>
  <main class="flex justify-center items-center w-full pt-32">
    <div class="container mx-auto">
      <div
        class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12 text-center"
      >
        <h2
          class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto"
        >
          tg-channel-to-rss
        </h2>
        <p class="text-base text-white md:text-lg mt-8 text-center">
          Create RSS feed from a Telegram channel
        </p>
      </div>
      <form class="relative isolate mt-8 flex items-center pr-1 pl-8">
        <label for="tgChannelInput" class="text-white">t.me/</label>
        <input
          required
          type="text"
          pattern="^[A-Za-z][A-Za-z0-9_]{4,31}$"
          id="tgChannelInput"
          placeholder="channel name, 5-32 symbols"
          class="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base
            text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6
            invalid:text-red-500
          "
          name="email"
          title="5 to 32 symbols: letters, digits and _, starting with a letter"
          @input="onInput"
          @paste="onPaste"
        >

        <ClientOnly v-if="channel">
          <a :href="rssLink" class="group relative isolate flex-none rounded-md py-1.5 text-[0.8125rem]/6 font-semibold text-white pl-2.5 pr-[calc(9/16*1rem)]" type="submit">
            <span class="absolute inset-0 rounded-md bg-gradient-to-b from-white/80 to-white opacity-10 transition-opacity group-hover:opacity-15"></span>
            <span class="absolute inset-0 rounded-md opacity-7.5 shadow-[inset_0_1px_1px_white] transition-opacity group-hover:opacity-10"></span>
            Go to link
            <span aria-hidden="true">→</span>
          </a>
        </ClientOnly>

        <div class="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15"></div>
        <div class="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300"></div>
      </form>

      <p v-if="channel" class="text-base text-white md:text-lg mt-8 text-center">
        Link to the RSS feed:
        <ClientOnly fallback-tag="span" fallback="Loading...">
          <a :href="rssLink" class="text-sky-300">{{  rssLink }}</a>
        </ClientOnly>
      </p>

    </div>
  </main>
</template>
