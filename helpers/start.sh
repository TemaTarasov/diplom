npm i;
rm -fr ./public/assets/js/dist;
npm run ui;
rm -fr dist;
babel server server/bin/www --out-dir dist;
cp -R ./dist/server/bin ./dist;
rm -fr ./dist/server;
cp -R ./server/views ./dist;
cp -R ./server/config ./dist;
rm -fr ./dist/config/*.example.json;
node ./dist/bin/www;
