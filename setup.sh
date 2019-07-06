#!/bin/bash
set -ex
meteor npm install
MONGO_URL="mongodb+srv://will:zhangubc@cluster0-5p0xr.mongodb.net/test?retryWrites=true&w=majority" meteor run
