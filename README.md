# MV Equip

## Description
MV Equip é um software PWA desenvolvido em Ionic para controle de movimentações de equipamentos da Infraestrutura da SEPOG.

### Features
A ser implementadas.

## Installation and Configuration

Node.JS e NPM

* Vide tutorial de instalação: [Node Version Manager](http://https://github.com/nvm-sh/nvm "nvm-sh")

Ionic

```bash
npm install -g ionic
```

Postgresql e pgAdmin4

 
 ```bash
sudo apt-get install curl ca-certificates
curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main

sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/
$(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

sudo apt-get update
sudo apt-get install postgresql-11 pgadmin4
```

* Importe o arquivo .sql de configuração do banco de dados:
[arquivo .sql](https://firebasestorage.googleapis.com/v0/b/mv-equip-sepog.appspot.com/o/backup.sql?alt=media&token=6ebcddca-0b10-4ac3-9aa0-3283b073d045 "Importe dentro do banco de dados")

pREST

* Via homebrew
```bash
brew install prest

```

* Package de instalação:
 [pREST 0.3.4](https://github.com/prest/prest/releases/tag/v0.3.4 "Latest release") 

Clone este projeto e instale as depêndecias do mesmo

```bash
git clone http://github.com/gabrielvictorf/mv-equip.git
cd mv-equip
npm install
```
* Arquivo .zip de configuração do servidor, extrair no mesmo local(raiz) de instalação do pREST: [arquivo de configuração](https://firebasestorage.googleapis.com/v0/b/mv-equip-sepog.appspot.com/o/backup.sql?alt=media&token=6ebcddca-0b10-4ac3-9aa0-3283b073d045 "pREST config")
## Usage

Para iniciar um servidor devolopment do IONIC na porta 8100
```bash
ionic serve
```
Para iniciar um servidor pREST na porta 8080
```bash
cd prest/
./prest
```
