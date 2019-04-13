#!/bin/sh

./encrypt_secrets.rb production

./gradlew clean build

docker build . --tag gcr.io/wortschatz-rockyj/wortschatz-api

gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin https://gcr.io

docker push gcr.io/wortschatz-rockyj/wortschatz-api

gcloud beta run deploy wortschatz-api --image gcr.io/wortschatz-rockyj/wortschatz-api
