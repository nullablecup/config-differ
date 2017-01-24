install:
		npm install

run:
		npm run babel-node -- ./bin/gendiff.js $(p)

publish:
		npm publish

lint:
		npm run eslint .

test:
		npm test

test-watch:
		npm run test-watch
