from html.parser import HTMLParser
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.assets = set(), [], []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'a':
            self.links.append(attrs.get('href', ''))
        if tag in ('script', 'link'):
            self.assets.append(attrs.get('src') or attrs.get('href', ''))

class SiteTests(unittest.TestCase):
    def test_links_and_assets_resolve(self):
        page = Page()
        page.feed((ROOT / 'index.html').read_text())
        for href in page.links:
            self.assertNotIn(href, ('', '#'), 'Placeholder navigation should be a button or plain text')
            if href.startswith('#'):
                self.assertIn(href[1:], page.ids)
        for asset in page.assets:
            if asset and not asset.startswith(('https://', 'http://')):
                self.assertTrue((ROOT / asset).is_file(), asset)

    def test_local_instructions_reference_a_real_entry_page(self):
        readme = (ROOT / 'README.md').read_text()
        self.assertNotIn('index-v2.html', readme)
        self.assertIn('index.html', readme)

if __name__ == '__main__':
    unittest.main()
