import { taskModel } from "../models/task";
import { BaseService } from "./base";

class TaskService extends BaseService {
  model = taskModel;
}
