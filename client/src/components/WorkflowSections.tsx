import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Task {
  name: string;
  complete: boolean;
}

interface Workflow {
  title: string;
  timePerWeek: string;
  tasks: Task[];
}

interface WorkflowSection {
  title: string;
  totalTime: string;
  color: 'slate' | 'indigo' | 'violet' | 'emerald';
  workflows: Workflow[];
}

const WorkflowColumn: React.FC<{ workflow: Workflow; color: string }> = ({ workflow, color }) => {
  return (
    <div className="flex flex-col">
      <div className={`${color} text-white px-4 py-3 rounded-t-lg`}>
        <div className="text-sm font-semibold mb-1 opacity-90">{workflow.timePerWeek}</div>
        <div className="font-bold text-base">{workflow.title}</div>
      </div>
      <div className={`bg-gradient-to-b ${
        color === 'bg-slate-600' ? 'from-slate-50 to-white border-slate-300' :
        color === 'bg-indigo-600' ? 'from-indigo-50 to-white border-indigo-300' :
        color === 'bg-violet-600' ? 'from-violet-50 to-white border-violet-300' :
        'from-emerald-50 to-white border-emerald-300'
      } border-2 rounded-b-lg shadow-sm pb-4`}>
        {workflow.tasks.map((task, idx) => (
          <div key={idx} className="mx-3 mt-3 bg-white px-3 py-2.5 rounded-md shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow">
            <span className="text-sm font-medium text-gray-800">{task.name}</span>
            {task.complete && (
              <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-emerald-600 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function WorkflowSections() {
  const [containerExpanded, setContainerExpanded] = useState(false);
  const [showOutboundProspecting, setShowOutboundProspecting] = useState(false);
  const [showSelling, setShowSelling] = useState(false);
  const [showCoreSales, setShowCoreSales] = useState(false);
  const [showChurnMitigation, setShowChurnMitigation] = useState(false);
  const [showServicePostSales, setShowServicePostSales] = useState(false);

  const sections: WorkflowSection[] = [
    {
      title: 'Outbound Prospecting',
      totalTime: '12 hrs per week',
      color: 'slate',
      workflows: [
        {
          title: 'Engage Top Leads',
          timePerWeek: '55 min per wk',
          tasks: [
            { name: 'Research Account', complete: false },
            { name: 'Verify Customer Info', complete: false },
            { name: 'Engage (Call)', complete: true },
            { name: 'Engage (Email)', complete: true },
            { name: 'Set Appointment', complete: true },
            { name: 'Log Activity', complete: false },
          ],
        },
        {
          title: 'Engage Leads from Homegrown List',
          timePerWeek: '225 min per wk',
          tasks: [
            { name: 'Research Account', complete: false },
            { name: 'Verify Customer Info', complete: false },
            { name: 'Engage (Call)', complete: true },
            { name: 'Engage (Email)', complete: true },
            { name: 'Set Appointment', complete: true },
            { name: 'Log Activity', complete: false },
          ],
        },
        {
          title: 'Sequence Battlecard Contacts',
          timePerWeek: '90 min per wk',
          tasks: [
            { name: 'Select Lead', complete: false },
            { name: 'Research Account', complete: false },
            { name: 'Select Sequence', complete: false },
            { name: 'Enroll', complete: false },
            { name: 'Log Activity', complete: false },
          ],
        },
        {
          title: 'Manage Outreach Task List',
          timePerWeek: '265 min per wk',
          tasks: [
            { name: 'Identify Hand Raisers', complete: false },
            { name: 'Engage Hand Raisers', complete: false },
            { name: 'Select Template(s)', complete: false },
            { name: 'Engage Other (Email)', complete: true },
            { name: 'Set Appointment', complete: true },
            { name: 'Log Activity', complete: false },
          ],
        },
        {
          title: 'Check my Customers Detail',
          timePerWeek: '75 min per wk',
          tasks: [
            { name: 'Select Customer + Promo', complete: false },
            { name: 'Engage (call)', complete: true },
            { name: 'Engage (mail)', complete: true },
            { name: 'Set Appointment', complete: true },
            { name: 'Log Activity', complete: false },
          ],
        },
      ],
    },
    {
      title: 'Selling',
      totalTime: '13 hrs per week',
      color: 'indigo',
      workflows: [
        {
          title: 'Plan Route',
          timePerWeek: '45 min per wk',
          tasks: [
            { name: 'Built Foot Blitz List', complete: false },
            { name: 'Trim, Vet, & Filter List', complete: false },
            { name: 'Plan Route', complete: false },
            { name: 'Core Sales Process', complete: true },
          ],
        },
        {
          title: 'Participate Sales Blitz',
          timePerWeek: '90 min per wk',
          tasks: [
            { name: 'Build List', complete: false },
            { name: 'Engage (call)', complete: true },
            { name: 'Engage (mail)', complete: true },
            { name: 'Validate (not on DNC list)', complete: false },
            { name: 'Engage (SMS)', complete: true },
            { name: 'Core Sales Process', complete: true },
          ],
        },
      ],
    },
    {
      title: 'Core Sales Process',
      totalTime: '13 hrs per week',
      color: 'violet',
      workflows: [
        {
          title: 'Prepare for Appointment',
          timePerWeek: '90 min per wk',
          tasks: [
            { name: 'Review Customer Info', complete: false },
            { name: 'Prepare Presentation', complete: false },
            { name: 'Gather Materials', complete: false },
          ],
        },
        {
          title: 'Conduct Discovery',
          timePerWeek: '180 min per wk',
          tasks: [
            { name: 'Understand Business Needs', complete: true },
            { name: 'Identify Pain Points', complete: true },
            { name: 'Assess Current Solutions', complete: true },
            { name: 'Document Requirements', complete: true },
          ],
        },
        {
          title: 'Present Solution',
          timePerWeek: '120 min per wk',
          tasks: [
            { name: 'Tailor Presentation', complete: true },
            { name: 'Demonstrate Features', complete: true },
            { name: 'Address Objections', complete: true },
            { name: 'Provide Pricing', complete: true },
          ],
        },
        {
          title: 'Close Deal',
          timePerWeek: '90 min per wk',
          tasks: [
            { name: 'Negotiate Terms', complete: true },
            { name: 'Finalize Contract', complete: true },
            { name: 'Process Order', complete: true },
            { name: 'Schedule Implementation', complete: true },
          ],
        },
      ],
    },
    {
      title: 'Churn Mitigation',
      totalTime: '4 hrs per week',
      color: 'violet',
      workflows: [
        {
          title: 'Manage Inbound Disco Requests',
          timePerWeek: '55 min per wk',
          tasks: [
            { name: 'Review Disco Request', complete: false },
            { name: 'Identify Churn Driver', complete: false },
            { name: 'Engage (call)', complete: true },
            { name: 'Engage (email)', complete: true },
          ],
        },
        {
          title: 'Review & Engage High Risk Accounts',
          timePerWeek: '25 min per wk',
          tasks: [
            { name: 'Review w/ Leadership', complete: false },
            { name: 'Understand Need', complete: true },
            { name: 'Determine LAC Offer / Solution', complete: true },
            { name: 'Get Commit & Close', complete: true },
            { name: 'Submit Change(s)', complete: true },
          ],
        },
        {
          title: 'Manage Intraday Sales Alerts',
          timePerWeek: '20 min per wk',
          tasks: [
            { name: 'Review Lead', complete: false },
            { name: 'Identify Churn Driver', complete: false },
            { name: 'Engage (call)', complete: true },
            { name: 'Engage (email)', complete: true },
            { name: 'Engage (SMS)', complete: true },
          ],
        },
        {
          title: 'Acct Migration (New Channel) Handoffs (New Rep)',
          timePerWeek: '5 min per wk',
          tasks: [
            { name: 'Notify SAM and Customer', complete: true },
            { name: 'Introduce New Rep', complete: true },
            { name: 'Send Handoff Summary (email)', complete: true },
            { name: 'Submit NBO TM Request Form', complete: false },
            { name: 'Review Top 30 Accts', complete: false },
            { name: 'Update Base', complete: false },
            { name: 'Review Funnel Opportunities', complete: false },
          ],
        },
        {
          title: 'Contact Scheduled Disconnects',
          timePerWeek: '80 min per wk',
          tasks: [
            { name: 'Obtain Director Approval (for LAC)', complete: false },
            { name: "Engage Planned Line Deact's (call)", complete: true },
            { name: "Engage Planned Line Deact's (email)", complete: true },
            { name: 'Engage Planned MyBiz Discos (call)', complete: true },
            { name: 'Engage Planned MyBiz Discos (email)', complete: true },
          ],
        },
      ],
    },
    {
      title: 'Service & Post Sales',
      totalTime: '4.5 hrs per week',
      color: 'emerald',
      workflows: [
        {
          title: 'Hand Off to White Glove Care Team',
          timePerWeek: '5 min per wk',
          tasks: [
            { name: 'Confirm Applicability to Be VBG Customer', complete: false },
          ],
        },
        {
          title: 'Manage Setup Support Cases',
          timePerWeek: '105 min per wk',
          tasks: [
            { name: 'Device Setup & VMDE Enrollment', complete: false },
            { name: 'MyBiz Registration', complete: true },
            { name: 'OneTalk Configuration', complete: true },
            { name: 'Resolve Shipping Issues', complete: true },
            { name: 'Resolve B360 Errors', complete: false },
            { name: 'Resolve Order Processing Issues', complete: false },
            { name: 'Resolve & Escalate Open Issues', complete: true },
            { name: 'BGCO Deflection', complete: true },
          ],
        },
        {
          title: 'Manage Port Support Cases',
          timePerWeek: '45 min per wk',
          tasks: [
            { name: 'Obtain Port Info', complete: false },
            { name: 'Assign Temp Numbers', complete: false },
            { name: 'Port & Activation Issues', complete: true },
            { name: 'Promo Fallout', complete: false },
          ],
        },
        {
          title: 'Manage Promo & Trade-in Support Cases',
          timePerWeek: '60 min per wk',
          tasks: [
            { name: 'Review Account Eligibility', complete: false },
            { name: 'Submit Appropriate Form for Approvals', complete: false },
            { name: 'Escalate Collections & Corrections', complete: false },
          ],
        },
        {
          title: 'Manage Post-Sales Fraud Cases',
          timePerWeek: '20 min per wk',
          tasks: [
            { name: 'Flag DFill Orders', complete: false },
            { name: 'Flag No Use / No Pay Devices', complete: false },
            { name: 'Get Fraud Support', complete: false },
          ],
        },
        {
          title: 'Call for Post-sale Welcome',
          timePerWeek: '25 min per wk',
          tasks: [
            { name: 'Set Expectations for First Bill', complete: false },
            { name: 'Field Questions for New Equipment', complete: true },
            { name: 'Address Zero Use Issues', complete: true },
            { name: 'Support with Onboarding', complete: true },
            { name: 'Schedule Follow-up', complete: true },
          ],
        },
      ],
    },
  ];

  const sectionStates = [
    { show: showOutboundProspecting, setShow: setShowOutboundProspecting },
    { show: showSelling, setShow: setShowSelling },
    { show: showCoreSales, setShow: setShowCoreSales },
    { show: showChurnMitigation, setShow: setShowChurnMitigation },
    { show: showServicePostSales, setShow: setShowServicePostSales },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'slate':
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-300',
          hover: 'hover:bg-slate-100',
          text: 'text-slate-700',
          headerBg: 'bg-slate-600',
        };
      case 'indigo':
        return {
          bg: 'bg-indigo-50',
          border: 'border-indigo-300',
          hover: 'hover:bg-indigo-100',
          text: 'text-indigo-700',
          headerBg: 'bg-indigo-600',
        };
      case 'violet':
        return {
          bg: 'bg-violet-50',
          border: 'border-violet-300',
          hover: 'hover:bg-violet-100',
          text: 'text-violet-700',
          headerBg: 'bg-violet-600',
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-300',
          hover: 'hover:bg-emerald-100',
          text: 'text-emerald-700',
          headerBg: 'bg-emerald-600',
        };
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-300',
          hover: 'hover:bg-slate-100',
          text: 'text-slate-700',
          headerBg: 'bg-slate-600',
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
      {/* Container Header */}
      <button
        onClick={() => setContainerExpanded(!containerExpanded)}
        className="w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 transition-all flex items-center justify-between border-b-2 border-gray-200"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">R2B Journey Stages</h2>
          <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-300">
            {sections.length} Stages
          </span>
        </div>
        {containerExpanded ? (
          <ChevronUp className="w-6 h-6 text-gray-600" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Container Content */}
      {containerExpanded && (
        <div className="p-6 space-y-6">
          {sections.map((section, idx) => {
            const colors = getColorClasses(section.color);
            const { show, setShow } = sectionStates[idx];

            return (
              <div key={idx} className={`${colors.bg} border-2 ${colors.border} rounded-lg overflow-hidden shadow-sm`}>
                <button
                  onClick={() => setShow(!show)}
                  className={`w-full px-5 py-3 flex items-center justify-between ${colors.hover} transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`text-xl font-bold ${colors.text}`}>{section.title}</div>
                    <div className={`text-sm font-semibold ${colors.text} opacity-75`}>({section.totalTime})</div>
                  </div>
                  {show ? (
                    <ChevronUp className={`w-6 h-6 ${colors.text}`} />
                  ) : (
                    <ChevronDown className={`w-6 h-6 ${colors.text}`} />
                  )}
                </button>

                {show && (
                  <div className="p-5 bg-white">
                    <div className={`grid grid-cols-1 ${section.workflows.length <= 2 ? 'md:grid-cols-2' : section.workflows.length <= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-5'} gap-4`}>
                      {section.workflows.map((workflow, wIdx) => (
                        <WorkflowColumn key={wIdx} workflow={workflow} color={colors.headerBg} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

