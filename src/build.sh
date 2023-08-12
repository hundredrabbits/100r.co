#!/bin/sh
set -euf

usage() {
	cat <<EOF
Usage:
	./build.sh [options]

Options:
    -b    Fast build.
		-d    Debug build (default).
		-n    Plan 9 build.
		-r    Raspberry Pi build.
		-h    This message.
EOF
}

lint() {
	if command -v clang-format &>/dev/null; then
		clang-format -i main.c
	fi
}

cleanup() {
	rm -f ./main
	rm -rf ../site
	mkdir ../site
}

quickrun() {
	./main
	rm -f ./main
}

debug_build() {
	lint
	cleanup
	cc -std=c99 -DDEBUG -Wall -Wno-unknown-pragmas -Wpedantic -Wshadow -Wuninitialized -Wextra -Werror=implicit-int -Werror=incompatible-pointer-types -Werror=int-conversion -Wvla -g -Og -fsanitize=address -fsanitize=undefined main.c -o main
	quickrun
}

fast_build() {
	lint
	cleanup
	cc main.c -std=c89 -Os -DNDEBUG -g0 -s -Wall -Wno-unknown-pragmas -o main
	quickrun
	run
}

nine_build() {
	cleanup
	pcc main.c -o main
	quickrun
	run
}

rpi_build() {
	lint
	cleanup
	tcc -Wall main.c -o main
	quickrun
	run
}

shift $((OPTIND - 1))

while getopts :bdnrh opts; do
	case "${opts}" in
	b) fast_build ;;
	d) debug_build ;;
	n) nine_build ;;
	r) rpi_build ;;
	h) usage ;;
	\?) usage ;;
	esac
done

if [ -z "${1:-}" ]; then
	debug_build
fi
