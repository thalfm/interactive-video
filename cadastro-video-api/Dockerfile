FROM ubuntu:20.10

ARG PHP_VERSION=7.4

RUN apt-get update && apt install -qq -y php${PHP_VERSION}-fpm \
    && apt-get -qq -y --no-install-recommends install  \
       php${PHP_VERSION}-pgsql \
       php-redis \
       php-xdebug \
       php${PHP_VERSION}-bcmath \
       php${PHP_VERSION}-gd \
       php-imagick \
       php${PHP_VERSION}-intl \
       php${PHP_VERSION}-tidy \
       php${PHP_VERSION}-xsl \
       php${PHP_VERSION}-mbstring \
       php${PHP_VERSION}-curl \
       php${PHP_VERSION}-zip


RUN apt install -qq -y curl && apt-get install -y ca-certificates

RUN curl -sS https://getcomposer.org/installer -o composer-setup.php \
   && php composer-setup.php --install-dir=/usr/local/bin --filename=composer;

ARG WITH_XDEBUG=false

RUN if [ $WITH_XDEBUG = "true" ] ; then \
	    pecl install xdebug; \
        echo 'zend_extension="/usr/lib/php/20190902/xdebug.so"' >> /etc/php/7.4/cli/php.ini; \
        echo "xdebug.remote_host=${IP_SUA_MAQUINA}" >> /etc/php/7.4/cli/php.ini; \
        echo "xdebug.remote_enable=1" >> /etc/php/7.4/cli/php.ini; \
        echo "xdebug.idekey=PHPSTORM" >> /etc/php/7.4/cli/php.ini; \
        sed -i -r -e 's|(display_startup_errors) = \w+|\1 = On|' /etc/php/7.4/cli/php.ini; \
        sed -i -r -e 's|(display_errors) = \w+|\1 = On|' /etc/php/7.4/cli/php.ini; \
        sed -i -r -e 's|(error_reporting) = .+$|\1 = E_ALL|' /etc/php/7.4/cli/php.ini; \

        echo 'zend_extension="/usr/lib/php/20190902/xdebug.so"' >> /etc/php/7.4/fpm/php.ini; \
        echo "xdebug.remote_host=${IP_SUA_MAQUINA}" >> /etc/php/7.4/fpm/php.ini; \
        echo "xdebug.remote_enable=1" >> /etc/php/7.4/fpm/php.ini; \
        echo "xdebug.idekey=PHPSTORM" >> /etc/php/7.4/fpm/php.ini; \
        sed -i -r -e 's|(display_startup_errors) = \w+|\1 = On|' /etc/php/7.4/fpm/php.ini; \
        sed -i -r -e 's|(display_errors) = \w+|\1 = On|' /etc/php/7.4/fpm/php.ini; \
        sed -i -r -e 's|(error_reporting) = .+$|\1 = E_ALL|' /etc/php/7.4/fpm/php.ini; \
	fi ;

RUN apt-get install -qq -y nginx

RUN service nginx reload

CMD service php7.4-fpm start && nginx -g "daemon off;"

EXPOSE 80 443

WORKDIR /opt/api

COPY api/ /opt/api

RUN chmod -R 777 storage
RUN chmod -R 777 bootstrap