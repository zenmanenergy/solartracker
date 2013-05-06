#/bin/bash

export NODE_ENV=development

# Invoke the Forever module (to START our Node.js server).
/var/www/solartracker/server/node_modules/forever/bin/forever \
start \
-al /var/solartracker/log/development/forever.log \
-ao /var/solartracker/log/development/out.log \
-ae /var/solartracker/log/development/err.log \
/var/www/solartracker/server/app.js
exit 0