[![npm version](https://badgen.net/npm/v/sequelize)](https://www.npmjs.com/package/sequelize)
[![Build Status](https://github.com/sequelize/sequelize/workflows/CI/badge.svg)](https://github.com/sequelize/sequelize/actions?query=workflow%3ACI)
[![npm downloads](https://badgen.net/npm/dm/sequelize)](https://www.npmjs.com/package/sequelize)

### Base de datos: 
Tabla Product1:

- id: Integer
- name: String
- productCode: string (automatico)
- description: String
- characteristics: Text
- released: DateOnly
- price Decimal(7, 2)
- stock Integer
- enable boolean (aut)
- deleteAt boolean (aut)

Tabla Category:
- id: Integer
- name: String

Tabla image:
- id: integer,
- name: String
- images: array (string)