HC='\033[0;32m' # Heading Color
NC='\033[0m' # No Color

echo -e "${HC}::::::::::::::::::::::::::Pull image cadastro-video-api::::::::::::::::::::::::::${NC}"
docker build /var/www/html/igti/cadastro-video-api/ -t thalfm/cadastro-video-api
docker push thalfm/cadastro-video-api

echo -e "${HC}::::::::::::::::::::::::::Pull image cadastro-video-web::::::::::::::::::::::::::${NC}"
docker build /var/www/html/igti/cadastro-video-web/ -t thalfm/cadastro-video-web
docker push thalfm/cadastro-video-web

echo -e "${HC}::::::::::::::::::::::::::Create environment Data Base Postgres::::::::::::::::::::::::::${NC}"
kubectl delete -f k8s/pgsql/deploy.yml
kubectl delete -f k8s/pgsql/svc.yml

kubectl delete secret pgsql-pass
kubectl create secret generic pgsql-pass --from-literal=password=${DB_PASSWORD}

kubectl create -f k8s/pgsql/pvc.yml
kubectl create -f k8s/pgsql/deploy.yml
kubectl create -f k8s/pgsql/svc.yml


echo -e "${HC}::::::::::::::::::::::::::Create environment API cadastro-video::::::::::::::::::::::::::${NC}"
kubectl delete -f k8s/cadastro-video/api/configmap-envs.yml
kubectl delete -f k8s/cadastro-video/api/configmap-nginx.yml
kubectl delete -f k8s/cadastro-video/api/deploy.yml
kubectl delete -f k8s/cadastro-video/api/svc.yml
kubectl delete -f k8s/cadastro-video/api/ingress.yml

kubectl create -f k8s/cadastro-video/api/configmap-envs.yml
kubectl create -f k8s/cadastro-video/api/configmap-nginx.yml
kubectl create -f k8s/cadastro-video/api/deploy.yml
kubectl create -f k8s/cadastro-video/api/svc.yml
kubectl create -f k8s/cadastro-video/api/ingress.yml

echo -e "${HC}::::::::::::::::::::::::::Create environment Web cadastro-video::::::::::::::::::::::::::${NC}"
kubectl delete -f k8s/cadastro-video/web/configmap-nginx.yml
kubectl delete -f k8s/cadastro-video/web/deploy.yml
kubectl delete -f k8s/cadastro-video/web/svc.yml
kubectl delete -f k8s/cadastro-video/web/ingress.yml

kubectl create -f k8s/cadastro-video/web/configmap-nginx.yml
kubectl create -f k8s/cadastro-video/web/deploy.yml
kubectl create -f k8s/cadastro-video/web/svc.yml
kubectl create -f k8s/cadastro-video/web/ingress.yml

kubectl get configmap
kubectl get pods
kubectl get svc
kubectl get pvc
kubectl get ingress