rm -rf ./static/proto
rm -rf ./protos/proto

mkdir -p ./static/proto

pbjs -t static-module -w es6 -o ./static/proto/protocol.js messages.proto
echo frontend done!
protoc --go_out=./ --proto_path=./ messages.proto
echo backend done!