<script>
  import render from "./parse.js";
  import content from "./content.md";

  function proc(content) {
    let string = "";
    try {
      return render(content).html;
    } catch (e) {
      console.log("ERROR: ", e);
    }

    return string;
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
</svelte:head>

<article>
  {@html proc(content)}
</article>
