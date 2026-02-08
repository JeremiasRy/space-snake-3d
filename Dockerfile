FROM golang:1.23-bookworm

WORKDIR /app

RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    protobuf-compiler \
    && rm -rf /var/lib/apt/lists/*

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest

RUN npm install -g protobufjs-cli protobufjs

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 8000

CMD ["./entrypoint.sh"]