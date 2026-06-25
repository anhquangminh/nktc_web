import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  User, 
  Calendar, 
  Tag, 
  CheckSquare, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Briefcase,
  ChevronRight,
  Filter
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  project: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
  status: 'todo' | 'progress' | 'completed';
  subtasks: { id: string; text: string; completed: boolean }[];
}

const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Kiểm tra chất lượng bê tông móng',
    project: 'Landmark 81',
    assignee: 'Nguyễn Văn Hùng',
    priority: 'high',
    date: '2026-06-25',
    status: 'todo',
    subtasks: [
      { id: 'sub-1', text: 'Lấy mẫu thí nghiệm r7, r28', completed: false },
      { id: 'sub-2', text: 'Ký biên bản nghiệm thu vật liệu', completed: false }
    ]
  },
  {
    id: 'task-2',
    title: 'Lắp đặt hệ thống kính hộp mặt dựng',
    project: 'Vinhomes CP',
    assignee: 'Trần Thanh Sơn',
    priority: 'medium',
    date: '2026-06-28',
    status: 'progress',
    subtasks: [
      { id: 'sub-3', text: 'Đo đạc khẩu độ khung nhôm', completed: true },
      { id: 'sub-4', text: 'Cẩu kính lên tháp tầng 12', completed: false },
      { id: 'sub-5', text: 'Bắn keo silicone kết cấu', completed: false }
    ]
  },
  {
    id: 'task-3',
    title: 'Nghiệm thu phòng cháy chữa cháy',
    project: 'Hầm Thủ Thiêm 2',
    assignee: 'Lê Hoàng Nam',
    priority: 'high',
    date: '2026-06-24',
    status: 'completed',
    subtasks: [
      { id: 'sub-6', text: 'Thử áp đường ống cứu hỏa', completed: true },
      { id: 'sub-7', text: 'Kiểm tra tủ trung tâm báo cháy', completed: true }
    ]
  },
  {
    id: 'task-4',
    title: 'Đào đất hố móng phân khu C',
    project: 'Sala Block C',
    assignee: 'Phạm Đức Duy',
    priority: 'low',
    date: '2026-06-30',
    status: 'todo',
    subtasks: [
      { id: 'sub-8', text: 'Định vị tim móng cốt chuẩn', completed: false }
    ]
  },
  {
    id: 'task-5',
    title: 'Bàn giao mặt bằng hoàn thiện thô',
    project: 'Aqua City',
    assignee: 'Vũ Thị Mai',
    priority: 'medium',
    date: '2026-06-26',
    status: 'progress',
    subtasks: [
      { id: 'sub-9', text: 'Dọn dẹp phế thải xây dựng', completed: true },
      { id: 'sub-10', text: 'Sơn lót tường ngoài tháp A', completed: false }
    ]
  }
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddingTask, setIsAddingTask] = useState<string | null>(null); // column id
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskProject, setNewTaskProject] = useState('Landmark 81');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newTaskDate, setNewTaskDate] = useState('2026-06-26');
  
  // Drag state
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [activeOverCol, setActiveOverCol] = useState<string | null>(null);

  const columns = [
    { id: 'todo', title: 'Cần thực hiện', countColor: 'bg-neutral-800 text-neutral-300', dot: 'bg-amber-500' },
    { id: 'progress', title: 'Đang triển khai', countColor: 'bg-blue-500/10 text-blue-400', dot: 'bg-blue-500' },
    { id: 'completed', title: 'Đã hoàn thành', countColor: 'bg-emerald-500/10 text-emerald-400', dot: 'bg-emerald-500' }
  ];

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setActiveOverCol(columnId);
  };

  const handleDragLeave = () => {
    setActiveOverCol(null);
  };

  const handleDrop = (e: React.DragEvent, targetStatus: 'todo' | 'progress' | 'completed') => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (taskId) {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: targetStatus } : t));
    }
    setDraggedTaskId(null);
    setActiveOverCol(null);
  };

  // Add task logic
  const handleAddTask = (columnId: 'todo' | 'progress' | 'completed') => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      project: newTaskProject,
      assignee: newTaskAssignee.trim() || 'Chưa phân công',
      priority: newTaskPriority,
      date: newTaskDate,
      status: columnId,
      subtasks: []
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
    setNewTaskAssignee('');
    setIsAddingTask(null);
  };

  // Toggle subtask
  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          subtasks: t.subtasks.map(st => st.id === subtaskId ? { ...st, completed: !st.completed } : st)
        };
      }
      return t;
    }));
  };

  // Delete task
  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Helper styles for priority
  const getPriorityStyle = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'low':
        return 'bg-neutral-800 text-neutral-400 border-neutral-700/50';
    }
  };

  const getPriorityLabel = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'Khẩn cấp';
      case 'medium': return 'Trung bình';
      case 'low': return 'Thấp';
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
      {/* Kanban Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/40 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-amber-500 animate-pulse" />
            <h3 className="text-sm font-bold text-white tracking-wide uppercase">
              Bảng công việc Kanban (Méo Kéo Thả)
            </h3>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Phân công, kéo thả công việc nhanh chóng giữa các trạng thái thi công dự án xây dựng.
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-[10px] text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-850">
          <Filter className="w-3.5 h-3.5 text-neutral-500" />
          <span>Kéo thẻ công việc sang cột khác để cập nhật trạng thái lập tức</span>
        </div>
      </div>

      {/* Columns Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id);
          const isOverThisCol = activeOverCol === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.id as any)}
              className={`flex flex-col bg-neutral-950/40 border rounded-2xl p-4 min-h-[550px] transition-all duration-200 ${
                isOverThisCol 
                  ? 'border-amber-500/40 bg-neutral-900/60 shadow-lg shadow-amber-500/5 scale-[1.01]' 
                  : 'border-neutral-850'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800/50">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <h4 className="text-xs font-bold text-white tracking-wider uppercase">{col.title}</h4>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${col.countColor}`}>
                  {colTasks.length}
                </span>
              </div>

              {/* Add Task Button or Form */}
              {isAddingTask === col.id ? (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 mb-4 space-y-3 shadow-inner"
                >
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Tên công việc mới..."
                    className="w-full text-xs bg-neutral-950 border border-neutral-850 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] text-neutral-500 font-bold uppercase">Dự án</label>
                      <select
                        value={newTaskProject}
                        onChange={(e) => setNewTaskProject(e.target.value)}
                        className="w-full text-[10px] bg-neutral-950 border border-neutral-850 rounded-md px-1.5 py-1 text-neutral-300 focus:outline-none"
                      >
                        <option value="Landmark 81">Landmark 81</option>
                        <option value="Hầm Thủ Thiêm 2">Hầm Thủ Thiêm 2</option>
                        <option value="Vinhomes CP">Vinhomes CP</option>
                        <option value="Sala Block C">Sala Block C</option>
                        <option value="Aqua City">Aqua City</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] text-neutral-500 font-bold uppercase">Ưu tiên</label>
                      <select
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value as any)}
                        className="w-full text-[10px] bg-neutral-950 border border-neutral-850 rounded-md px-1.5 py-1 text-neutral-300 focus:outline-none"
                      >
                        <option value="high">Khẩn cấp</option>
                        <option value="medium">Trung bình</option>
                        <option value="low">Thấp</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] text-neutral-500 font-bold uppercase">Người phụ trách</label>
                      <input
                        type="text"
                        value={newTaskAssignee}
                        onChange={(e) => setNewTaskAssignee(e.target.value)}
                        placeholder="Tên thợ / kĩ sư..."
                        className="w-full text-[10px] bg-neutral-950 border border-neutral-850 rounded-md px-2 py-1 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] text-neutral-500 font-bold uppercase">Hạn chót</label>
                      <input
                        type="date"
                        value={newTaskDate}
                        onChange={(e) => setNewTaskDate(e.target.value)}
                        className="w-full text-[10px] bg-neutral-950 border border-neutral-850 rounded-md px-1.5 py-1 text-neutral-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-1.5 pt-1">
                    <button
                      onClick={() => setIsAddingTask(null)}
                      className="px-2 py-1 bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 rounded text-[9px] font-bold text-neutral-400 cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleAddTask(col.id as any)}
                      className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 rounded text-[9px] font-bold text-black cursor-pointer shadow-sm"
                    >
                      Thêm thẻ
                    </button>
                  </div>
                </motion.div>
              ) : (
                <button
                  onClick={() => setIsAddingTask(col.id)}
                  className="w-full py-2 mb-3 bg-neutral-900/40 hover:bg-neutral-900 border border-neutral-850/60 hover:border-neutral-800 border-dashed rounded-xl flex items-center justify-center space-x-1.5 text-[10px] font-bold text-neutral-400 hover:text-white cursor-pointer transition-all active:scale-[0.98]"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-500" />
                  <span>Tạo nhiệm vụ mới</span>
                </button>
              )}

              {/* Tasks List */}
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 min-h-[350px]">
                <AnimatePresence initial={false}>
                  {colTasks.length === 0 ? (
                    <div className="h-44 border border-dashed border-neutral-850/40 rounded-xl flex flex-col items-center justify-center text-center p-4">
                      <Briefcase className="w-6 h-6 text-neutral-600 mb-2" />
                      <span className="text-[10px] text-neutral-500 font-medium">Trống, hãy thả thẻ vào đây</span>
                    </div>
                  ) : (
                    colTasks.map(task => {
                      const doneSubtasks = task.subtasks.filter(s => s.completed).length;
                      const totalSubtasks = task.subtasks.length;
                      const progressPct = totalSubtasks > 0 ? (doneSubtasks / totalSubtasks) * 100 : 0;

                      return (
                        <motion.div
                          key={task.id}
                          layoutId={task.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task.id)}
                          className={`bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-xl p-3.5 cursor-grab active:cursor-grabbing hover:border-neutral-700 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all relative group select-none ${
                            draggedTaskId === task.id ? 'opacity-35 border-dashed border-neutral-800' : ''
                          }`}
                        >
                          {/* Task Top Meta info */}
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider font-mono">
                              {task.project}
                            </span>
                            <div className="flex items-center space-x-1.5">
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold border ${getPriorityStyle(task.priority)}`}>
                                {getPriorityLabel(task.priority)}
                              </span>
                            </div>
                          </div>

                          {/* Task Title */}
                          <h5 className="text-[11.5px] font-bold text-white leading-snug tracking-wide group-hover:text-amber-400 transition-colors">
                            {task.title}
                          </h5>

                          {/* Date and Assignee Row */}
                          <div className="flex items-center justify-between mt-3 text-[9.5px] text-neutral-400 font-medium">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3 text-neutral-500" />
                              <span className="truncate max-w-[100px]">{task.assignee}</span>
                            </div>
                            <div className="flex items-center space-x-1 font-mono text-[9px]">
                              <Calendar className="w-3 h-3 text-neutral-500" />
                              <span>{task.date}</span>
                            </div>
                          </div>

                          {/* Subtasks Progress */}
                          {totalSubtasks > 0 && (
                            <div className="mt-3.5 pt-3 border-t border-neutral-850/60 space-y-2">
                              <div className="flex justify-between items-center text-[9.5px] font-semibold text-neutral-400">
                                <span className="flex items-center space-x-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                  <span>Tiểu mục công việc</span>
                                </span>
                                <span className="font-mono text-[9px] text-neutral-300">
                                  {doneSubtasks}/{totalSubtasks} ({Math.round(progressPct)}%)
                                </span>
                              </div>

                              {/* Progress bar */}
                              <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-emerald-500 rounded-full transition-all duration-300" 
                                  style={{ width: `${progressPct}%` }}
                                />
                              </div>

                              {/* Interactive Subtasks list */}
                              <div className="space-y-1 pt-1">
                                {task.subtasks.map(sub => (
                                  <label 
                                    key={sub.id} 
                                    className="flex items-center space-x-2 text-[9px] text-neutral-400 hover:text-white cursor-pointer select-none"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={sub.completed}
                                      onChange={() => toggleSubtask(task.id, sub.id)}
                                      className="rounded border-neutral-700 bg-neutral-950 text-amber-500 focus:ring-0 focus:ring-offset-0 w-2.5 h-2.5"
                                    />
                                    <span className={sub.completed ? 'line-through text-neutral-500' : ''}>
                                      {sub.text}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Delete Action button visible on hover */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTask(task.id);
                            }}
                            className="absolute right-2 top-2 p-1 text-neutral-500 hover:text-red-500 hover:bg-neutral-800 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="Xóa công việc"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
