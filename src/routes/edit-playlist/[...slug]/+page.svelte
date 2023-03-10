<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { myPlaylistStore } from '../../../stores/playlistStore';

	const id = $page.params.slug;
	

	function resetPlaylist() {
		return { id: null, name: null };
	}

	let playlist = id.length === 0 ? resetPlaylist() : myPlaylistStore.get(id);

	function save() {
		myPlaylistStore.save(playlist);
        playlist = resetPlaylist();
        goto('/')
	}
</script>

<h1>{id.length === 0 ? 'Ajouter une playlist' : 'Editer la playlist '}</h1>

<a href="/">Retour au playlist</a>
<br>
<br>
<form on:submit|preventDefault={save}>
	<label>
		Nom de la playlist
		<input name="name" type="text" bind:value={playlist.name} />
	</label>
	<button>Enregistrer</button>
</form>
