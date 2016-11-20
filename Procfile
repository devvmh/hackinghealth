web: bundle exec rails server -p $PORT
client: sh -c 'rm app/assets/webpack/* || true && cd client && npm run build:development'
signalserver: sh -c 'cd signal-server && npm run serve'
