FLAGS=-std=c89 -DNDEBUG -O2 -g0 -s
DEBUG=-std=c89 -DDEBUG -Wall -Wpedantic -Wshadow -Wuninitialized -Wextra -Werror=implicit-int -Werror=incompatible-pointer-types -Werror=int-conversion -Wvla -g -Og -fsanitize=address -fsanitize=undefined
SRC=src/main.c
DST=bin/main

all: ${DST}

format:
	@ clang-format -i ${SRC}
run: ${DST}
	@ mkdir -p site && ./bin/main
clean:
	@ rm -f site/* ${DST}

${DST}: ${SRC}
	@ mkdir -p bin && cc ${SRC} ${FLAGS} -o ${DST}

.PHONY: all clean format run
