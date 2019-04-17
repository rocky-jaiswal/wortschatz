#!/bin/sh

./encrypt_secrets.rb production

./gradlew clean build

docker build . --tag gcr.io/wortschatz-rockyj/wortschatz-api

gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin https://gcr.io

gcloud config set run/region us-central1
gcloud config set core/project wortschatz-rockyj

docker push gcr.io/wortschatz-rockyj/wortschatz-api

gcloud beta run deploy wortschatz-rockyj --image gcr.io/wortschatz-rockyj/wortschatz-api

# revert for local development
./encrypt_secrets.rb development
