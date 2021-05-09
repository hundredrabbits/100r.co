#!/bin/bash

# Lint
clang-format -i main.c

# Cleanup
rm -f ./main
rm -rf ../site
mkdir ../site

# Linux(debug)
cc -std=c99 -DDEBUG -Wall -Wno-unknown-pragmas -Wpedantic -Wshadow -Wuninitialized -Wextra -Werror=implicit-int -Werror=incompatible-pointer-types -Werror=int-conversion -Wvla -g -Og -fsanitize=address -fsanitize=undefined main.c -o main

# Linux(fast)
# cc main.c -std=c89 -Os -DNDEBUG -g0 -s -Wall -Wno-unknown-pragmas -o main

# RPi
# tcc -Wall main.c -o main

# Plan9
# pcc main.c -o main

# Valgrind
# gcc -std=c89 -DDEBUG -Wall -Wpedantic -Wshadow -Wuninitialized -Wextra -Werror=implicit-int -Werror=incompatible-pointer-types -Werror=int-conversion -Wvla -g -Og main.c -o main
# valgrind ./main

# Build Size
# echo "$(du -b ./main | cut -f1) bytes written"

# Run
./main

# Cleanup
rm -f ./main
