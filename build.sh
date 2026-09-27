# maximum shell compatible exception handling.
# -e --> herhangi bir komut hata verirse script durur
# -u --> tanımsız değişken hata üretir
set -eu

# install dependencies
pip3 install mkdocs-material
pip3 install mkdocs-enumerate-headings-plugin

# update the dependencies
pip3 install --upgrade mkdocs-material
pip3 install --upgrade mkdocs-enumerate-headings-plugin
pip3 install --upgrade mkdocs-material-extensions

# generate markdown from doc
cd json_to_markdown
npm run build

# generate web site from markdown
cd ..
$HOME/.local/bin/mkdocs build

cp "index.html" "./site/index.html"

# Test locally
$HOME/.local/bin/mkdocs serve
