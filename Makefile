install:
	npm install

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js

link:
	npm link

unlink:
	npm unlink

publish:
	npm publish --dry-run