int
clca(int c)
{
	return c >= 'A' && c <= 'Z' ? c + ('a' - 'A') : c;
}

int
slen(char* s)
{
	int n = 0;
	while(s[n] != '\0' && s[++n])
		;
	return n;
}

void
slca(char* s)
{
	int i;
	for(i = 0; i < slen(s); i++)
		s[i] = clca(s[i]);
}

void
scpy(char* src, char* dest)
{
	int i = 0;
	while((dest[i] = src[i]) != '\0')
		i++;
}

void
scsw(char* s, char a, char b)
{
	int i;
	for(i = 0; i < slen(s); i++)
		s[i] = s[i] == a ? b : s[i];
}

int
is_char_alphanum(char ch)
{
	int is_num = ch >= '0' && ch <= '9';
	int is_alpha = (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
	if(!is_alpha && !is_num) {
		return 0;
	}
	return 1;
}

int
is_alphanum(char* str)
{
	int len = strlen(str);
	for(int i = 0; i < len; i++) {
		char ch = str[i];
		int is_num = ch >= '0' && ch <= '9';
		int is_alpha = (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
		int is_space = ch == ' ';
		if(!is_alpha && !is_num && !is_space) {
			return 0;
		}
	}
	return 1;
}

void
to_filename(char* str, char* mod)
{
	scpy(str, mod);
	slca(mod);
	scsw(mod, ' ', '_');
}

int
file_exists(char* filename)
{
	FILE* file = fopen(filename, "r");
	if(file != NULL) {
		fclose(file);
		return 1;
	}
	return 0;
}