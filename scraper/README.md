uv init
uv add scrapy
source .venv/bin/activate
scrapy startproject bookscraper

# Explanation
#   Spider.py
#       Given URL to scrape, and parse function -> yields record item 
#   Item.py
#       Schema of Record that Data gets put into
#   Pipeline.py
#       Processes Extracted Item additionally -> like putting into a Database with separate specific schema
#   Middlewares.py
#       Configurations of Spider Operation:
#        - Timing Out Request/ Request Wait Duration for Response
#        - What headers wanted in request
#        - What user agents used in request
#        - Retries numbers
#        - Managing Cookies / Caches
#        - Select type of requests you want to do
#        - Exception Handling
#   Settings.py
#       Basic Configurations (how spider operates):
#        - Obeying Robots.txt?
#        - Concurrent Requests num?

cd bookscraper/bookscraper/spiders/
scrapy genspider bookspider books.toscrape.com
brew install ipython
scrapy shell