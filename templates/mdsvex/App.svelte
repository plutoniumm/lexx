<script>
  import { onMount } from "svelte";
  import { marked } from "marked";
  import content from "./content.md";

  onMount(() => {
    console.log(marked);
    console.log(content);
  });
</script>

<main>
  <article style="border: 1px solid grey;">
    <!-- <svelte:component this={content} /> -->
  </article>
</main>

<style>
  article {
    padding: 1rem;
    margin-top: 1rem;
  }
</style>
