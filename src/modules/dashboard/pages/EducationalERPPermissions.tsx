import React, { useState, useMemo, useCallback, useEffect, type FC, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import {
  ChevronRight, ChevronsRight, Search, Clock, Shield, AlertTriangle, Copy, CheckCircle, XCircle, Settings, MoreVertical, PlusCircle,
  BarChart2, Rewind, Eye, Edit, Trash2, Plus, Upload, Download, CheckSquare, Layers, Filter, Palette, Save, LogOut, type LucideProps, X
} from 'lucide-react';

// --- TYPE DEFINITIONS --- //
interface Role {
  id: number;
  name: string;
  userCount: number;
  description: string;
}

interface PermissionTypeInfo {
  id: string;
  label: string;
  icon: FC<LucideProps>;
  color: string;
}

interface PermissionDefinition {
  id: string;
  name: string;
}

interface Module {
  id: string;
  name: string;
  icon?: string;
  permissions?: PermissionDefinition[];
  children?: Module[];
}

interface PermissionStatus {
  enabled: boolean;
  timeBound?: boolean;
  conditional?: boolean;
}

type PermissionState = {
  [permissionId: string]: {
    [permissionType: string]: PermissionStatus;
  };
};


// --- MOCK DATA --- //
const initialRoles: Role[] = [
  { id: 1, name: 'Super Administrator', userCount: 2, description: 'Full access to all system modules and settings.' },
  { id: 2, name: 'Academic Principal', userCount: 5, description: 'Manages academic curriculum, student grades, and faculty.' },
  { id: 3, name: 'Teacher / Faculty', userCount: 45, description: 'Access to assigned courses, student attendance, and gradebook.' },
  { id: 4, name: 'Admissions Officer', userCount: 8, description: 'Manages student applications, enrollment, and communication.' },
  { id: 5, name: 'Finance Manager', userCount: 4, description: 'Handles billing, fees, payroll, and financial reporting.' },
  { id: 6, name: 'Student', userCount: 1250, description: 'Access to personal profile, courses, grades, and fee payments.' },
  { id: 7, name: 'Parent / Guardian', userCount: 2100, description: 'View access to their child\'s progress, attendance, and fee status.' },
];

const permissionTypes: PermissionTypeInfo[] = [
  { id: 'view', label: 'View', icon: Eye, color: 'text-blue-400' },
  { id: 'create', label: 'Create', icon: Plus, color: 'text-green-400' },
  { id: 'edit', label: 'Edit', icon: Edit, color: 'text-yellow-400' },
  { id: 'delete', label: 'Delete', icon: Trash2, color: 'text-red-400' },
  { id: 'approve', label: 'Approve', icon: CheckSquare, color: 'text-teal-400' },
  { id: 'export', label: 'Export', icon: Download, color: 'text-indigo-400' },
  { id: 'import', label: 'Import', icon: Upload, color: 'text-purple-400' },
];

const modulesData: Module[] = [
  {
    id: 'student_management', name: 'Student Management', icon: 'Users',
    permissions: [
      { id: 'view_profile', name: 'View Student Profile' },
      { id: 'edit_profile', name: 'Edit Student Profile' },
      { id: 'manage_enrollment', name: 'Manage Enrollment' },
      { id: 'view_documents', name: 'View Student Documents' },
    ]
  },
  {
    id: 'academics', name: 'Academics', icon: 'BookOpen',
    children: [
      {
        id: 'course_management', name: 'Course Management',
        permissions: [
          { id: 'create_course', name: 'Create New Course' },
          { id: 'assign_faculty', name: 'Assign Faculty to Course' },
        ]
      },
      {
        id: 'gradebook', name: 'Gradebook',
        permissions: [
          { id: 'enter_grades', name: 'Enter Grades' },
          { id: 'approve_grades', name: 'Approve Final Grades' },
          { id: 'generate_report_cards', name: 'Generate Report Cards' },
        ]
      },
    ]
  },
  {
    id: 'finance', name: 'Finance', icon: 'DollarSign',
    children: [
      {
        id: 'fee_management', name: 'Fee Management',
        permissions: [
          { id: 'view_fee_structure', name: 'View Fee Structure' },
          { id: 'collect_fees', name: 'Collect Fees' },
          { id: 'issue_receipts', name: 'Issue Receipts' },
          { id: 'manage_discounts', name: 'Manage Discounts & Waivers' },
        ]
      },
      {
        id: 'payroll', name: 'Payroll',
        permissions: [
          { id: 'view_salary_slips', name: 'View Salary Slips (Self)' },
          { id: 'process_payroll', name: 'Process Monthly Payroll' },
          { id: 'configure_payroll', name: 'Configure Payroll Settings' },
        ]
      },
    ]
  },
  {
    id: 'human_resources', name: 'Human Resources', icon: 'Briefcase',
    permissions: [
      { id: 'manage_staff_profiles', name: 'Manage Staff Profiles' },
      { id: 'track_leave', name: 'Track Leave Applications' },
      { id: 'approve_leave', name: 'Approve Leave Applications' },
    ]
  }
];

// Generates a mock permission set for a role
const generatePermissions = (role: Role): PermissionState => {
  const permissions: PermissionState = {};
  const traverse = (items: Module[]) => {
    items.forEach(item => {
      if (item.permissions) {
        item.permissions.forEach(p => {
          permissions[p.id] = {};
          permissionTypes.forEach(pt => {
            // Simulate some logic for default permissions
            if (role.name === 'Super Administrator') {
              permissions[p.id][pt.id] = { enabled: true };
            } else {
              permissions[p.id][pt.id] = { enabled: Math.random() > 0.7 };
            }
          });
        });
      }
      if (item.children) {
        traverse(item.children);
      }
    });
  };
  traverse(modulesData);
  return permissions;
};


// --- HELPER COMPONENTS --- //
type IconProps = { name: string; className?: string };

const Icon: FC<IconProps> = ({ name, className }) => {
  const icons: { [key: string]: FC<LucideProps> | FC<{ className?: string }> } = {
    ChevronRight, ChevronsRight, Search, Clock, Shield, AlertTriangle, Copy, CheckCircle, XCircle,
    Settings, MoreVertical, PlusCircle, BarChart2, Rewind, Eye, Edit, Trash2, Plus, Upload, Download,
    CheckSquare, Layers, Filter, Palette, Save, LogOut,
    Users: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    BookOpen: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
    DollarSign: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    Briefcase: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  };
  const LucideIcon = icons[name] as FC<LucideProps>;
  return LucideIcon ? <LucideIcon className={className} /> : null;
};

const Tooltip: FC<{ text: string; children: ReactNode }> = ({ text, children }) => (
  <div className="relative group flex items-center">
    {children}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 shadow-lg">
      {text}
      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
    </div>
  </div>
);


// --- MAIN COMPONENTS --- //
interface RoleSidebarProps {
  roles: Role[];
  selectedRole: Role | null;
  setSelectedRole: Dispatch<SetStateAction<Role | null>>;
  onAddNewRole: () => void;
}

const RoleSidebar: FC<RoleSidebarProps> = ({ roles, selectedRole, setSelectedRole, onAddNewRole }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoles = useMemo(() =>
    roles.filter(role => role.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [roles, searchTerm]
  );

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-800/50 border-r border-gray-700/50 flex-col hidden sm:flex">
      <div className="p-4 border-b border-gray-700/50">
        <h2 className="text-lg font-semibold text-white">Roles</h2>
        <p className="text-sm text-gray-400">{roles.length} total roles</p>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search roles..."
            className="w-full bg-gray-900/70 border border-gray-700 rounded-md pl-9 pr-3 py-2 text-sm text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {filteredRoles.map(role => (
          <div
            key={role.id}
            onClick={() => setSelectedRole(role)}
            className={`p-4 cursor-pointer border-l-4 ${selectedRole?.id === role.id ? 'bg-blue-500/10 border-blue-500' : 'border-transparent hover:bg-gray-700/30'}`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-white">{role.name}</h3>
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">{role.userCount} users</span>
            </div>
            <p className="text-sm text-gray-400 mt-1 truncate">{role.description}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700/50">
        <button
          onClick={onAddNewRole}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          <PlusCircle size={18} />
          Add New Role
        </button>
      </div>
    </aside>
  );
};

interface PermissionControlProps {
  permissionId: string;
  permissionStatus: { [key: string]: PermissionStatus };
  onPermissionChange: (permissionId: string, type: string, newStatus: PermissionStatus) => void;
}

const PermissionControl: FC<PermissionControlProps> = ({ permissionId, permissionStatus, onPermissionChange }) => {
  const handleToggle = (type: string) => {
    const currentStatus = permissionStatus[type] || { enabled: false };
    onPermissionChange(permissionId, type, { ...currentStatus, enabled: !currentStatus.enabled });

    if (type === 'edit' && !currentStatus.enabled && !permissionStatus.view?.enabled) {
      onPermissionChange(permissionId, 'view', { enabled: true });
    }
  };

  return (
    <div className="flex items-center justify-end space-x-1">
      {permissionTypes.map(pt => {
        const status = permissionStatus[pt.id] || {};
        const { enabled, timeBound, conditional } = status;
        const IconComponent = pt.icon;

        return (
          <Tooltip key={pt.id} text={pt.label}>
            <div className="relative">
              <button
                onClick={() => handleToggle(pt.id)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 ${enabled ? `${pt.color} bg-gray-600/50` : 'text-gray-500 hover:bg-gray-700/50'}`}
              >
                <IconComponent size={18} />
              </button>
              {(timeBound || conditional) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-700 flex items-center justify-center">
                  {timeBound && <Clock size={8} className="text-white" />}
                  {conditional && <Shield size={8} className="text-white" />}
                </div>
              )}
            </div>
          </Tooltip>
        );
      })}
      <Tooltip text="Advanced Settings">
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-700/50">
          <MoreVertical size={18} />
        </button>
      </Tooltip>
    </div>
  );
};

interface PermissionRowProps {
  permission: PermissionDefinition;
  level: number;
  permissionsState: PermissionState;
  onPermissionChange: (permissionId: string, type: string, newStatus: PermissionStatus) => void;
}

const PermissionRow: FC<PermissionRowProps> = ({ permission, level, permissionsState, onPermissionChange }) => {
  const permissionStatus = permissionsState[permission.id] || {};

  const strength = useMemo(() => {
    const enabledCount = Object.values(permissionStatus).filter(p => p.enabled).length;
    return (enabledCount / permissionTypes.length) * 100;
  }, [permissionStatus]);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center p-3 pl-4 border-t border-gray-700/50 hover:bg-gray-800/40">
      <div className="flex-1 flex items-center w-full mb-3 md:mb-0" style={{ paddingLeft: `${level * 24}px` }}>
        <div className="w-full md:w-1/2">
          <p className="text-sm text-gray-300">{permission.name}</p>
          {permission.id === 'edit_profile' && (
            <div className="flex items-center mt-1 text-xs text-yellow-500">
              <AlertTriangle size={14} className="mr-1.5" />
              <span>Depends on: View Student Profile</span>
            </div>
          )}
        </div>
        <div className="hidden lg:flex w-1/2 px-4 items-center">
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-teal-400 h-2.5 rounded-full"
              style={{ width: `${strength}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto flex justify-start md:justify-end" style={{ paddingLeft: level > 0 ? `${level * 24}px` : '0' }}>
        <PermissionControl
          permissionId={permission.id}
          permissionStatus={permissionStatus}
          onPermissionChange={onPermissionChange}
        />
      </div>
    </div>
  );
};

interface ModuleSectionProps {
  module: Module;
  level: number;
  permissionsState: PermissionState;
  onPermissionChange: (permissionId: string, type: string, newStatus: PermissionStatus) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ModuleSection: FC<ModuleSectionProps> = ({ module, level, permissionsState, onPermissionChange, isOpen, onToggle }) => {

  const handleBulkToggle = (permissionType: string, enabled: boolean) => {
    const allPermissionIds: string[] = [];
    const gatherIds = (mod: Module) => {
      if (mod.permissions) mod.permissions.forEach(p => allPermissionIds.push(p.id));
      if (mod.children) mod.children.forEach(gatherIds);
    };
    gatherIds(module);

    allPermissionIds.forEach(pid => {
      onPermissionChange(pid, permissionType, { enabled });
    });
  };

  const countTotalPermissions = useCallback((mod: Module): number => {
    let count = mod.permissions?.length || 0;
    if (mod.children) {
      count += mod.children.reduce((acc, child) => acc + countTotalPermissions(child), 0);
    }
    return count;
  }, []);

  const countEnabledPermissions = useCallback((mod: Module): number => {
    let count = 0;
    const permissionIds: string[] = [];
    const gatherIds = (m: Module) => {
      if (m.permissions) m.permissions.forEach(p => permissionIds.push(p.id));
      if (m.children) m.children.forEach(gatherIds);
    };
    gatherIds(mod);

    permissionIds.forEach(pid => {
      if (permissionsState[pid]) {
        count += Object.values(permissionsState[pid]).filter(p => p.enabled).length;
      }
    });
    return count;
  }, [permissionsState]);

  const totalPermissions = useMemo(() => countTotalPermissions(module), [module, countTotalPermissions]);
  const enabledPermissions = useMemo(() => countEnabledPermissions(module), [module, permissionsState, countEnabledPermissions]);
  const maxPossibleEnabled = totalPermissions * permissionTypes.length;
  const progress = maxPossibleEnabled > 0 ? (enabledPermissions / maxPossibleEnabled) * 100 : 0;

  return (
    <div className="bg-gray-800/30 rounded-lg mb-2 overflow-hidden border border-gray-700/50 transition-all duration-300">
      <div
        className="flex items-center p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex-1 flex items-center">
          <ChevronRight className={`w-5 h-5 mr-3 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
          <Icon name={module.icon} className="w-6 h-6 mr-3 text-blue-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">{module.name}</h3>
            <p className="text-xs text-gray-400">{totalPermissions} permissions</p>
          </div>
        </div>
        <div className="hidden lg:flex items-center w-1/4 px-4">
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="hidden xl:block text-sm text-gray-400 w-1/4 text-right pr-4">
          {enabledPermissions} / {maxPossibleEnabled} permissions enabled
        </div>
      </div>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <div className="bg-gray-900/30">
          <div className="flex flex-col md:flex-row items-start md:items-center p-3 pl-12 border-t border-gray-700/50">
            <div className="w-full md:w-1/2">
              <p className="text-sm font-semibold text-gray-400">Permission Name</p>
            </div>
            <div className="hidden lg:block w-1/4 px-4">
              <p className="text-sm font-semibold text-gray-400">Strength</p>
            </div>
            <div className="w-full md:w-auto flex flex-wrap justify-start md:justify-end gap-2 mt-2 md:mt-0">
              {permissionTypes.map(pt => (
                <Tooltip key={pt.id} text={`Toggle all '${pt.label}'`}>
                  <div className="flex flex-col items-center">
                    <span className={`text-xs ${pt.color} font-mono hidden sm:inline-block`}>{pt.label}</span>
                    <div className="flex gap-1 mt-1">
                      <button onClick={() => handleBulkToggle(pt.id, true)} className="p-1 rounded-md bg-gray-700 hover:bg-green-500/50"><CheckCircle size={14} className="text-gray-400" /></button>
                      <button onClick={() => handleBulkToggle(pt.id, false)} className="p-1 rounded-md bg-gray-700 hover:bg-red-500/50"><XCircle size={14} className="text-gray-400" /></button>
                    </div>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
          {module.permissions?.map(p => (
            <PermissionRow
              key={p.id}
              permission={p}
              level={level + 1}
              permissionsState={permissionsState}
              onPermissionChange={onPermissionChange}
            />
          ))}
          {module.children?.map(childModule => (
            <div key={childModule.id} className="pl-6 border-t border-gray-700/50 pt-2 mt-2">
              <h4 className="text-md font-semibold text-gray-200 p-3">{childModule.name}</h4>
              {childModule.permissions?.map(p => (
                <PermissionRow
                  key={p.id}
                  permission={p}
                  level={level + 2}
                  permissionsState={permissionsState}
                  onPermissionChange={onPermissionChange}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface HeatmapViewProps {
  modules: Module[];
  permissionsState: PermissionState;
}

const HeatmapView: FC<HeatmapViewProps> = ({ modules, permissionsState }) => {
  return (
    <div className="bg-gray-800/30 rounded-lg border border-gray-700/50">
      <div className="p-4 flex items-center sticky top-0 bg-gray-800/80 backdrop-blur-sm z-10">
        <div className="w-1/3 font-semibold text-white">Permission</div>
        <div className="flex-1 grid grid-cols-7 text-center">
          {permissionTypes.map(pt => (
            <Tooltip key={pt.id} text={pt.label}>
              <div className="flex justify-center">
                <pt.icon size={18} className={pt.color} />
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="overflow-y-auto">
        {modules.map(module => (
          <div key={module.id}>
            <h3 className="p-3 bg-gray-900/40 text-md font-semibold text-blue-300">{module.name}</h3>
            {module.permissions?.map(p => (
              <div key={p.id} className="flex items-center p-3 border-t border-gray-700/50 hover:bg-gray-800/40">
                <div className="w-1/3 text-sm text-gray-300">{p.name}</div>
                <div className="flex-1 grid grid-cols-7 text-center">
                  {permissionTypes.map(pt => {
                    const isEnabled = permissionsState[p.id]?.[pt.id]?.enabled;
                    return (
                      <div key={pt.id} className="flex justify-center">
                        <div className={`w-5 h-5 rounded ${isEnabled ? 'bg-green-500' : 'bg-gray-600/50'}`}></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {module.children?.map(childModule => (
              <div key={childModule.id}>
                <h4 className="p-3 pl-8 bg-gray-900/20 text-sm font-semibold text-gray-200">{childModule.name}</h4>
                {childModule.permissions?.map(p => (
                  <div key={p.id} className="flex items-center p-3 pl-8 border-t border-gray-700/50 hover:bg-gray-800/40">
                    <div className="w-1/3 text-sm text-gray-300">{p.name}</div>
                    <div className="flex-1 grid grid-cols-7 text-center">
                      {permissionTypes.map(pt => {
                        const isEnabled = permissionsState[p.id]?.[pt.id]?.enabled;
                        return (
                          <div key={pt.id} className="flex justify-center">
                            <div className={`w-5 h-5 rounded ${isEnabled ? 'bg-green-500' : 'bg-gray-600/50'}`}></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

interface FilterBarProps {
  filterText: string;
  setFilterText: Dispatch<SetStateAction<string>>;
  activeFilters: string[];
  setActiveFilters: Dispatch<SetStateAction<string[]>>;
}

const FilterBar: FC<FilterBarProps> = ({ filterText, setFilterText, activeFilters, setActiveFilters }) => {
  const toggleFilter = (permissionTypeId: string) => {
    setActiveFilters(prev =>
      prev.includes(permissionTypeId)
        ? prev.filter(id => id !== permissionTypeId)
        : [...prev, permissionTypeId]
    );
  };

  return (
    <div className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 flex flex-col sm:flex-row items-center gap-4">
      <div className="relative w-full sm:w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Filter permissions..."
          className="w-full bg-gray-900/70 border border-gray-700 rounded-md pl-9 pr-3 py-2 text-sm text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-gray-400 mr-2">Filter by type:</span>
        {permissionTypes.map(pt => (
          <button
            key={pt.id}
            onClick={() => toggleFilter(pt.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 transition-colors ${activeFilters.includes(pt.id)
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            <pt.icon size={14} />
            {pt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

interface PermissionsMatrixProps {
  role: Role | null;
  permissions: PermissionState;
  setPermissions: Dispatch<SetStateAction<PermissionState>>;
  onSaveChanges: () => void;
}

const PermissionsMatrix: FC<PermissionsMatrixProps> = ({ role, permissions, setPermissions, onSaveChanges }) => {
  const [openModuleId, setOpenModuleId] = useState<string | null>(modulesData.length > 0 ? modulesData[0].id : null);
  const [viewMode, setViewMode] = useState<'matrix' | 'heatmap'>('matrix');
  const [filterText, setFilterText] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    if (role) {
      setOpenModuleId(modulesData.length > 0 ? modulesData[0].id : null);
    }
  }, [role]);

  const handlePermissionChange = useCallback((permissionId: string, type: string, newStatus: PermissionStatus) => {
    setPermissions(prev => ({
      ...prev,
      [permissionId]: {
        ...prev[permissionId],
        [type]: newStatus
      }
    }));
  }, [setPermissions]);

  const filteredModules = useMemo(() => {
    if (!filterText && activeFilters.length === 0) {
      return modulesData;
    }

    const lowerCaseFilterText = filterText.toLowerCase();

    const filterModule = (module: Module): Module | null => {
      let filteredChildren: Module[] = [];
      if (module.children) {
        filteredChildren = module.children
          .map(child => filterModule(child))
          .filter((child): child is Module => child !== null);
      }

      let filteredPermissions: PermissionDefinition[] = [];
      if (module.permissions) {
        filteredPermissions = module.permissions.filter(p => {
          const matchesText = p.name.toLowerCase().includes(lowerCaseFilterText);
          const permissionStatus = permissions[p.id] || {};
          const matchesFilters = activeFilters.length === 0 || activeFilters.some(filterId => permissionStatus[filterId]?.enabled);
          return matchesText && matchesFilters;
        });
      }

      if (filteredPermissions.length > 0 || filteredChildren.length > 0) {
        return { ...module, permissions: filteredPermissions, children: filteredChildren };
      }

      return null;
    };

    return modulesData
      .map(module => filterModule(module))
      .filter((module): module is Module => module !== null);
  }, [filterText, activeFilters, permissions]);

  if (!role) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-center p-4">
        <div>
          <Layers size={48} className="mx-auto" />
          <h2 className="mt-4 text-xl font-semibold">Select a Role</h2>
          <p className="mt-1 text-gray-400">Choose a role from the left panel to view and manage its permissions.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col p-4 sm:p-6 bg-gray-900 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-start mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Permissions for <span className="text-blue-400">{role.name}</span>
          </h1>
          <p className="text-gray-400 mt-1">{role.description}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'matrix' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
              Matrix
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'heatmap' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
              Heatmap
            </button>
          </div>
          <button className="p-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 border border-gray-700"><Filter size={18} /></button>
          <button
            onClick={onSaveChanges}
            className="flex items-center gap-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>

      <FilterBar
        filterText={filterText}
        setFilterText={setFilterText}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />

      {viewMode === 'matrix' ? (
        filteredModules.map(module => (
          <ModuleSection
            key={module.id}
            module={module}
            level={0}
            permissionsState={permissions}
            onPermissionChange={handlePermissionChange}
            isOpen={openModuleId === module.id}
            onToggle={() => setOpenModuleId(openModuleId === module.id ? null : module.id)}
          />
        ))
      ) : (
        <HeatmapView modules={filteredModules} permissionsState={permissions} />
      )}
    </main>
  );
};

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRole: (name: string, description: string) => void;
}

const AddRoleModal: FC<AddRoleModalProps> = ({ isOpen, onClose, onAddRole }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddRole(name.trim(), description.trim());
      setName('');
      setDescription('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-700" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Add New Role</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="role-name" className="block text-sm font-medium text-gray-300 mb-1">Role Name</label>
              <input
                type="text"
                id="role-name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-gray-900/70 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., Librarian"
                required
              />
            </div>
            <div>
              <label htmlFor="role-description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                id="role-description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full bg-gray-900/70 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Briefly describe this role's purpose"
                rows={3}
              ></textarea>
            </div>
          </div>
          <div className="p-6 bg-gray-800/50 border-t border-gray-700 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Create Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface NotificationToastProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}

const NotificationToast: FC<NotificationToastProps> = ({ message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const isSuccess = type === 'success';

  return (
    <div className={`fixed bottom-5 right-5 flex items-center gap-4 px-6 py-3 rounded-lg shadow-2xl z-50 animate-fade-in-up
            ${isSuccess ? 'bg-green-600 border-green-500' : 'bg-red-600 border-red-500'} border text-white`}>
      {isSuccess ? <CheckCircle /> : <AlertTriangle />}
      <p className="font-semibold">{message}</p>
      <button onClick={onDismiss} className="ml-4 text-white/80 hover:text-white">
        <X size={20} />
      </button>
    </div>
  );
}


// --- App --- //
const EducationalERPPermissions: FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(roles[0]);
  const [permissions, setPermissions] = useState<PermissionState>(generatePermissions(roles[0]));
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (selectedRole) {
      setPermissions(generatePermissions(selectedRole));
    }
  }, [selectedRole]);

  const handleAddRole = (name: string, description: string) => {
    const newRole: Role = {
      id: Date.now(),
      name,
      description,
      userCount: 0,
    };
    setRoles(prev => [...prev, newRole]);
    setSelectedRole(newRole);
    setIsAddRoleModalOpen(false);
    setNotification({ message: `Role '${name}' created successfully!`, type: 'success' });
  };

  const handleSaveChanges = () => {
    // Simulate an API call
    console.log("Saving permissions for role:", selectedRole?.name);
    console.log(permissions);
    setNotification({ message: 'Permissions saved successfully!', type: 'success' });
  };

  return (
    <div className="bg-gray-900 text-gray-200 font-sans flex h-screen overflow-hidden">
      <RoleSidebar
        roles={roles}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        onAddNewRole={() => setIsAddRoleModalOpen(true)}
      />
      <PermissionsMatrix
        role={selectedRole}
        permissions={permissions}
        setPermissions={setPermissions}
        onSaveChanges={handleSaveChanges}
      />
      <AddRoleModal
        isOpen={isAddRoleModalOpen}
        onClose={() => setIsAddRoleModalOpen(false)}
        onAddRole={handleAddRole}
      />
      {notification && (
        <NotificationToast
          message={notification.message}
          type={notification.type}
          onDismiss={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default EducationalERPPermissions;

