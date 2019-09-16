#!/bin/bash

echo -e "\033[0;32mStarting sass watch and jekyll server...\033[0m"

sass --watch --style=compressed

sg-css/_scss:sg-css/css

ltu-patterns/assets/_sass:ltu-patterns/assets/css

& bundle exec jekyll serve && fg
