#!/bin/bash
#
## on se place dans le répertoire ou l'on veut sauvegarder les bases
#
cd /home/pi/scripts/backups/

# parcours les bases
for i in nom_de_la_bdd; do

## Sauvegarde des bases de données en fichiers .sql
mysqldump -utilisateur -pmot_de_passe $i &amp;amp;amp;amp;gt; ${i}_`date +"%Y-%m-%d"`.sql

## Compression des exports en tar.bz2
tar jcf ${i}_`date +"%Y-%m-%d"`.sql.tar.bz2 ${i}_`date +"%Y-%m-%d"`.sql

## Suppression des exports non-compresses
rm ${i}_`date +"%Y-%m-%d"`.sql

  echo "|Sauvegarde de la base de donnees $BDD.sql ";

done