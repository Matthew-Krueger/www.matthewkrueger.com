.PHONY: build server

build:
	cd www && hugo

cleanbuild:
	cd www && rm -rf public && hugo

deploy: cleanbuild
	rsync -avz --delete --no-perms -e "ssh" ./www/public/* mckrueg@www.matthewkrueger.com:/home/mckrueg/sites/www.matthewkrueger.com

server: build
	cd www && hugo --renderToMemory server
