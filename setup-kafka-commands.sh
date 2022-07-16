# Create topic ATL_new_data
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic ATL_new_data --partitions 1 --replication-factor 1
# Configure topic ATL_new_data to handle large messages
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name ATL_new_data --add-config max.message.bytes=104857600