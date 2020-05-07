
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

int is_alphanum(char *str) {
  int len = strlen(str);
  for (int i = 0; i < len; i++) {
    char ch = str[i];
    int is_num = ch >= '0' && ch <= '9';
    int is_alpha = (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
    int is_space = ch == ' ';
    if (!is_alpha && !is_num && !is_space) {
      return 0;
    }
  }
  return 1;
}

bool file_exists(char *filename) {
  FILE *file = fopen(filename, "r");
  if (file != NULL) {
    fclose(file);
    return true;
  }
  return false;
}