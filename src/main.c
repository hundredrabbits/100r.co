#include <ctype.h>
#include <stdio.h>
#include <string.h>

#include "helpers.h"

#define PARTS_BUFFER 36
#define PAGES_BUFFER 36
#define STR_BUF_LEN 64

char* html_head = "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'><meta name='description' content='Hundred Rabbits is a digital studio aboard a sailboat.'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta name='twitter:card' content='summary'><meta name='twitter:site' content='@hundredrabbits'><meta name='twitter:title' content='Hundred Rabbits'><meta name='twitter:description' content='Hundredrabbits create open source low-power hardware, tools and toys aboard a sailboat.'><meta name='twitter:creator' content='@hundredrabbits'><meta name='twitter:image' content='https://100r.co/media/services/icon.jpg'><meta property='og:title' content='Hundred Rabbits'><meta property='og:type' content='article'><meta property='og:url' content='https://100r.co/'><meta property='og:image' content='https://100r.co/media/services/icon.jpg'><meta property='og:description' content='Hundredrabbits create open source low-power hardware, tools and toys aboard a sailboat named Pino'><meta property='og:site_name' content='Hundred Rabbits'><link rel='alternate' type='application/rss+xml' title='Hundred Rabbits Journal' href='http://100r.co/links/rss.xml' /><link rel='icon' type='image/x-icon' href='../media/services/favicon.ico'><link rel='icon' type='image/png' href='../media/services/icon.jpg'><link rel='apple-touch-icon' href='../media/services/apple-touch-icon.png' /><title>Hundred Rabbits — %s</title><link rel='stylesheet' type='text/css' href='../links/main.css'></head><body class='%s'>";

char* html_header = "<header><a id='logo' href='home.html'><img src='../media/interface/logo.svg' alt='Hundred Rabbits'></a></header>";

char* html_footer = "<footer><p>Never miss an update</p><form action='https://tinyletter.com/hundredrabbits' method='post' target='popupwindow' onsubmit='window.open(\'https://tinyletter.com/hundredrabbits\', \'popupwindow\', \'scrollbars=yes,width=800,height=600\');return true'><input type='email' value='' name='EMAIL' class='email' placeholder='email@address.com' required=''><input type='submit' value='Subscribe' name='subscribe' class='button'></form></footer></body></html>";

typedef struct {
	char* name;
	char* date;
	char* location;
	int parts_len;
	char* parts_names[PARTS_BUFFER];
	char* parts_descriptions[PARTS_BUFFER];
} Page;

typedef struct {
	char* name;
	int pages_len;
	Page* pages[PAGES_BUFFER];
} Category;

Category
create_category(char* name)
{
	Category a;
	a.name = name;
	a.pages_len = 0;
	return a;
}

Page
create_page(char* name)
{
	Page a;
	a.name = name;
	a.date = NULL;
	a.location = NULL;
	a.parts_len = 0;
	return a;
}

void
add_part(Page* page, char* name, char* description)
{
	if(page->parts_len >= PARTS_BUFFER) {
		printf("ERROR: Reached limit: PARTS_BUFFER\n");
		return;
	}
	if(!is_alphanum(name)) {
		printf("ERROR: \"%s\" is not alphanumeric.\n", name);
		return;
	}
	page->parts_names[page->parts_len] = name;
	page->parts_descriptions[page->parts_len] = description;
	page->parts_len++;
}

void
add_page(Category* category, Page* page)
{
	if(category->pages_len >= PAGES_BUFFER) {
		printf("ERROR: Reached limit: PAGES_BUFFER\n");
		return;
	}
	category->pages[category->pages_len] = page;
	category->pages_len++;
}

void
set_date(Page* page, char* date)
{
	page->date = date;
}

void
set_location(Page* page, char* location)
{
	page->location = location;
}

void
fputs_include(FILE* f, char* str)
{
	char filepath[STR_BUF_LEN];
	char filename[STR_BUF_LEN];
	to_filename(str, filename);

	int result = snprintf(filepath, sizeof filepath, "inc/%s.htm", filename);

	if(!file_exists(filepath)) {
		return;
	}

	printf("Including %s\n", filepath);

	if(result < 0 || (size_t)result > sizeof filepath) {
		printf("Invalid filepath: %s\n", filepath);
		return;
	}

	char buffer[4096];
	FILE* fp = fopen(filepath, "r");
	if(fp == NULL) {
		return;
	}

	for(;;) {
		size_t sz = fread(buffer, 1, sizeof(buffer), fp);
		if(sz) {
			fwrite(buffer, 1, sz, f);
		} else if(feof(fp) || ferror(fp)) {
			break;
		}
	}

	fclose(fp);
}

