#!/bin/bash

COUNT=$(apt list --upgradeable | wc -l)

echo $(($COUNT - 1))
echo $(($COUNT - 1))

