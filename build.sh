#!/bin/bash

# Lint
if command -v clang-format &> /dev/null
then
	clang-format -i src/main.c
fi

# Cleanup

mkdir -p bin
mkdir -p site
rm -f bin/main
rm -f site/*

# Linux(debug)
cc -std=c99 -DDEBUG -Wall -Wno-unknown-pragmas -Wpedantic -Wshadow -Wuninitialized -Wextra -Werror=implicit-int -Werror=incompatible-pointer-types -Werror=int-conversion -Wvla -g -Og -fsanitize=address -fsanitize=undefined src/main.c -o bin/main

# Linux(fast)
# cc main.c -std=c89 -Os -DNDEBUG -g0 -s -Wall -Wno-unknown-pragmas -o main

# RPi
# tcc -Wall main.c -o main

# Plan9
# pcc main.c -o main

# Run
./bin/main

# Cleanup

