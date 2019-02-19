npm run env -s && ng build --prod --base-href=/
rm ketos_gui.zip
zip -r ketos_gui.zip dist/
cp ketos_gui.zip ../ketos_brain_api/ketos_gui.zip
