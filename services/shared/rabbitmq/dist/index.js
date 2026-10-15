"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
class RabbitMQClient {
    constructor(config = {}) {
        this.config = config;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rabbitMQUrl = this.config.url || "amqp://localhost:5672";
                this.connection = yield amqplib_1.default.connect(rabbitMQUrl);
                this.channel = this.connection.createChannel();
                if (this.config.queues) {
                    for (const queue of this.config.queues) {
                        yield this.channel.assertQueue(queue, { durable: true });
                    }
                }
                const serviceName = this.config.serviceName || "Service";
                console.log(`${serviceName}: RabbitMQ connected successfully`);
            }
            catch (error) {
                const serviceName = this.config.serviceName || "Service";
                console.error(`${serviceName}: RabbitMQ connection error:`, error);
            }
        });
    }
    publishToQueue(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.channel) {
                    console.error("RabbitMQ channel not available");
                    return false;
                }
                yield this.channel.assertQueue(queue, { durable: true });
                this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
                    persistent: true,
                });
                console.log(`Message published to queue ${queue}:`, message);
                return true;
            }
            catch (error) {
                console.error("Error publishing message to queue");
                return false;
            }
        });
    }
    consumeFromQueue(queue_1, handler_1) {
        return __awaiter(this, arguments, void 0, function* (queue, handler, options = { noAck: false }) {
            try {
                if (!this.channel) {
                    console.error("RabbitMQ channel not available");
                    return;
                }
                yield this.channel.assertQueue(queue, { durable: true });
                this.channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if (msg) {
                        try {
                            const content = JSON.parse(msg.content.toString());
                            yield handler(content);
                            if (!options.noAck) {
                                (_a = this.channel) === null || _a === void 0 ? void 0 : _a.ack(msg);
                            }
                            console.log(`Started consuming from queue: ${queue}`);
                        }
                        catch (error) {
                            console.error("Error consuming message to queue");
                            return false;
                        }
                    }
                }));
            }
            catch (error) {
                console.error("Error publishing message to queue");
                return false;
            }
        });
    }
    getChannel() {
        return this.channel;
    }
    isConnected() {
        return this.channel !== null && this.connection !== null;
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.channel) {
                    yield this.channel.close();
                    this.channel = null;
                }
                if (this.connection) {
                    yield this.connection.close();
                    this.connection = null;
                }
                console.log("RabbitMQ connection closed");
            }
            catch (error) {
                console.error("Error closing RabbitMQ connection:", error);
            }
        });
    }
}
exports.default = RabbitMQClient;
