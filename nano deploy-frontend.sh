#!/bin/bash
cd ~/prilab/EXE201_client
git pull
npm run build
cp -r dist/* /var/www/prilab/dist/
systemctl reload nginx