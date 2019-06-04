#!/bin/bash

echo -e "\033[0;32mStarting sass watch and jekyll server...\033[0m"

sass --watch --no-source-map ltucss/_sass:ltucss/css & jekyll serve && fg
