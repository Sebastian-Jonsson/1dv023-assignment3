// Server script placed in the proper file in production.
// This is in the post-receive on the serverside.

#!/bin/bash

git --work-tree=/var/www/webhook --git-dir=/var/repo/site.git checkout -f
cd /var/www/webhook
npm install --production
pm2 start app.js --name=webhook