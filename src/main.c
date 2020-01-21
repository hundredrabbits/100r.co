#include <ctype.h>
#include <stdio.h>
#include <string.h>

#define STR_BUF_LEN 64

char *html_head = "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'><meta name='description' content='Hundred Rabbits is a digital studio aboard a sailboat.'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta name='twitter:card' content='summary'><meta name='twitter:site' content='@hundredrabbits'><meta name='twitter:title' content='Hundred Rabbits'><meta name='twitter:description' content='Hundredrabbits create open source low-power hardware, tools and toys aboard a sailboat.'><meta name='twitter:creator' content='@hundredrabbits'><meta name='twitter:image' content='https://100r.co/media/services/icon.jpg'><meta property='og:title' content='Hundred Rabbits'><meta property='og:type' content='article'><meta property='og:url' content='https://100r.co/'><meta property='og:image' content='https://100r.co/media/services/icon.jpg'><meta property='og:description' content='Hundredrabbits create open source low-power hardware, tools and toys aboard a sailboat named Pino'><meta property='og:site_name' content='Hundred Rabbits'><link rel='alternate' type='application/rss+xml' title='Hundred Rabbits Journal' href='http://100r.co/links/rss.xml' /><title>Hundred Rabbits — %s</title><link rel='stylesheet' type='text/css' href='../links/main.css'></head><body class='%s'>";

char *html_header = "<header><a id='logo' href='home.html'><img src='../media/interface/logo.svg' alt='Hundred Rabbits'></a></header>";

char *html_footer = "<footer><p>Never miss an update</p><form action='https://tinyletter.com/hundredrabbits' method='post' target='popupwindow' onsubmit='window.open(\'https://tinyletter.com/hundredrabbits\', \'popupwindow\', \'scrollbars=yes,width=800,height=600\');return true'><input type='email' value='' name='EMAIL' class='email' placeholder='email@address.com' required=''><input type='submit' value='Subscribe' name='subscribe' class='button'></form></footer></body></html>";

void to_lowercase(char *str, char *target, size_t tsize) {
  for (size_t i = 0; i < tsize; i++) {
    target[i] = str[i];
    if (target[i] == '\0') {
      break;
    }
    if (target[i] == ' ') {
      target[i] = '_';
    } else {
      target[i] = tolower(target[i]);
    }
  }
  target[tsize - 1] = '\0';
}

typedef struct {
  char *name;
  char *date;
  char *location;
  int parts_len;
  char *parts_names[32];
  char *parts_descriptions[32];
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
  a.date = NULL;
  a.location = NULL;
  a.parts_len = 0;
  return a;
}

void add_part(Page *page, char *name, char *description) {
  page->parts_names[page->parts_len] = name;
  page->parts_descriptions[page->parts_len] = description;
  page->parts_len++;
}

void add_page(Category *category, Page *page) {
  category->pages[category->pages_len] = page;
  category->pages_len++;
}

void set_date(Page *page, char *date){
  page->date = date;
}

void set_location(Page *page, char *location){
  page->location = location;
}

void build_page(Page *page) {
  char filename[STR_BUF_LEN];
  to_lowercase(page->name, filename, STR_BUF_LEN);
  char filepath[STR_BUF_LEN];
  snprintf(filepath, STR_BUF_LEN, "../site/%s.html", filename);
  FILE *f = fopen(filepath, "w");

  fprintf(f, html_head, page->name, "page");
  fputs(html_header, f);

  fputs("<main class='page'>", f);
  fprintf(f, "<h1>%s</h1>", page->name);

  if (page->parts_len > 4) {
    fputs("<ul class='jump'>", f);
    for (int i = 0; i < page->parts_len; ++i) {
      char *part_name = page->parts_names[i];
      char part_index[STR_BUF_LEN];
      to_lowercase(part_name, part_index, STR_BUF_LEN);
      fprintf(f, "<li><a href='#%s'>%s</a></li>", part_index, part_name);
    }
    fputs("</ul>", f);
  }

  for (int i = 0; i < page->parts_len; ++i) {
    char *part_name = page->parts_names[i];
    char *part_description = page->parts_descriptions[i];
    char part_index[STR_BUF_LEN];
    to_lowercase(part_name, part_index, STR_BUF_LEN);
    fprintf(f, "<h2 id='%s'>%s</h2>", part_index, part_name);
    fputs(part_description, f);
  }

  fputs("<hr/>", f);
  fputs("</main>", f);

  fputs(html_footer, f);

  fclose(f);
}

void build_home(Category **categories, int categories_len) {
  FILE *f = fopen("../site/home.html", "w");

  fprintf(f, html_head, "home", "home");
  fputs(html_header, f);

  fputs("<main class='home'>", f);

  for (int i = 0; i < categories_len; ++i) {
    Category *category = categories[i];
    fprintf(f, "<h2>%s</h2>", category->name);
    fputs("<ul>", f);
    for (int j = 0; j < category->pages_len; ++j) {
      Page *page = category->pages[j];
      char page_index[STR_BUF_LEN];
      to_lowercase(page->name, page_index, STR_BUF_LEN);
      fprintf(f, "<li><a href='%s.html'>%s</a></li>", page_index,page->name);
    }
    fputs("</ul>", f);
  }

  fputs("<hr/>", f);
  fputs("</main>", f);

  fputs(html_footer, f);

  fclose(f);
}

void build_rss(Category *blog){
  FILE *f = fopen("../links/rss.xml", "w");

  fputs("<?xml version='1.0' encoding='UTF-8' ?><rss version='2.0' xmlns:dc='http://purl.org/dc/elements/1.1/'>", f);
  fputs("<channel>", f);
  fputs("<title>Hundred Rabbits — Journal</title>", f);
  fputs("<link><![CDATA[https://100r.co/blog]]></link>", f);
  fputs("<description>The Rabbits' Journal</description>\n", f);

  for (int i = 0; i < blog->pages_len; ++i) {
    Page *page = blog->pages[i];
    if(!page->date){ printf("Missing date for %s\n", page->name); continue; }
    char filename[STR_BUF_LEN];
    to_lowercase(page->name, filename, STR_BUF_LEN);
    char filepath[STR_BUF_LEN];
    snprintf(filepath, STR_BUF_LEN, "https://100r.co/site/%s.html", filename);
    fputs("<item>\n", f);
    fprintf(f, "  <title>%s</title>\n", page->name);
    fprintf(f, "  <link>%s</link>\n", filepath);
    fprintf(f, "  <guid isPermaLink='false'>%s</guid>\n", filename);
    fprintf(f, "  <pubDate>%s 00:00:00 GMT</pubDate>\n", page->date);
    fputs("  <dc:creator><![CDATA[Rekka Bellum]]></dc:creator>\n", f);
    fputs("  </description>\n", f);
    fprintf(f, "<![CDATA[%s]]>\n", page->parts_descriptions[0]);    
    fputs("  </description>\n", f);
    fputs("</item>\n", f);
  }
  fputs("</channel>", f);
  fputs("</rss>", f);
  fclose(f);
}

int main(void) {
  #include "categories.c"

  int categories_len = sizeof categories / sizeof categories[0];

  printf("Found categories: %d\n", categories_len);

  build_home(categories, categories_len);

  for (int i = 0; i < categories_len; ++i) {
    Category *category = categories[i];
    for (int j = 0; j < category->pages_len; ++j) {
      Page *page = category->pages[j];
      build_page(page);
    }
  }

  build_rss(&blog);

  return (0);
}
