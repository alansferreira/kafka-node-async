# Implementation of promisify (async/await) in `kafak-node` module

## Motivation

`kafka-node` is an awesome library, but it has a lot of callbacks, most of the promisification methods are generic, with no type coercion.

The idea of ​​this library is to apply as much type coercion as possible.