
export const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0'
];

export const generatePythonScript = (config: any) => {
  const fieldsToExtract = [];
  if (config.fields.name) fieldsToExtract.push("'name': self._get_text('h1.text-heading-xlarge')");
  if (config.fields.headline) fieldsToExtract.push("'headline': self._get_text('.text-body-medium')");
  if (config.fields.location) fieldsToExtract.push("'location': self._get_text('.text-body-small.inline.t-black--light')");
  if (config.fields.about) fieldsToExtract.push("'about': self._get_text('.pv-about-section .inline-show-more-text')");

  return `import json
import time
import random
import logging
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class LinkedInScraper:
    def __init__(self, headless=${config.headless ? 'True' : 'False'}):
        self.user_agents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        ]
        self.options = Options()
        if headless:
            self.options.add_argument("--headless")
        
        # Ethical Scraping: Randomized User-Agent
        if ${config.useRotation ? 'True' : 'False'}:
            self.options.add_argument(f"user-agent={random.choice(self.user_agents)}")
        
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=self.options)

    def _wait_and_delay(self):
        """Implement ethical delays between actions."""
        delay = random.uniform(${config.minDelay}, ${config.maxDelay})
        logging.info(f"Waiting for {delay:.2f} seconds...")
        time.sleep(delay)

    def _get_text(self, selector):
        try:
            element = self.driver.find_element(By.CSS_SELECTOR, selector)
            return element.text.strip()
        except Exception:
            return "Not Found"

    def scrape_profile(self, url):
        try:
            logging.info(f"Navigating to: {url}")
            self.driver.get(url)
            self._wait_and_delay()

            # Note: LinkedIn often requires login for full profile data.
            # This script targets publicly visible elements.
            
            data = {
                ${fieldsToExtract.join(',\n                ')}
            }

            return data
        except Exception as e:
            logging.error(f"Error scraping profile: {e}")
            return None
        finally:
            self.driver.quit()

if __name__ == "__main__":
    # Example LinkedIn URL
    profile_url = "https://www.linkedin.com/in/williamhgates" 
    
    scraper = LinkedInScraper()
    profile_data = scraper.scrape_profile(profile_url)

    if profile_data:
        filename = "linkedin_profile.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(profile_data, f, indent=4, ensure_ascii=False)
        logging.info(f"Data saved to {filename}")
    else:
        logging.error("Failed to extract profile data.")
`;
};

export const generateReadme = () => {
  return `# LinkedIn Ethical Scraper

## Disclaimer
**This project is for EDUCATIONAL PURPOSES ONLY.** 
Scraping LinkedIn may violate their Terms of Service. Use this responsibly and at your own risk. This script is designed with "ethical" parameters like randomized delays and user-agent rotation to demonstrate web scraping best practices without overwhelming servers.

## Requirements
- Python 3.x
- Selenium
- Webdriver Manager

## Installation
\`\`\`bash
pip install selenium webdriver-manager
\`\`\`

## Usage
1. Update the \`profile_url\` in \`script.py\`.
2. Run the script:
   \`\`\`bash
   python script.py
   \`\`\`

## Features
- Ethical delays (randomized).
- User-Agent rotation.
- JSON data export.
- Selectable extraction fields.
`;
};
