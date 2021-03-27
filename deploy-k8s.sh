HC='\033[0;32m' # Heading Color
NC='\033[0m' # No Color

echo -e "${HC}::::::::::::::::::::::::::Pull image interactive-video-api::::::::::::::::::::::::::${NC}"
docker build /var/www/html/igti/interactive-video-api/ -t ${REPO_API_PHP}
docker push ${REPO_API_PHP}

echo -e "${HC}::::::::::::::::::::::::::Pull image interactive-video-web::::::::::::::::::::::::::${NC}"
docker build /var/www/html/igti/interactive-video-web/ -t ${REPO_APP_REACT}
docker push ${REPO_APP_REACT}

echo -e "${HC}::::::::::::::::::::::::::Create environment Data Base Postgres::::::::::::::::::::::::::${NC}"
kubectl delete -f k8s/pgsql/deploy.yml
kubectl delete -f k8s/pgsql/svc.yml

kubectl delete secret pgsql-pass
kubectl create secret generic pgsql-pass --from-literal=password=${DB_PASSWORD}

kubectl create -f k8s/pgsql/pvc.yml
kubectl create -f k8s/pgsql/deploy.yml
kubectl create -f k8s/pgsql/svc.yml

echo -e "${HC}::::::::::::::::::::::::::Create environment RabbitMQ::::::::::::::::::::::::::${NC}"
kubectl delete -f k8s/rabbitmq/deploy.yml
kubectl delete -f k8s/rabbitmq/svc.yml


kubectl create -f k8s/rabbitmq/pvc.yml
kubectl create -f k8s/rabbitmq/deploy.yml
kubectl create -f k8s/rabbitmq/svc.yml


echo -e "${HC}::::::::::::::::::::::::::Create environment API interactive-video::::::::::::::::::::::::::${NC}"
kubectl delete -f k8s/interactive-video/api/configmap-envs.yml
kubectl delete -f k8s/interactive-video/api/configmap-phpini.yml
kubectl delete -f k8s/interactive-video/api/configmap-nginx.yml
kubectl delete -f k8s/interactive-video/api/deploy.yml
kubectl delete -f k8s/interactive-video/api/svc.yml
kubectl delete -f k8s/interactive-video/api/ingress.yml

kubectl create -f k8s/interactive-video/api/configmap-envs.yml
kubectl create -f k8s/interactive-video/api/configmap-phpini.yml
kubectl create -f k8s/interactive-video/api/configmap-nginx.yml
kubectl create -f k8s/interactive-video/api/deploy.yml
kubectl create -f k8s/interactive-video/api/svc.yml
kubectl create -f k8s/interactive-video/api/ingress.yml

echo -e "${HC}::::::::::::::::::::::::::Create environment Web interactive-video::::::::::::::::::::::::::${NC}"
kubectl delete -f k8s/interactive-video/web/configmap-nginx.yml
kubectl delete -f k8s/interactive-video/web/deploy.yml
kubectl delete -f k8s/interactive-video/web/svc.yml
kubectl delete -f k8s/interactive-video/web/ingress.yml

kubectl create -f k8s/interactive-video/web/configmap-nginx.yml
kubectl create -f k8s/interactive-video/web/deploy.yml
kubectl create -f k8s/interactive-video/web/svc.yml
kubectl create -f k8s/interactive-video/web/ingress.yml

kubectl get configmap
kubectl get pods
kubectl get svc
kubectl get pvc
kubectl get ingress