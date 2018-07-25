FROM_TAG := ""
TO_TAG := ""
GITHUB_API_TOKEN := ""

##
# Releases
release:
	npm run dist
	./node_modules/.bin/lerna publish --force-publish=*

release-canary:
	npm run dist
	./node_modules/.bin/lerna publish --canary

##
# Changelog
changelog:
	git checkout master
	git pull origin master
	GITHUB_AUTH=$(GITHUB_API_TOKEN) ./node_modules/.bin/lerna-changelog --tag-from $(FROM_TAG) --tag-to $(TO_TAG)

push-changelog:
	git checkout master
	git pull origin master
	git add CHANGELOG.md
	git commit -m 'changelog updated.'
	git push origin master

##
# Packages
list-packages:
	./node_modules/.bin/lerna ls

list-updated:
	./node_modules/.bin/lerna updated

list-dists:
	@echo "bytes \\t kilobytes \\t file"
	@echo "--- \\t\\t --- \\t\\t ---"
	@ls -alh ./packages/proppy*/dist/*.min.js.gz | awk '{print $$9 }' | while read LINE; do\
		SIZE="$$(cat $${LINE} | wc -c | bc)";\
		SIZE_IN_KB=$$(echo "scale=1; $${SIZE} / 1024" | bc);\
		echo "$${SIZE}K \\t\\t $${SIZE_IN_KB}K \\t\\t $${LINE}";\
	done

##
# Site
site-build:
	node ./site/bin/build.js

	mkdir -p ./_site/css
	./node_modules/.bin/node-sass --include-path ./node_modules ./site/assets/css/main.scss ./_site/css/site.css

	mkdir -p ./_site/js
	cp -r ./site/assets/js/ ./_site/js/
	cp -rf ./site/assets/img ./_site/img

site-watch:
	make site-build
	fswatch -or './site' | xargs -I{} make site-build

site-serve-only:
	echo "Starting server at http://localhost:6001"
	./node_modules/.bin/live-server --port=6001 ./_site/

site-serve:
	make site-build
	make site-serve-only

site-publish:
	rm -rf ./_site
	make site-build
	make site-publish-only

site-publish-only:
	rm -rf ./_site/.git

	cp -f CNAME ./_site/CNAME

	(cd ./_site && git init)
	(cd ./_site && git commit --allow-empty -m 'update site')
	(cd ./_site && git checkout -b gh-pages)
	(cd ./_site && touch .nojekyll)
	(cd ./_site && git add .)
	(cd ./_site && git commit -am 'update site')
	(cd ./_site && git push git@github.com:fahad19/proppy gh-pages --force)
