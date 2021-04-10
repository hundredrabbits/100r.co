#include <dirent.h>
#include <stdio.h>

#define NAME "100R"
#define DOMAIN "https://100r.co/"

struct dirent *dir;

typedef struct Lexicon {
  int len;
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

int inject(FILE *f, Lexicon *l, char *filepath);

int error(char *msg, char *val) {
  printf("Error: %s(%s)\n", msg, val);
  return 0;
}

int findf(Lexicon *l, char *f) {
  int i;
  char filename[64];
  scat(scsw(stlc(scpy(f, filename, 64)), ' ', '_'), ".htm");
  for (i = 0; i < l->len; ++i)
    if (scmp(l->files[i], filename))
      return i;
  return -1;
}

int portal(FILE *f, Lexicon *l, char *s) {
  char srcpath[64], filename[64];
  if (findf(l, s) < 0)
    return error("Missing portal", s);
  srcpath[0] = 0;
  filename[0] = 0;
  scat(scat(scat(srcpath, "inc/"), scpy(s, filename, 64)), ".htm");
  fprintf(f, "<h2 id='%s'>%s</h2>", filename, s);
  inject(f, l, srcpath);
  return 1;
}

int template(FILE *f, Lexicon *l, char *s) {
  if (s[0] == '/')
    return portal(f, l, s + 1);
  if (findf(l, s) < 0)
    return error("Missing link", s);
  fprintf(f, "<a href='%s.html'>%s</a>", scsw(stlc(s), ' ', '_'), s);
  return 1;
}

int inject(FILE *f, Lexicon *l, char *filepath) {
  FILE *inc;
  char c, s[1024];
  unsigned char t = 0;
  scsw(filepath, ' ', '_');
  if (!(inc = fopen(filepath, "r")))
    return error("Missing include", filepath);
  s[0] = 0;
  while ((c = fgetc(inc)) != EOF) {
    if (c == '}') {
      t = 0;
      if (!template(f, l, s))
        return 0;
      continue;
    }
    if (c == '{') {
      s[0] = 0;
      t = 1;
      continue;
    }
    if (slen(s) > 1023)
      return error("Templating error", filepath);
    if (t) {
      ccat(s, c);
    } else
      fprintf(f, "%c", c);
  }
  fclose(inc);
  return 1;
}

FILE *build(FILE *f, Lexicon *l, char *name, char *srcpath) {
  if (!f)
    return f;
  fputs("<!DOCTYPE html><html lang='en'>", f);
  fputs("<head>", f);
  fprintf(f,
          "<meta charset='utf-8'>"
          "<meta name='description' content='%s'/>"
          "<meta name='thumbnail' content='" DOMAIN
          "media/services/thumbnail.jpg' />"
          "<meta name='viewport' content='width=device-width,initial-scale=1'>"
          "<link rel='alternate' type='application/rss+xml' title='RSS Feed' "
          "href='../links/rss.xml' />"
          "<link rel='stylesheet' type='text/css' href='../links/main.css'>"
          "<link rel='shortcut icon' type='image/png' "
          "href='../media/services/icon.png'>"
          "<title>" NAME " &mdash; %s</title>",
          "TODO", name);
  fputs("</head>", f);
  fputs("<body>", f);
  fputs("<header><a href='home.html'><img src='../media/interface/logo.svg' "
        "alt='" NAME "' height='100'></a></header>",
        f);
  fputs("<main>\n\n", f);
  fputs("<!-- Generated file, do not edit -->\n\n", f);
  fprintf(f, "<h1>%s</h1>", name);
  if (!inject(f, l, srcpath))
    printf(">>> Building failed: %s\n", name);
  fputs("\n\n</main>", f);
  fputs("<footer><hr />", f);
  fputs("Hundredrabbits © 2021 — <a "
        "href='https://github.com/hundredrabbits/100r.co/blob/master/"
        "LICENSE.by-nc-sa-4.0.md' target='_blank'>BY-NC-SA 4.0</a>",
        f);
  fputs("</footer>", f);
  fputs("</body></html>", f);

  return f;
}

int generate(Lexicon *l) {
  int i = 0;
  char srcpath[64], dstpath[64], filename[64];
  for (i = 0; i < l->len; ++i) {
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

int index(Lexicon *l, DIR *d) {
  while ((dir = readdir(d)))
    if (ssin(dir->d_name, ".htm") > 0)
      scpy(dir->d_name, l->files[l->len++], 64);
  closedir(d);
  printf("Indexed %d terms\n", l->len);
  return 1;
}

int main(void) {
  Lexicon lex;
  DIR *d;
  lex.len = 0;
  if (!(d = opendir("inc")))
    return error("Open", "Missing inc/ folder. ");
  index(&lex, d);
  generate(&lex);
  return 0;
}