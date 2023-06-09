# Nikken - WeStart

## **Instrucciones de instalación**

A continuación se listan los pasos de configuración de cada uno de los componentes utilizados en el proyecto.

### **Setup**

1. Clonar el repositorio:
    ```
    git clone https://github.com/nikken1/WeStart.git
    ```

2. En la carpeta base del proyecto (la misma ruta en donde se encuentra el archivo docker-compose.yml) crear el archivo **.env** con las siguientes variables de entorno:
    ```sh
    BACKEND_URL=${DOMAIN}/backend
    FRONTEND_URL=${DOMAIN}
    BACKEND_PORT=${BACK_LOCAL_PORT}
    FRONTEND_PORT=${FRONT_LOCAL_PORT}
    MYSQL_HOST=${DB_HOST}
    MYSQL_PORT=${DB_PORT}
    MYSQL_DATABASE=${DB_NAME}
    MYSQL_USER=${DB_USER}
    MYSQL_PASSWORD=${DB_USER_PASSWORD}
    ```

    Donde:
    * **${DOMAIN}** dominio a utilizar
    * **{BACK_LOCAL_PORT}**: puerto del contenedor de backend (por defecto 3000)
    * **{FRONT_LOCAL_PORT}**: puerto del contenedor de frontend (por defecto 5173)
    * **{DB_HOST}**: host de la base de datos
    * **{DB_PORT}**: puerto de la base de datos
    * **{DB_NAME}**: nombre de la base de datos
    * **{DB_USER}**: usuario de base de datos
    * **{DB_USER_PASSWORD}**: contraseña del usuario de base de datos

    En caso de que la base de datos este siendo ejecutada en el mismo servidor (localhost) el valor de **${DB_HOST}** debe ser **host.docker.internal**

---

### **Certificado SSL**

En caso de no contar con un certificado ssl para el dominio utilizar la librería [certbot](https://certbot.eff.org/instructions) para la creación del mismo. A continuación se muestran los comandos utilizados:

```sh
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot certonly --nginx
sudo certbot renew --dry-run
```

Se debe observar un output similar al siguente:

![certbot_output.png](/docs/certbot_output.png)

---

### **NGINX**

Se utiliza nginx como proxy para redirigir el tráfico HTTP hacia los contenedores. En caso no tener la instalación seguir los pasos explicados en el siguiente enlace https://www.nginx.com/resources/wiki/start/topics/tutorials/install/

1. Crear site:
    ```sh
    sudo touch /etc/nginx/sites-available/westart
    sudo ln -s /etc/nginx/sites-available/westart /etc/nginx/sites-enabled/westart
    ```

2. Editar el archivo creado en el paso anterior:
    ```sh
    sudo nano /etc/nginx/sites-available/westart
    ```

    Incluyendo la siguiente configuración:
    ```sh
    server {
        listen       443 ssl http2;
        listen       [::]:443 ssl http2;
        server_name  {DOMAIN};

        ssl_certificate {CERTIFICATE_PATH};
        ssl_certificate_key {KEY_PATH};
        location / {
            proxy_pass                 http://127.0.0.1:{FRONT_LOCAL_PORT};
            proxy_http_version         1.1;
            proxy_set_header Host      $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
        location /backend {
            rewrite /backend/(.*) /$1  break;
            proxy_pass         http://127.0.0.1:{BACK_LOCAL_PORT};
        }
    }
    ```

    Donde:
    * **${DOMAIN}** dominio a utilizar
    * **${CERTIFICATE_PATH}** ruta del certificado ssl
    * **${KEY_PATH}** ruta de la llave ssl
    * **{FRONT_LOCAL_PORT}**: puerto del contenedor de frontend (por defecto 5173)
    * **{BACK_LOCAL_PORT}**: puerto del contenedor de backend (por defecto 3000)

3. Reiniciar nginx:
    ```sh
    sudo systemctl restart nginx
    ```

    Comprobar estado del servicio:
    ```sh
    sudo systemctl status nginx
    ```

    Se debe observar un output similar al siguente:

    ![nginx_output.png](/docs/nginx_output.png)

---

### **Docker**

Se utiliza la plataforma de contenedores Docker, en caso de no tener la instalación ingresar al siguiente enlace y seguir los pasos de acuerdo con el SO del servidor:
https://docs.docker.com/engine/install/


Comando para ejecución de los contenedores:

```sh
docker compose up -d
```

Comando para verificar el estado de los contenedores:

```sh
docker compose ps
```

Comando para visualizar logs de los contenedores:

```sh
docker compose logs
```

Finalmente se puede acceder a la url configurada donde se debe observar la página de inicio:

![westart_output.png](/docs/westart_page.png)

URL ejemplo: https://westart.nikken.com/?nikken_id=eyJpdiI6IkM5a2MwQmt6c3hrZlV0a1QwQlhOOGc9PSIsInZhbHVlIjoiWDI3MndlK1NRalIxTEd0dzl2T2ZjSXc2WUJUcjc2dllpeWltUVJ4eDlGMD0iLCJtYWMiOiIwYTc1YWJlNGE5NTMxMjlmYjdkYzk2ZmQ0NThhODM2YTNiZTE1OTIwZGZlYzYxOWYwNjQyNWNkMzMzZDkxNzNkIn0&name=eyJpdiI6IkdLMzhRR25HUDB0ZTJcL1RiMk85dU5RPT0iLCJ2YWx1ZSI6IktyVVE2Uk1HcjN3SitRbVd5UXBzaHc9PSIsIm1hYyI6ImRmM2U0ZDA3MDA0MTc3ZGIzYmVhYThhNzQzZjMwYjcyYWE2NjVjODEwN2IwMDFmZjY5ZjA1NTI0NDI1ZGU1NzUifQ&language=eyJpdiI6IjNHTjlqdUUzZzdtMTR3eThFMjlnM0E9PSIsInZhbHVlIjoiVVJHeXVtUVlUZTlPcjUrdlFUS0dzdz09IiwibWFjIjoiYWQ2OTMzNGQ1NmZiMDA1Mjk3MTMxMTFlMzA5YjEyZDAyYWY4NTA0OTY5YzJhYzdjODdjZjA1NzJhZmZjNzFiMiJ9
