from jinja2 import Environment, FileSystemLoader, select_autoescape
from datetime import datetime
import math
import os

def loadTemplate():
    templates_dir = os.path.join(os.getcwd(), 'template')
    env = Environment(loader = FileSystemLoader(templates_dir), 
                      autoescape=select_autoescape(['html', 'xml']))
    template = env.get_template('contentformat.html')
    return template

def makeContent(template):
    article_name = input("Article name, no file extensions.: ")
    filename = os.path.join(os.getcwd(), 'src/inc/%s.htm' % article_name)
    with open(filename, 'w+') as fw:
        fw.write(template.render())

def main():
    makeContent(loadTemplate())
    
if __name__ == '__main__':
    main()