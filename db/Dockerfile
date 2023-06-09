FROM mysql:latest

RUN chown -R mysql:root /var/lib/mysql/

ADD create_script.sql /etc/mysql/create_script.sql

RUN sed -i 's/MYSQL_DATABASE/nikken/g' /etc/mysql/create_script.sql

RUN cp /etc/mysql/create_script.sql /docker-entrypoint-initdb.d

EXPOSE 3306