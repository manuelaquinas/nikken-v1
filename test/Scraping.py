from bs4 import BeautifulSoup

import os

cd = os.path.dirname(os.path.abspath(__file__))

class Scraping:
    def get_stage_levels(self, html_code):
        soup = BeautifulSoup(html_code, 'html.parser')
        # with open(cd + '/nikken.html', 'w', encoding='utf-8') as html_file:
        #     html_file.write(soup.prettify())
        return len(soup.select('div.col-12.section-stage')[0].find_all('div', recursive=False)[1].find_all('div', recursive=False))
