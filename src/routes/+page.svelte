<script lang="ts">
  import UeCreate from '$lib/api/UeCreate';
  import type { Ue } from '$lib/types';
  import { page } from '$app/stores';
  import { localLoading } from '../stores';
  import Loader from '../components/Loader.svelte';

  let name: Ue['name'];
  let date: string | undefined = undefined;
  let time: string | undefined = undefined;
  let location: Ue['location'];
  let description: Ue['description'];
  let ue: Ue | undefined = undefined;
  let isLoading: boolean;
  localLoading.subscribe((value) => {
    isLoading = value;
  });

  $: required = !!time;

  let combined_time = () => {
    if (date && time) {
      return `${date}T${time}`;
    }
    if (date) {
      return date;
    }
  };

  async function onSubmit() {
    const data = { name, time: combined_time(), location, description };
    if (!ue) {
      ue = await UeCreate(data);
    } else {
      ue = undefined;
      localLoading.set(true);
      const result = await UeCreate(data);
      setTimeout(async () => {
        ue = result;
        localLoading.set(false);
      }, 1000);
    }
  }

  const select = (event: MouseEvent & { currentTarget: EventTarget & HTMLInputElement }) =>
    event.currentTarget.select();
  const share = async () => {
    if (!ue) return;
    try {
      const title = `${ue.name} ${ue.time ? new Date(ue.time).toDateString() : ''}`;
      const description = ue.description ? '| ' + ue.description : '';
      const data = {
        title: title,
        text: `${title} ${description}`,
        url: `${window.location}${ue.id}`
      };
      await navigator.share(data);
    } catch (err) {
      console.log(err);
    }
  };
</script>

<div
  class="flex flex-col justify-center bg-gradient-to-br from-primary to-secondary pb-12 text-white p-6"
