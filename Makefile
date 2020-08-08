install:
	npm install

lint:
	npx eslint --format json .

link:
	npm link

unlink:
	npm unlink

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8