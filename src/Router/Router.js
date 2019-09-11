import HomeRouter from './HomeRouter';
import ProjectRouter from './ProjectRouter';
import FlowPathRouter from './FlowPathRouter';
import ResourcesRouter from './ResourcesRouter';
import TaskManagement from "./TaskManagement";
const routes = [
    ...HomeRouter,
    ...ProjectRouter,
    ...FlowPathRouter,
    ...ResourcesRouter,
    ...TaskManagement,
]
export default routes