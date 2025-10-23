import React from 'react';
import { Star, Users, UserCircle, MessageSquare, FileText } from 'lucide-react';

interface Task {
  name: string;
  status: 'complete' | 'in-progress' | 'pending' | 'none';
  hasMultiple?: boolean;
}

interface Workflow {
  title: string;
  timePerWeek: string;
  icon: React.ReactNode;
  tasks: Task[];
}

const StatusIndicator: React.FC<{ status: Task['status']; hasMultiple?: boolean }> = ({ status, hasMultiple }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'complete':
        return 'bg-green-600';
      case 'in-progress':
        return 'bg-blue-600';
      case 'pending':
        return 'bg-orange-600';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className={`w-6 h-6 rounded-full ${getStatusColor()} border-2 border-gray-800`} />
      {hasMultiple && (
        <div className={`w-5 h-5 rounded-full ${status === 'complete' ? 'bg-orange-600' : 'bg-blue-600'} border-2 border-gray-800`} />
      )}
    </div>
  );
};

const WorkflowColumn: React.FC<{ workflow: Workflow }> = ({ workflow }) => {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-orange-600 text-white px-4 py-3 rounded-t-lg">
        <div className="text-sm font-semibold mb-1">{workflow.timePerWeek}</div>
        <div className="font-bold text-lg">{workflow.title}</div>
      </div>

      {/* Tasks */}
      <div className="bg-gradient-to-b from-orange-100 to-orange-50 border-l-4 border-r-4 border-b-4 border-orange-600 rounded-b-lg shadow-lg pb-4">
        {workflow.tasks.map((task, index) => (
          <div
            key={index}
            className="mx-3 mt-3 bg-white px-4 py-3 rounded shadow-sm border border-gray-200 flex items-center justify-between"
          >
            <span className="font-medium text-gray-900">{task.name}</span>
            <StatusIndicator status={task.status} hasMultiple={task.hasMultiple} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function OutboundProspecting() {
  const workflows: Workflow[] = [
    {
      title: 'Engage Top Leads',
      timePerWeek: '55 min per wk',
      icon: <Star className="w-8 h-8" />,
      tasks: [
        { name: 'Research Account', status: 'in-progress', hasMultiple: true },
        { name: 'Verify Customer Info', status: 'pending', hasMultiple: true },
        { name: 'Engage (Call)', status: 'complete', hasMultiple: true },
        { name: 'Engage (Email)', status: 'complete', hasMultiple: true },
        { name: 'Set Appointment', status: 'complete', hasMultiple: true },
        { name: 'Log Activity', status: 'in-progress', hasMultiple: true },
      ],
    },
    {
      title: 'Engage Leads from Homegrown List',
      timePerWeek: '225 min per wk',
      icon: <Users className="w-8 h-8" />,
      tasks: [
        { name: 'Research Account', status: 'in-progress', hasMultiple: true },
        { name: 'Verify Customer Info', status: 'in-progress', hasMultiple: true },
        { name: 'Engage (Call)', status: 'complete', hasMultiple: true },
        { name: 'Engage (Email)', status: 'complete', hasMultiple: true },
        { name: 'Set Appointment', status: 'complete', hasMultiple: true },
        { name: 'Log Activity', status: 'in-progress', hasMultiple: true },
      ],
    },
    {
      title: 'Sequence Battlecard Contacts',
      timePerWeek: '90 min per wk',
      icon: <UserCircle className="w-8 h-8" />,
      tasks: [
        { name: 'Select Lead', status: 'in-progress', hasMultiple: true },
        { name: 'Research Account', status: 'in-progress', hasMultiple: true },
        { name: 'Select Sequence', status: 'in-progress' },
        { name: 'Enroll', status: 'in-progress', hasMultiple: true },
        { name: 'Log Activity', status: 'in-progress', hasMultiple: true },
      ],
    },
    {
      title: 'Manage Outreach Task List',
      timePerWeek: '265 min per wk',
      icon: <MessageSquare className="w-8 h-8" />,
      tasks: [
        { name: 'Identify Hand Raisers', status: 'in-progress' },
        { name: 'Engage Hand Raisers', status: 'none' },
        { name: 'Select Template(s)', status: 'in-progress', hasMultiple: true },
        { name: 'Engage Other (Email)', status: 'complete', hasMultiple: true },
        { name: 'Set Appointment', status: 'complete', hasMultiple: true },
        { name: 'Log Activity', status: 'in-progress', hasMultiple: true },
      ],
    },
    {
      title: 'Check my Customers Detail',
      timePerWeek: '75 min per wk',
      icon: <FileText className="w-8 h-8" />,
      tasks: [
        { name: 'Select Customer + Promo', status: 'in-progress' },
        { name: 'Engage (call)', status: 'complete' },
        { name: 'Engage (mail)', status: 'complete', hasMultiple: true },
        { name: 'Set Appointment', status: 'complete', hasMultiple: true },
        { name: 'Log Activity', status: 'in-progress', hasMultiple: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#E8DCC8] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-red-700 mb-2">Outbound Prospecting</h1>
          <p className="text-2xl font-bold text-red-700 italic">(12 hrs per week)</p>
        </div>

        {/* Workflow Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {workflows.map((workflow, index) => (
            <WorkflowColumn key={index} workflow={workflow} />
          ))}
        </div>
      </div>
    </div>
  );
}

