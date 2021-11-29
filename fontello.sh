yarn fontello-cli install --config src/fonts/fontello/config.json
find ./ -maxdepth 1 -name 'fontello-*' -exec mv {} fontello \;
rm -rf src/fonts/fontello
mv fontello src/fonts
rm .fontello-session
