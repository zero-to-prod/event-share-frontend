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

<div class="bg-secondary-content py-10">
  <div class="sm:max-w-7xl mx-auto">
    <div class="bg-base-100 sm:m-4 sm:shadow sm:rounded-2xl p-4 md:w-1/2 lg:w-1/3 divide-y">
      <div>
        <h1>Create an Event</h1>
        <form on:submit|preventDefault={onSubmit}>
          <label>
            <span class="label">Name</span>
            <input
              bind:value={name}
              class="input"
              name="name"
              minlength="2"
              maxlength="250"
              placeholder="Event name"
              required
              autocomplete="off"
            />
          </label>
          <div class="flex flex-col gap-4 min-[365px]:flex-row">
            <label class="w-full">
              <span class="label">Date</span>
              <input
                bind:value={date}
                class="input"
                name="date"
                min={new Date().toISOString().split('T')[0]}
                type="date"
                {required}
              />
            </label>
            <label class="w-full">
              <span class="label">Time</span>
              <input class="input" bind:value={time} name="time" type="time" />
            </label>
          </div>

          <label>
            <span class="label">Description</span>
            <textarea
              bind:value={description}
              class="input"
              name="description"
              placeholder="Add a description"
              maxlength="250"
            />
          </label>

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
      {#if ue}
        <div class="flex pt-4 gap-4 border-gray-600 mt-4">
          <label class="w-full">
            Shareable Link
            <input
              class="input ring-color-blue bg-gray-300 text-xs "
              on:click={select}
              value={`${$page.url}${ue.id}`}
            />
          </label>
          <div class="mt-auto">
            <a href={`${$page.url}${ue.id}`}>
              <button type="submit" class="view-link"
                ><span
                  ><svg class="h-4 mr-2" focusable="false" aria-hidden="true" viewBox="0 0 22 22"
                    ><path
                      d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                    /></svg
                  ></span
                >View</button
              >
            </a>
          </div>
          <div class="mt-auto">
            <button type="submit" class="share-link" on:click={share}
              ><span
                ><svg class="h-4 mr-2" focusable="false" aria-hidden="true" viewBox="0 0 22 22"
                  ><path
                    d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
                  /></svg
                ></span
              >Share</button
            >
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="postcss">
  label {
    @apply mt-1;
  }
  .input {
    @apply focus:border-fuchsia-500 focus:outline-0 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-gray-800;
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
  .label {
    @apply ml-1;
  }
</style>
