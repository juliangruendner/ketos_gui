npm run env -s && ng build --prod --base-href=/
rm ketos_gui.zip
zip -r ketos_gui.zip dist/
cp ketos_gui.zip ../ketos_brain_api/ketos_gui.zip
cd ../ketos_brain_api 
docker build -f Dockerfile.ketos_gui_server -t ketos_gui:latest .
