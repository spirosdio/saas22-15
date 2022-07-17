# Create topic ATL_new_data
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic ATL_new_data --partitions 1 --replication-factor 1
# Configure topic ATL_new_data to handle large messages
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name ATL_new_data --add-config max.message.bytes=104857600


# Create topic ATL_request_data
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic ATL_request_data --partitions 1 --replication-factor 1
# Configure topic ATL_request_data to handle large messages
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name ATL_request_data --add-config max.message.bytes=104857600


# Create topic ATL_reply_data
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic ATL_reply_data --partitions 1 --replication-factor 1
# Configure topic ATL_reply_data to handle large messages
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name ATL_reply_data --add-config max.message.bytes=104857600

# Create topic Debug_topic
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic Debug_topic --partitions 1 --replication-factor 1
# Configure topic ATL_reply_data to handle large messages
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name Debug_topic --add-config max.message.bytes=104857600