>
  <div class="mt-10 text-center">
    <h1 class="mb-2">eventSHARE</h1>
    <h2>Create. Share. Easy.</h2>
  </div>
  <div class="flex flex-col gap-4">
    <div class="m-auto">
      <h3>How it works</h3>
      <div class="flex gap-2">
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-6 w-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Create an event
      </div>
      <div class="flex gap-2">
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-6 w-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Get a link
      </div>
      <div class="flex gap-2">
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-6 w-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Share!
      </div>
    </div>
    <div>
      <h3>Try it now</h3>
      <form class="flex gap-1 p-2 border-2 rounded-lg border-gray-100/20">
        <div class="flex space-x-4">
          <label class="w-16" for="name">Name</label>
          <input
            bind:value={name}
            class="h-8 m-auto rounded-none bg-transparent p-0 outline-none border-gray-100/20 border-b-2 focus:border-gray-100/80"
            id="name"
            name="name"
            title="Name"
            minlength="2"
            maxlength="250"
            placeholder="Something awesome!"
            required
            autocomplete="off"
          />
        </div>
        <div class="flex">
          <button>Has Time</button>
          <button>Description</button>
        </div>
        <div class="flex space-x-4">
          <label class="w-16" for="date">Date</label>
          <input
            bind:value={date}
            class="h-8 m-auto rounded-none bg-transparent p-0 outline-none border-gray-100/20 border-b-2 focus:border-gray-100/80"
            name="date"
            id="date"
            min={new Date().toISOString().split('T')[0]}
            type="date"
            {required}
          />
        </div>

        <div class="flex space-x-4">
          <label class="w-16" for="time">Time</label>
          <input
            id="time"
            class="h-8 m-auto rounded-none bg-transparent p-0 outline-none border-gray-100/20 border-b-2 focus:border-gray-100/80"
            bind:value={time}
            name="time"
            type="time"
          />
        </div>
        <div class="flex space-x-4">
          <label for="description" class="w-16">Desc.</label>
          <textarea
            bind:value={description}
            id="description"
            class="m-auto rounded-none pt-2 bg-transparent p-0 outline-none border-gray-100/20 border-b-2 focus:border-gray-100/80"
            name="description"
            placeholder="Add a description"
            maxlength="250"
          />
        </div>
        <button type="submit" class="mt-4 create-link" disabled={isLoading}>
          {#if isLoading}
            <Loader />
          {:else}
            <span
              ><svg
                class="h-4 mr-1.5 fill-gray-800"
                focusable="false"
                aria-hidden="true"
                viewBox="2 5 20 12"
                ><path
                  d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
                /></svg
              ></span
            >
            Get Link
          {/if}
        </button>
      </form>
    </div>
  </div>
</div>

<!--<div class="bg-gradient-to-br py-10 text-white from-primary to-secondary lg:pt-20">-->
<!--  <div class="m-auto max-w-7xl">-->
<!--    <div class="lg:pb-32 lg:pl-10">-->
<!--      <div class="lg:flex">-->
<!--        <div>-->
<!--          <h1 class="mb-2 flex justify-center text-5xl font-bold">-->
<!--            eventSHARE-->
<!--            <svg-->
<!--              class="mt-2 ml-1 h-8 fill-white"-->
<!--              focusable="false"-->
<!--              aria-hidden="true"-->
<!--              viewBox="0 0 22 22"-->
<!--            >-->
<!--              <path-->
<!--                d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"-->
<!--              />-->
<!--            </svg>-->
<!--          </h1>-->
<!--          <h2 class="text-center font-semibold">a better way to share events</h2>-->
<!--          <div-->
<!--            class="flex w-full flex-col items-center lg:space-x-4 lg:space-y-0 lg:flex-row lg:items-start"-->
<!--          >-->
<!--            <h3>How it Works</h3>-->
<!--            <div class="my-2 flex max-w-sm flex-col gap-2 text-left">-->
<!--              <div class="flex gap-2">-->
<!--                <svg-->
<!--                  width="20"-->
<!--                  height="20"-->
<!--                  xmlns="http://www.w3.org/2000/svg"-->
<!--                  fill="none"-->
<!--                  viewBox="0 0 24 24"-->
<!--                  class="inline-block h-6 w-6 stroke-current"-->
<!--                >-->
<!--                  <path-->
<!--                    stroke-linecap="round"-->
<!--                    stroke-linejoin="round"-->
<!--                    stroke-width="2"-->
<!--                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"-->
<!--                  />-->
<!--                </svg>-->
<!--                Create an event-->
<!--              </div>-->
<!--              <div class="flex gap-2">-->
<!--                <svg-->
<!--                  width="20"-->
<!--                  height="20"-->
<!--                  xmlns="http://www.w3.org/2000/svg"-->
<!--                  fill="none"-->
<!--                  viewBox="0 0 24 24"-->
<!--                  class="inline-block h-6 w-6 stroke-current"-->
<!--                >-->
<!--                  <path-->
<!--                    stroke-linecap="round"-->
<!--                    stroke-linejoin="round"-->
<!--                    stroke-width="2"-->
<!--                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"-->
<!--                  />-->
<!--                </svg>-->
<!--                Get a link-->
<!--              </div>-->
<!--              <div class="flex gap-2">-->
<!--                <svg-->
<!--                  width="20"-->
<!--                  height="20"-->
<!--                  xmlns="http://www.w3.org/2000/svg"-->
<!--                  fill="none"-->
<!--                  viewBox="0 0 24 24"-->
<!--                  class="inline-block h-6 w-6 stroke-current"-->
<!--                >-->
<!--                  <path-->
<!--                    stroke-linecap="round"-->
<!--                    stroke-linejoin="round"-->
<!--                    stroke-width="2"-->
<!--                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"-->
<!--                  />-->
<!--                </svg>-->
<!--                Share!-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <form on:submit|preventDefault={onSubmit} class="px-4">-->
<!--          <div class="flex space-x-2">-->
<!--            <span class="m-auto">Name</span>-->
<!--            <label for="name" class="w-full">-->
<!--              <input-->
<!--                bind:value={name}-->
<!--                class="h-6 bg-transparent h"-->
<!--                id="name"-->
<!--                name="name"-->
<!--                title="Name"-->
<!--                minlength="2"-->
<!--                maxlength="250"-->
<!--                placeholder="Event name"-->
<!--                required-->
<!--                autocomplete="off"-->
<!--              />-->
<!--            </label>-->
<!--          </div>-->

<!--          <div class="flex flex-col gap-4 min-[365px]:flex-row">-->
<!--            <div class="form-control">-->
<!--              <label for="date">Date</label>-->
<!--              <input-->
<!--                bind:value={date}-->
<!--                class="input-bordered"-->
<!--                name="date"-->
<!--                id="date"-->
<!--                min={new Date().toISOString().split('T')[0]}-->
<!--                type="date"-->
<!--                {required}-->
<!--              />-->
<!--            </div>-->
<!--            <div class="form-control">-->
<!--              <label for="time"> Time </label>-->
<!--              <input id="time" class="input-bordered" bind:value={time} name="time" type="time" />-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="form-control">-->
<!--            <label for="description">Description</label>-->
<!--            <textarea-->
<!--              bind:value={description}-->
<!--              id="description"-->
<!--              class="input-bordered"-->
<!--              name="description"-->
<!--              placeholder="Add a description"-->
<!--              maxlength="250"-->
<!--            />-->
<!--          </div>-->

<!--          <button type="submit" class="mt-4 create-link" disabled={isLoading}>-->
<!--            {#if isLoading}-->
<!--              <Loader />-->
<!--            {:else}-->
<!--              <span-->
<!--                ><svg-->
<!--                  class="h-4 mr-1.5 fill-gray-800"-->
<!--                  focusable="false"-->
<!--                  aria-hidden="true"-->
<!--                  viewBox="2 5 20 12"-->
<!--                  ><path-->
<!--                    d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"-->
<!--                  /></svg-->
<!--                ></span-->
<!--              >-->

<!--              Get Link-->
<!--            {/if}-->
<!--          </button>-->
<!--        </form>-->

<!--        {#if ue}-->
<!--          <div class="mt-4 flex gap-4 border-gray-600 pt-4">-->
<!--            <label class="w-full">-->
<!--              Shareable Link-->
<!--              <input-->
<!--                class="bg-gray-300 text-xs ring-color-blue"-->
<!--                on:click={select}-->
<!--                value={`${$page.url}${ue.id}`}-->
<!--              />-->
<!--            </label>-->
<!--            <div class="mt-auto">-->
<!--              <a href={`${$page.url}${ue.id}`}>-->
<!--                <button type="submit" class="view-link"-->
<!--                  ><span-->
<!--                    ><svg class="mr-2 h-4" focusable="false" aria-hidden="true" viewBox="0 0 22 22"-->
<!--                      ><path-->
<!--                        d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"-->
<!--                      /></svg-->
<!--                    ></span-->
<!--                  >View-->
<!--                </button>-->
<!--              </a>-->
<!--            </div>-->
<!--            <div class="mt-auto">-->
<!--              <button type="submit" class="share-link" on:click={share}-->
<!--                ><span-->
<!--                  ><svg class="mr-2 h-4" focusable="false" aria-hidden="true" viewBox="0 0 22 22"-->
<!--                    ><path-->
<!--                      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"-->
<!--                    /></svg-->
<!--                  ></span-->
<!--                >Share-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--        {/if}-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

<!--</div>-->
<style lang="postcss">
  .form-control {
    @apply w-full;
  }

  .ring-color-blue {
    @apply focus:border-blue-500 focus:ring-blue-500;
  }

  .create-link {
    @apply justify-center inline-flex rounded-md items-center border border-transparent bg-fuchsia-600 px-4 py-3.5 font-medium leading-4 shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-gray-800 focus:ring-offset-2;
  }

  .share-link {
    @apply inline-flex rounded-md items-center border border-transparent bg-blue-600 px-4 py-3.5 font-medium leading-4 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-gray-800 focus:ring-offset-2;
  }

  .view-link {
    @apply inline-flex rounded-md items-center bg-gray-600 border border-transparent  px-4 py-3.5 font-medium leading-4 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-gray-800 focus:ring-offset-2;
  }
</style>