void
build_page(Page* page)
{
	char filename[STR_BUF_LEN];
	scpy(page->name, filename);
	slca(filename);
	char filepath[STR_BUF_LEN + 64];
	snprintf(filepath, STR_BUF_LEN + 64, "../site/%s.html", filename);
	FILE* f = fopen(filepath, "w");

	fprintf(f, html_head, page->name, "page");
	fputs(html_header, f);

	fputs("<main class='page'>", f);
	fprintf(f, "<h1>%s</h1>", page->name);

	if(page->parts_len > 4) {
		fputs("<ul class='jump'>", f);
		for(int i = 0; i < page->parts_len; ++i) {
			char* part_name = page->parts_names[i];
			char part_index[STR_BUF_LEN];
			scpy(part_name, part_index);
			slca(part_index);
			fprintf(f, "<li><a href='#%s'>%s</a></li>", part_index, part_name);
		}
		fputs("</ul>", f);
	}

	for(int i = 0; i < page->parts_len; ++i) {
		char* part_name = page->parts_names[i];
		char* part_description = page->parts_descriptions[i];
		char part_index[STR_BUF_LEN];
		scpy(part_name, part_index);
		slca(part_index);
		fprintf(f, "<h2 id='%s'>%s</h2>", part_index, part_name);
		fputs(part_description, f);
	}

	fputs_include(f, page->name);

	fputs("<hr/>", f);
	fputs("</main>", f);

	fputs(html_footer, f);

	fclose(f);
}

void
build_home(Category** categories, int categories_len)
{
	FILE* f = fopen("../site/home.html", "w");

	fprintf(f, html_head, "home", "home");
	fputs(html_header, f);

	fputs("<main class='home'>", f);

	for(int i = 0; i < categories_len; ++i) {
		Category* category = categories[i];
		fprintf(f, "<h2>%s</h2>", category->name);
		fputs("<ul>", f);
		for(int j = 0; j < category->pages_len; ++j) {
			Page* page = category->pages[j];
			char page_index[STR_BUF_LEN];
			scpy(page->name, page_index);
			slca(page_index);
			fprintf(f, "<li><a href='%s.html'>%s</a></li>", page_index, page->name);
		}
		fputs("</ul>", f);
	}

	fputs("<hr/>", f);
	fputs("</main>", f);

	fputs(html_footer, f);

	fclose(f);
}

void
build_rss(Category* blog)
{
	FILE* f = fopen("../links/rss.xml", "w");

	fputs("<?xml version='1.0' encoding='UTF-8' ?><rss version='2.0' xmlns:dc='http://purl.org/dc/elements/1.1/'>", f);
	fputs("<channel>\n", f);
	fputs("<title>Hundred Rabbits</title>\n", f);
	fputs("<link><![CDATA[https://100r.co/]]></link>\n", f);
	fputs("<description>Rekka and Devine Travel Diary</description>\n", f);

	for(int i = 0; i < blog->pages_len; ++i) {
		Page* page = blog->pages[i];
		if(!page->date) {
			printf("Missing date for %s\n", page->name);
			continue;
		}
		char filename[STR_BUF_LEN];
		scpy(page->name, filename);
		slca(filename);
		char filepath[STR_BUF_LEN + 64];
		snprintf(filepath, STR_BUF_LEN + 64, "https://100r.co/site/%s.html", filename);
		fputs("<item>\n", f);
		fprintf(f, "  <title>%s</title>\n", page->name);
		fprintf(f, "  <link>%s</link>\n", filepath);
		fprintf(f, "  <guid isPermaLink='false'>%s</guid>\n", filename);
		fprintf(f, "  <pubDate>%s 00:00:00 GMT</pubDate>\n", page->date);
		fputs("  <dc:creator><![CDATA[Rekka Bellum]]></dc:creator>\n", f);
		fputs("  <description>\n", f);
		fprintf(f, "<![CDATA[%s<p><a href='%s'>Continue Reading</a></p>]]>\n", page->parts_descriptions[0], filepath);
		fputs("  </description>\n", f);
		fputs("</item>\n", f);
	}
	fputs("</channel>", f);
	fputs("</rss>", f);
	fclose(f);
}

int
main(void)
{
#include "categories.c"

	int categories_len = sizeof categories / sizeof categories[0];

	printf("Found categories: %d\n", categories_len);

	build_home(categories, categories_len);

	for(int i = 0; i < categories_len; ++i) {
		Category* category = categories[i];
		for(int j = 0; j < category->pages_len; ++j) {
			Page* page = category->pages[j];
			build_page(page);
		}
	}

	build_rss(&blog);

	return (0);
}
