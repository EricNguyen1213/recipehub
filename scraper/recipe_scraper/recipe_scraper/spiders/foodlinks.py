import scrapy
import re
from scrapy import signals  # Import the signals system
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule


class FoodLinkSpider(CrawlSpider):
    name = "food_links"

    # Starting URL
    start_urls = ["https://www.food.com/"]

    # Initialize our custom counter at zero
    pages_visited_count = 0

    # SHARED DENY LIST for general junk
    shared_deny = (
        r"help\.food\.com",
        r"/recipe/all/",
        r"/recipe/?$",
        r"/members/",
        r"/user/",
        r"/mail/",
        r"/search/",
        r"/search/?$",
        r"/saves/",
        r"/saves/?$",
        r"/activity/",
        r"/activity/?$",
        r"/topic/",
        r"/topic/?$",
        r"/about/",
        r"/about/?$",
        r"/how-to/about-us-31",
    )

    recipe_page_pattern = r"/recipe/[\w-]+-\d+$"

    rules = (
        # RULE 1: Recipe Leaves get HIGHEST PRIORITY (Priority: 100)
        # Forces Scrapy to download and save every found recipe first.
        Rule(
            LinkExtractor(
                allow_domains=["food.com", "www.food.com"],
                allow=(recipe_page_pattern),
                deny=shared_deny,
                process_value=lambda url: url.split("?")[0],
            ),
            callback="parse_recipe_link",
            follow=False,
            process_request=lambda request, spider: request.replace(priority=100),
        ),
        # RULE 2: Navigation Hubs get LOW PRIORITY (Priority: 10)
        # This will sit back in the queue until the recipe leaves are fully cleared out.
        Rule(
            LinkExtractor(
                allow_domains=["food.com", "www.food.com"],
                deny=shared_deny + (recipe_page_pattern,),
                process_value=lambda url: url.split("?")[0],
            ),
            follow=True,
            process_request=lambda request, spider: request.replace(priority=10),
        ),
    )

    # This connects our custom counter to Scrapy's internal engine
    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        spider = super(FoodLinkSpider, cls).from_crawler(crawler, *args, **kwargs)
        # Tell Scrapy to run 'response_received' every time a page completes downloading
        crawler.signals.connect(
            spider.track_page_count, signal=signals.response_received
        )
        return spider

    # This function triggers on every single page download
    def track_page_count(self, response, request, spider):
        self.pages_visited_count += 1
        # Prints a clear visual marker directly into your terminal
        print(
            f"\n>>> [LIVE TRACKER] Total Pages Visited So Far: {self.pages_visited_count} <<<\n"
        )

    def parse_start_url(self, response, **kwargs):
        return self.parse_recipe_link(response)

    def parse_recipe_link(self, response):
        if re.search(self.recipe_page_pattern, response.url):
            yield {"url": response.url}


# import re
# from scrapy.linkextractors import LinkExtractor

# # 1. Recreate your spider configurations
# recipe_page_pattern = r"/recipe/[\w-]+-\d+$"
# shared_deny = (
#     r"help\.food\.com", r"/recipe/all/", r"/recipe/?$",
#     r"/members/", r"/user/", r"/mail/", r"/search/",
#     r"/search/?$", r"/saves/", r"/saves/?$", r"/activity/",
#     r"/activity/?$", r"/topic/", r"/topic/?$", r"/about/",
#     r"/about/?$", r"/how-to/about-us-31",
# )

# # 2. Instantiate Rule 1 Link Extractor (Recipes Only)
# extractor_rule1 = LinkExtractor(
#     allow_domains=["food.com", "www.food.com"],
#     allow=(recipe_page_pattern),
#     deny=shared_deny,
#     process_value=lambda url: url.split("?")[0],
# )

# # 3. Instantiate Rule 2 Link Extractor (Navigation Hubs Only)
# extractor_rule2 = LinkExtractor(
#     allow_domains=["food.com", "www.food.com"],
#     deny=shared_deny + (recipe_page_pattern,),
#     process_value=lambda url: url.split("?")[0],
# )

# # 4. Extract the links from the current page response
# links_rule1 = extractor_rule1.extract_links(response)
# links_rule2 = extractor_rule2.extract_links(response)
# print([links.url for links in links_rule1])
# print([links.url for links in links_rule2])
