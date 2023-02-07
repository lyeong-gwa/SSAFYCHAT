#!/bin/bash
set -e

mongosh <<EOF
db = db.getSiblingDB('ssafychat')

db.createUser({
  user: '$MONGO_INITDB_USERNAME',
  pwd: '$MONGO_INITDB_PASSWORD',
  roles: [{ role: 'readWrite', db: 'ssafychat' }],
});
db.createCollection('chatting')
EOF
