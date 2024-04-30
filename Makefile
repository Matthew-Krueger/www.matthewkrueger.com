.PHONY:

build:
	cd www && hugo --logLevel info

deploy: build
	rsync -avz --delete --no-perms -e "ssh" ./www/public/* mckrueg@www.matthewkrueger.com:/home/mckrueg/sites/www.matthewkrueger.com
