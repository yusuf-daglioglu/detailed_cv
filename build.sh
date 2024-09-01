# install dependencies
pip3 install mkdocs-material
pip3 install mkdocs-enumerate-headings-plugin

# generate markdown from doc
cd json_to_markdown_generator
npm run build

# generate web site from markdown
cd ..
$HOME/.local/bin/mkdocs build

cp "index.html" "./site/index.html"

# Test locally
$HOME/.local/bin/mkdocs serve
