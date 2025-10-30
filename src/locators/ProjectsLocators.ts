export const ProjectsLocators = {
  // Projects List Page
  searchInput: 'input[placeholder="Search by project name"]',
  newProjectButton: 'a[href="/projects/new"]',
  projectsTable: 'table',
  projectLink: (projectName: string) => `a:has-text("${projectName}")`,
  
  // Create/Edit Project Form
  projectNameInput: 'input#project_name, textbox[id*="name"]',
  projectDescriptionInput: '.ck-editor__editable',
  createButton: 'button:has-text("Create")',
  updateDetailsButton: 'button:has-text("Update details")',
  cancelButton: 'a:has-text("Cancel")',
  
  // Project Settings Page
  projectStatusButton: 'button:has-text("Edit project status")',
  projectStatusDescription: 'textbox[aria-label="Project status description"]',
  updateStatusButton: 'button:has-text("Update status description")',
  makePrivateLink: 'a:has-text("Make private")',
  
  // Project Details/Overview Page
  projectHeading: 'h2',
  breadcrumb: 'nav[aria-label="Breadcrumb"]',
  menuButton: 'button:has-text("Menu")',
  
  // Validation/Error Messages
  errorMessage: '.errorExplanation, .flash.error, [class*="error-message"]',
  successMessage: '.flash.notice, [class*="success"]',
};

