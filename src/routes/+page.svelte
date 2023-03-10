<script>
	import { myPlaylistStore } from '../stores/playlistStore';

	let playlists = myPlaylistStore.getAll();

	function removePlaylist(id) {
		myPlaylistStore.delete(id);
		playlists = myPlaylistStore.getAll();
	}
</script>

<h1>Playlist</h1>

<a href="/edit-playlist">Ajouter une playlist</a>

<br />
<br />


{#if playlists.length === 0}
	<p>Aucune playlist</p>
{/if}

<ul>
	{#each playlists as p}
		<li>
			{p.name}
			<a href="" on:click|preventDefault={() => removePlaylist(p.id)}>SUPPRIMER</a>
			<a href={`edit-playlist/${p.id}`}>MODIFIER</a>
		</li>
	{/each}
</ul>
