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
  color: 'orange' | 'red' | 'yellow' | 'green';
  workflows: Workflow[];
}

const WorkflowColumn: React.FC<{ workflow: Workflow; color: string }> = ({ workflow, color }) => {
  return (
    <div className="flex flex-col">
      <div className={`${color} text-white px-4 py-3 rounded-t-lg`}>
        <div className="text-sm font-semibold mb-1">{workflow.timePerWeek}</div>
        <div className="font-bold text-lg">{workflow.title}</div>
      </div>
      <div className={`bg-gradient-to-b ${
        color === 'bg-orange-600' ? 'from-orange-100 to-orange-50 border-orange-600' :
        color === 'bg-red-600' ? 'from-red-100 to-red-50 border-red-600' :
        color === 'bg-yellow-600' ? 'from-yellow-100 to-yellow-50 border-yellow-600' :
        'from-green-100 to-green-50 border-green-600'
      } border-l-4 border-r-4 border-b-4 rounded-b-lg shadow-lg pb-4`}>
        {workflow.tasks.map((task, idx) => (
          <div key={idx} className="mx-3 mt-3 bg-white px-4 py-3 rounded shadow-sm border border-gray-200 flex items-center justify-between">
            <span className="font-medium text-gray-900">{task.name}</span>
            {task.complete && (
              <div className="w-6 h-6 rounded-full bg-green-600 border-2 border-gray-800" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function WorkflowSections() {
  const [showOutboundProspecting, setShowOutboundProspecting] = useState(false);
  const [showSelling, setShowSelling] = useState(false);
  const [showCoreSales, setShowCoreSales] = useState(false);
  const [showChurnMitigation, setShowChurnMitigation] = useState(false);
  const [showServicePostSales, setShowServicePostSales] = useState(false);

  const sections: WorkflowSection[] = [
    {
      title: 'Outbound Prospecting',
      totalTime: '12 hrs per week',
      color: 'orange',
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
      color: 'red',
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
      color: 'red',
      workflows: [
        {
          title: 'Manage Funnel',
          timePerWeek: '25 min per wk',
          tasks: [
            { name: 'Gauge Opty Count', complete: false },
            { name: 'Check for Opty Currency', complete: false },
            { name: 'Check for Touchpoint Consistency', complete: false },
            { name: 'Check for Next Steps', complete: false },
            { name: 'Confirm Product & Quantity', complete: false },
            { name: 'PVPVC', complete: false },
          ],
        },
        {
          title: 'Qualify Prospects',
          timePerWeek: '125 min per wk',
          tasks: [
            { name: 'Connect with Prospect', complete: false },
            { name: 'Confirm Applicability to Be VBG Customer', complete: false },
            { name: 'Confirm Business is Active', complete: false },
            { name: 'Confirm Territory Ownership', complete: false },
            { name: 'Confirm POC Listed on Art. of Inc.', complete: false },
            { name: 'Confirm Appropriate Documentation', complete: false },
            { name: 'Handle Fraud Cases', complete: false },
            { name: 'Handle Credit Issue', complete: false },
            { name: 'Submit MAA Request & Create Profile', complete: false },
          ],
        },
        {
          title: 'Engage in Discovery Process',
          timePerWeek: '25 min per wk',
          tasks: [
            { name: 'Connect with Prospect', complete: false },
            { name: 'Complete Discovery Questionnaire', complete: true },
          ],
        },
        {
          title: 'Manage Opportunity',
          timePerWeek: '310 min per wk',
          tasks: [
            { name: 'Convert to Opty', complete: false },
            { name: 'Send Nudges', complete: true },
            { name: "Cont'd Engagement", complete: false },
            { name: 'Set/reset Appointment', complete: true },
            { name: 'Meet w/ Customer', complete: true },
            { name: 'Post Meeting Analysis', complete: false },
            { name: 'Overcome Objections & Negotiate', complete: true },
          ],
        },
        {
          title: 'Build & Share Quote',
          timePerWeek: '75 min per wk',
          tasks: [
            { name: 'Fill In Customer Details', complete: false },
            { name: 'Select Devices & Customize', complete: false },
            { name: 'Select Payment Plan', complete: false },
            { name: 'Select Service, Protection, & Add Ons', complete: false },
            { name: 'Validate Quote & Cart', complete: false },
            { name: 'Apply Nonstandard Adjustments', complete: false },
            { name: 'Share Quote', complete: true },
          ],
        },
        {
          title: 'Close & Follow Up',
          timePerWeek: '75 min per wk',
          tasks: [
            { name: 'Plan Logistics', complete: false },
            { name: 'Process Order', complete: false },
            { name: 'Fill In Customer Details', complete: false },
            { name: 'Perform Credit Check', complete: false },
            { name: 'Submit Order', complete: true },
            { name: 'Ensure Hardware Delivered', complete: false },
            { name: 'Port Lines & Transfer Data', complete: false },
            { name: 'Execute Deployment Plan', complete: true },
          ],
        },
      ],
    },
    {
      title: 'Churn Mitigation',
      totalTime: '4 hrs per week',
      color: 'yellow',
      workflows: [
        {
          title: 'Engage in Quarterly Business review (QBR)!',
          timePerWeek: '90 min per wk',
          tasks: [
            { name: 'Choose Template', complete: false },
            { name: 'Build/Edit Deck', complete: true },
            { name: 'Review w/ Customer', complete: true },
          ],
        },
        {
          title: 'Work Through Artemis Churn Lists',
          timePerWeek: '10 min per wk',
          tasks: [
            { name: 'Build Churn Model List', complete: false },
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
      color: 'green',
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
      case 'orange':
        return {
          bg: 'bg-[#E8DCC8]',
          border: 'border-orange-600',
          hover: 'hover:bg-[#DDD0BA]',
          text: 'text-red-700',
          headerBg: 'bg-orange-600',
        };
      case 'red':
        return {
          bg: 'bg-[#F5E6E6]',
          border: 'border-red-600',
          hover: 'hover:bg-[#EDD8D8]',
          text: 'text-red-700',
          headerBg: 'bg-red-600',
        };
      case 'yellow':
        return {
          bg: 'bg-[#FFF9E6]',
          border: 'border-yellow-600',
          hover: 'hover:bg-[#FFF4D6]',
          text: 'text-red-700',
          headerBg: 'bg-yellow-600',
        };
      case 'green':
        return {
          bg: 'bg-[#E6F5E6]',
          border: 'border-green-600',
          hover: 'hover:bg-[#D8EDD8]',
          text: 'text-red-700',
          headerBg: 'bg-green-600',
        };
      default:
        return {
          bg: 'bg-[#E8DCC8]',
          border: 'border-orange-600',
          hover: 'hover:bg-[#DDD0BA]',
          text: 'text-red-700',
          headerBg: 'bg-orange-600',
        };
    }
  };

  return (
    <>
      {sections.map((section, idx) => {
        const colors = getColorClasses(section.color);
        const { show, setShow } = sectionStates[idx];

        return (
          <div key={idx} className={`${colors.bg} border-2 ${colors.border} rounded-lg mb-12 overflow-hidden`}>
            <button
              onClick={() => setShow(!show)}
              className={`w-full px-6 py-4 flex items-center justify-between ${colors.hover} transition-colors`}
            >
              <div className="flex items-center gap-4">
                <div className={`text-4xl font-bold ${colors.text}`}>{section.title}</div>
                <div className={`text-xl font-bold ${colors.text} italic`}>({section.totalTime})</div>
              </div>
              {show ? (
                <ChevronUp className={`w-8 h-8 ${colors.text}`} />
              ) : (
                <ChevronDown className={`w-8 h-8 ${colors.text}`} />
              )}
            </button>

            {show && (
              <div className="p-6">
                <div className={`grid grid-cols-1 ${section.workflows.length <= 2 ? 'md:grid-cols-2' : section.workflows.length <= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-5'} gap-6`}>
                  {section.workflows.map((workflow, wIdx) => (
                    <WorkflowColumn key={wIdx} workflow={workflow} color={colors.headerBg} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

