"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeRabbitMQ =
  exports.connectRabbitMQ =
  exports.consumeFromQueue =
    void 0;
const rabbitmq_1 = __importDefault(require("@lucky/rabbitmq"));
const email_service_1 = require("../services/email.service");
const rabbitMQ = new rabbitmq_1.default({
  serviceName: "Todo Service",
  queues: ["todo_created"],
});
const consumeFromQueue = async () => {
  await rabbitMQ.consumeFromQueue(
    "todo_created",
    async (event) => {
      console.log("Received todo_created event:", event);
      await (0, email_service_1.handleTodoCreated)(event);
    },
    { noAck: false },
  );
};
exports.consumeFromQueue = consumeFromQueue;
const connectRabbitMQ = async () => rabbitMQ.connect();
exports.connectRabbitMQ = connectRabbitMQ;
const closeRabbitMQ = async () => rabbitMQ.close();
exports.closeRabbitMQ = closeRabbitMQ;
//# sourceMappingURL=rabbitmq.js.map
