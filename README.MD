ASENNUS:

Esivaatimus:
-MariaDB 10.11 asennettuna koneelle

Vaiheet:

1. Kloonaa koneelle, tee npm install sekä budgeting appissa että root folderissa.

2. Luo .env -tiedosto näillä tiedoilla (esimerkki):

PORT='3001'
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=budgetdatabase

3. ala devata

4. Jos haluat yhdistää frontin ja pyörittää sitä backin päällä:
    - mene budgeting_app -kansioon
    - suorita npm run build
    - kopioi build-kansio projektin pääkansioon
    - modaa server.js siten, että siellä on kohta
        app.use(express.static('build'))
