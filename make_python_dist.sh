#!/bin/sh

clear
npm run build:all
python setup.py sdist
