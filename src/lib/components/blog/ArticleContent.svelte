<script lang="ts">
	
  export let articleContent: string | undefined;
</script>

  
<article class="articleStyle">{@html articleContent} </article>
<!-- 
style specific tags from the html content like so. All parsed html should be styled in its own component
 -->
<style>
  .articleStyle :global(p){
    @apply p-3 text-xl w-4/5;
  }
  .articleStyle :global(h2){
    @apply p-3 text-2xl;
  }
  .articleStyle :global(h3){
    @apply p-3 text-3xl;
  }
  .articleStyle{
    @apply w-4/5 font-navigo leading-5 p-2 ;
  }
</style>