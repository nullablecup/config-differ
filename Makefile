install:
		npm install

run:
		npm run babel-node -- './bin/gendiff.js'

publish:
		npm publish

lint:
		npm run eslint .
