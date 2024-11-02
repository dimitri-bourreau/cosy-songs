# Cosy Songs

Écoutez les musique cosy du Cosy Corner. 🎵

[cosysongs.fr](https://cosysongs.fr)

## Exécuter localement

```bash
# Récupérer les playlists (drapeaux optionnels)
deno --allow-net --allow-write fetch-playlists.fr

# Pour ne pas être embêté par cors, je recommande :
npm i -g http-server
http-server

# Tester
deno test --allow-read
```
