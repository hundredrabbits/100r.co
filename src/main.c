#define _GNU_SOURCE

#include <stdio.h>
#include <stdlib.h>
#include <sys/dir.h>
#include <sys/stat.h>
#include <time.h>

/* 
Copyright (c) 2021 Devine Lu Linvega

Permission to use, copy, modify, and distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE.
*/

#define NAME "SUDOGAMI"
#define DOMAIN "https://sudogami.com"
#define LICENSE "https://github.com/hundredrabbits/100r.co/blob/master/LICENSE.by-nc-sa-4.0.md"
#define SOURCE "https://github.com/hundredrabbits/100r.co/edit/master"

struct dirent *dir;

typedef struct Lexicon {
	int len, refs[512];
	char files[512][64];
} Lexicon;

/* clang-format off */

char  clca(char c) { return c >= 'A' && c <= 'Z' ? c + ('a' - 'A') : c; } /* char to lowercase */
char  cuca(char c) { return c >= 'a' && c <= 'z' ? c - ('a' - 'A') : c; } /* char to uppercase */
int   slen(char *s) { int i = 0; while(s[i] && s[++i]) { ; } return i; } /* string length */
char *st__(char *s, char (*fn)(char)) { int i = 0; char c; while((c = s[i])) s[i++] = fn(c); return s; }
char *stuc(char *s) { return st__(s, cuca); } /* string to uppercase */
char *stlc(char *s) { return st__(s, clca); } /* string to lowercase */
char *scpy(char *src, char *dst, int len) { int i = 0; while((dst[i] = src[i]) && i < len - 2) i++; dst[i + 1] = '\0'; return dst; } /* string copy */
int   scmp(char *a, char *b) { int i = 0; while(a[i] == b[i]) if(!a[i++]) return 1; return 0; } /* string compare */
char *scsw(char *s, char a, char b) { int i = 0; char c; while((c = s[i])) s[i++] = c == a ? b : c; return s; } /* string char swap */
char *scat(char *dst, const char *src) { char *ptr = dst + slen(dst); while(*src) *ptr++ = *src++; *ptr = '\0'; return dst; } /* string cat */
int   ssin(char *s, char *ss) { int a = 0, b = 0; while(s[a]) { if(s[a] == ss[b]) { if(!ss[b + 1]) return a - b; b++; } else b = 0; a++; } return -1; } /* string substring index */
char *ccat(char *dst, char c) { int len = slen(dst); dst[len] = c; dst[len + 1] = '\0'; return dst; }

/* clang-format on */

int fpinject(FILE *f, Lexicon *l, char *filepath);

int
error(char *msg, char *val)
{
	printf("Error: %s(%s)\n", msg, val);
	return 0;
}

int
findf(Lexicon *l, char *f)
{
	int i;
	char filename[64];
	scat(scsw(stlc(scpy(f, filename, 64)), ' ', '_'), ".htm");
	for(i = 0; i < l->len; ++i)
		if(scmp(l->files[i], filename))
			return i;
	return -1;
}

void
fpedited(FILE *f, char *path)
{
	struct stat attr;
	stat(path, &attr);
	fputs("<span style='float:right'>", f);
	fprintf(f, "Edited on %s ", ctime(&attr.st_mtime));
	fprintf(f, "<a href='" SOURCE "/src/%s'>[edit]</a><br/>", path);
	fputs("</span>", f);
}

int
fpportal(FILE *f, Lexicon *l, char *s, int head)
{
	int target;
	char srcpath[64], filename[64];
	target = findf(l, s);
	if(target < 0)
		return error("Missing portal", s);
	srcpath[0] = 0;
	filename[0] = 0;
	scat(scat(scat(srcpath, "inc/"), scpy(s, filename, 64)), ".htm");
	if(head)
		fprintf(f, "<h2 id='%s'><a href='%s.html'>%s</a></h2>", scsw(filename, ' ', '_'), filename, s);
	fpinject(f, l, srcpath);
	l->refs[target]++;
	return 1;
}

int
fptemplate(FILE *f, Lexicon *l, char *s)
{
	int target;
	if(s[0] == '/')
		return fpportal(f, l, s + 1, 1);
	target = findf(l, s);
	if(target < 0)
		return error("Missing link", s);
	fprintf(f, "<a href='%s.html' class='local'>", scsw(stlc(s), ' ', '_'));
	fprintf(f, "%s</a>", scsw(stlc(s), '_', ' '));
	l->refs[target]++;
	return 1;
}

int
fpinject(FILE *f, Lexicon *l, char *filepath)
{
	FILE *inc;
	char c, s[1024];
	unsigned char t = 0;
	scsw(filepath, ' ', '_');
	if(!(inc = fopen(filepath, "r")))
		return error("Missing include", filepath);
	s[0] = 0;
	while((c = fgetc(inc)) != EOF) {
		if(c == '}') {
			t = 0;
			if(!fptemplate(f, l, s))
				return 0;
			continue;
		}
		if(c == '{') {
			s[0] = 0;
			t = 1;
			continue;
		}
		if(slen(s) > 1023)
			return error("Templating error", filepath);
		if(t)
			ccat(s, c);
		else
			fprintf(f, "%c", c);
	}
	fclose(inc);
	return 1;
}

