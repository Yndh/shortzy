# 🔗 Shortzy 

Shortzy jest aplikacją do skracania długich linków. Projekt został zrobiony przy użyciu Next.js, Prisma oraz Next-Auth.


[🌎] Sprawdź teraz - https://www.shortzy.xyz/

## Instalacja

1. Sklonuj repozytorium:

```bash
$ git clone https://github.com/Yndh/shortzy.git
$ cd shortzy
```

2. Uruchom aplikację 

.env
```
NEXTAUTH_URL = nextAuthUrl
NEXTAUTH_SECRET = nextAuthSecret

DATABASE_URL = dbUrl

GOOGLE_CLIENT_ID = clientId
GOOGLE_CLIENT_SECRET = googleSecret
GITHUB_ID = githubId
GITHUB_SECRET = githubSecret
```
cmd
```bash
$ npm install
$ npx prisma db push
$ npm run dev
```

## Zdjęcia
![Zdjęcie Aplikacji](https://media.discordapp.net/attachments/1214552490356248586/1227651739004440657/www.shortzy.xyz_.png?ex=66292ec7&is=6616b9c7&hm=3a6968b32a2bba25440b2878f5c934094a6b409e760de06fa9f24b647fcf6ce3&=&format=webp&quality=lossless&width=717&height=468)

![Zdjęcie Aplikacji](https://media.discordapp.net/attachments/1214552490356248586/1227651739537379328/www.shortzy.xyz_dashboard.png?ex=66292ec7&is=6616b9c7&hm=de2ed2bd112b57b6c77089be0d3c410c8d2dbce910995d79fd7cd10e5b500c61&=&format=webp&quality=lossless&width=749&height=468)
