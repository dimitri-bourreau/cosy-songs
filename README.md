# Cosy Songs

Écoutez les musique cosy du Cosy Corner. 🎵

## Exécuter localement

```bash
# Récupérer les playlists (drapeaux optionnels)
deno --allow-net --allow-write deno-scripts/fetch-playlists.ts

# Pour ne pas être embêté par cors, je recommande :
npm i -g http-server
http-server

# Tester
deno test --allow-read
```
