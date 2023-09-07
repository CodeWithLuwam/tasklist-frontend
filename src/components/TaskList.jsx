import Task from './Task';
import './TaskList.css';
import PropTypes from 'prop-types';

const TaskList = ({ tasks, deleteTask, toggleIsComplete }) => {
  return (
    <div className='TaskList'>
      {tasks.map((task) => {
        return <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          isComplete={task.isComplete}
          deleteTask={deleteTask}
          toggleIsComplete={toggleIsComplete}
        />
      }
      )}
    </div>
  )
};

export default TaskList;