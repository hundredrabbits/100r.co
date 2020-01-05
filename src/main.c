#include <ctype.h>
#include <stdio.h>
#include <string.h>

char *html_head = "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'><meta name='description' content='Hundred Rabbits is a digital studio aboard a sailboat.'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta name='twitter:card' content='summary'><meta name='twitter:site' content='@RekkaBell'><meta name='twitter:title' content='Grimgrains'><meta name='twitter:description' content='An illustrated food blog.'><meta name='twitter:creator' content='@RekkaBell'><meta name='twitter:image' content='https://grimgrains.com/media/services/icon.jpg'><meta property='og:title' content='Grimgrains'><meta property='og:type' content='article'><meta property='og:url' content='http://grimgrains.com/'><meta property='og:image' content='https://grimgrains.com/media/services/icon.jpg'><meta property='og:description' content='An illustrated food blog.'><meta property='og:site_name' content='Grimgrains'><title>GrimGrains — %s</title><link rel='stylesheet' type='text/css' href='../links/main.css'></head><body class='%s'>";

char *html_header = "<header><a id='logo' href='home.html'><img src='../media/interface/logo.png' alt='Grimgrains'></a></header>";

char *html_nav = "<nav>Nothing here</nav>";

char *html_footer = "<footer><p>Never miss an update</p><form action='https://tinyletter.com/hundredrabbits' method='post' target='popupwindow' onsubmit='window.open(\'https://tinyletter.com/hundredrabbits\', \'popupwindow\', \'scrollbars=yes,width=800,height=600\');return true'><input type='email' value='' name='EMAIL' class='email' placeholder='email@address.com' required=''><input type='submit' value='Subscribe' name='subscribe' class='button'></form></footer></body></html>";

typedef struct {
  char *name;
  char *description;
} Part;

typedef struct {
  char *name;
  int parts_len;
  Part *parts[32];
} Page;

typedef struct {
  char *name;
  int pages_len;
  Page *pages[32];
} Category;

Category create_category(char *name) {
  Category a;
  a.name = name;
  a.pages_len = 0;
  return a;
}

Page create_page(char *name) {
  Page a;
  a.name = name;
  a.parts_len = 0;
  return a;
}

Part create_part(char *name, char *description){
  Part part;
  part.name = name;
  part.description = description;
  return part;
}

void add_part(Page *page, char *name, char *description) {
  Part part = create_part(name,description);
  page->parts[page->parts_len] = &part;
  page->parts_len++;
}

void add_page(Category *category, Page *page) {
  category->pages[category->pages_len] = page;
  category->pages_len++;
}

int main(void) {
  #include "categories.c"

  int categories_len = sizeof categories / sizeof categories[0];

  printf("Found categories: %d\n", categories_len);

  for (int i = 0; i < categories_len; ++i) {
    // build_ingredient(ingredients[i]);
  }

  return (0);
}