int
fpindex(FILE *f)
{
	struct dirent **d;
	int n, i = 0;
	n = scandir("inc", &d, NULL, alphasort);
	if(n < 0)
		return error("scandir", "failed");
	fputs("<ul class='col2 capital'>", f);
	while(i < n) {
		char filepath[64], filename[64];
		if(d[i]->d_name[0] != '.')
			fprintf(f, "<li><a href='%sl'>%s</a></li>", scpy(d[i]->d_name, filepath, 64), scsw(scpy(d[i]->d_name, filename, ssin(d[i]->d_name, ".htm") + 1), '_', ' '));
		free(d[i++]);
	}
	fputs("</ul>", f);
	free(d);
	return 1;
}

FILE *
build(FILE *f, Lexicon *l, char *name, char *srcpath)
{
	if(!f)
		return f;
	/* begin */
	fputs("<!DOCTYPE html><html lang='en'>", f);
	fputs("<head>", f);
	fprintf(f,
		"<meta charset='utf-8'>"
		"<meta name='description' content='%s'/>"
		"<meta name='thumbnail' content='" DOMAIN "media/services/thumbnail.jpg' />"
		"<meta name='viewport' content='width=device-width,initial-scale=1'>"
		"<link rel='alternate' type='application/rss+xml' title='RSS Feed' "
		"href='../links/rss.xml' />"
		"<link rel='stylesheet' type='text/css' href='../links/main.css'>"
		"<link rel='shortcut icon' type='image/png' "
		"href='../media/favico.png'>"
		"<title>" NAME " &mdash; %s</title>",
		"TODO",
		name);
	fputs("</head>", f);
	fputs("<body>", f);
	/* header */
	fputs("<header>", f);
	fputs("<a href='home.html'><img src='../media/favico.svg' alt='" NAME "' height='120'></a>", f);
	fputs("</header>", f);
	/* nav */
	fputs("<nav>", f);
	if(!fpportal(f, l, "meta.nav", 0))
		printf(">>> Building failed: %s\n", name);
	fputs("</nav>", f);
	/* main */
	fputs("<main>\n\n", f);
	fputs("<!-- Generated file, do not edit -->\n\n", f);
	fprintf(f, "<h1>%s</h1>", name);
	if(!fpinject(f, l, srcpath))
		printf(">>> Building failed: %s\n", name);
	fputs("\n\n</main>", f);
	/* footer */
	fputs("<footer><hr />", f);
	fpedited(f, srcpath);
	fputs("<b>SUDOGAMI</b> © 2021 — Powered by Hundred Rabbits | LICENSE:  ", f);
	fputs("<a href='" LICENSE "' target='_blank'>BY-NC-SA 4.0</a>", f);
	fputs("</footer>", f);
	/* end */
	fputs("</body></html>", f);
	return f;
}

int
generate(Lexicon *l)
{
	int i = 0;
	char srcpath[64], dstpath[64], filename[64];
	for(i = 0; i < l->len; ++i) {
		srcpath[0] = 0;
		dstpath[0] = 0;
		filename[0] = 0;
		/* src */
		scpy(l->files[i], filename, ssin(l->files[i], ".htm") + 1);
		scat(srcpath, "inc/");
		scat(srcpath, filename);
		scat(srcpath, ".htm");
		/* dst */
		scat(dstpath, "../site/");
		scat(dstpath, filename);
		scat(dstpath, ".html");
		fclose(build(fopen(dstpath, "w"), l, scsw(filename, '_', ' '), srcpath));
	}
	printf("Generated %d files\n", i);
	return 1;
}

int
index(Lexicon *l, DIR *d)
{
	FILE *f;
	while((dir = readdir(d)))
		if(ssin(dir->d_name, ".htm") > 0) {
			l->refs[l->len] = 0;
			scpy(dir->d_name, l->files[l->len++], 64);
		}
	closedir(d);
	printf("Indexed %d terms\n", l->len);
	l->refs[l->len] = 0;
	scpy("index.htm", l->files[l->len++], 64);
	f = fopen("inc/index.htm", "w");
	fpindex(f);
	fclose(f);
	return 1;
}

void
inspect(Lexicon *l)
{
	int i;
	for(i = 0; i < l->len; ++i)
		if(!l->refs[i])
			error("Orphaned", l->files[i]);
}

int
main(void)
{
	Lexicon lex;
	DIR *d;
	lex.len = 0;
	if(!(d = opendir("inc")))
		return error("Open", "Missing inc/ folder. ");
	if(!index(&lex, d))
		return error("Indexing", "Failed");
	if(!generate(&lex))
		return error("Generating", "Failed");
	inspect(&lex);
	return 0;
}