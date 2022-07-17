######### Setup Kafka Commands #########
# This script will setup the Kafka topics.



####### Debugging ###################
# Create topic Debug_topic
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic Debug_topic --partitions 1 --replication-factor 1
# Configure topic ATL_reply_data to handle large messages
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name Debug_topic --add-config max.message.bytes=104857600
#####################################



####### ATL #########################
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
#####################################



####### AGPT #########################
# Create topic AGPT_new_data
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic AGPT_new_data --partitions 1 --replication-factor 1
# Configure topic AGPT_new_data to handle large messages
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name AGPT_new_data --add-config max.message.bytes=104857600

# Create topic AGPT_request_data
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic AGPT_request_data --partitions 1 --replication-factor 1
# Configure topic AGPT_request_data to handle large messages
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name AGPT_request_data --add-config max.message.bytes=104857600

# Create topic AGPT_reply_data
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic AGPT_reply_data --partitions 1 --replication-factor 1
# Configure topic AGPT_reply_data to handle large messages
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name AGPT_reply_data --add-config max.message.bytes=104857600
#####################################




####### PF ##########################
# Create topic PF_new_data
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic PF_new_data --partitions 1 --replication-factor 1
# Configure topic PF_new_data to handle large messages
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name PF_new_data --add-config max.message.bytes=104857600

# Create topic PF_request_data
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic PF_request_data --partitions 1 --replication-factor 1
# Configure topic PF_request_data to handle large messages
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name PF_request_data --add-config max.message.bytes=104857600

# Create topic PF_reply_data
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic PF_reply_data --partitions 1 --replication-factor 1
# Configure topic PF_reply_data to handle large messages
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name PF_reply_data --add-config max.message.bytes=104857600
#####################################

