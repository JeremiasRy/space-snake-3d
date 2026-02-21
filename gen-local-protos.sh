#!/bin/bash
rm -rf ./static/proto
rm -rf ./protos/proto
mkdir -p ./static/proto

pbjs -t static-module -w es6 -o ./static/proto/protocol.js messages.proto
protoc  --go-vtproto_out=./ --go_out=./ --proto_path=./ messages.proto