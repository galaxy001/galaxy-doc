#!/bin/sh

rm -fr t

mkdir -p t/b
cd haruhi-tsuisou
find . -name '*.htm*' -exec echo {} \; -exec iconv -f shift-jis -t utf8 {} -c -o ../t/{} \;
# ./data-trophy.html	iconv: illegal input sequence at position 16192
# ./b/system.html	iconv: illegal input sequence at position 2795
cd ..

cd t
find . -name '*.htm*' -exec echo {} \; -exec sed -i.bak -e '/<HTML><HEAD>/ a <meta charset="UTF-8">' {} \;
cd ..
