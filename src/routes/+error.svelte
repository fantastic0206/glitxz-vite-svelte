<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>Erroneous</h1>

<h2>Code {$page.error?.code}</h2>

<p>
	Either we messed up our code, we couldn't reach somebody else's server, or you mistyped something.
	Hard to say.
</p>
