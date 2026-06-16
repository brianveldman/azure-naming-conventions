// Azure resource types with CAF abbreviations and naming rules
// Source: Microsoft Cloud Adoption Framework (CAF) abbreviation recommendations
// and Azure resource naming rules & restrictions.
const RESOURCE_TYPES = [
  // ─── General / Management ───
  { id: "rg",        name: "Resource Group",                  slug: "rg",        category: "General",      maxLen: 90,  lowercase: false, dashes: true,  pattern: /^[\w\-().]+$/,            note: "Cannot end with a period." },
  { id: "mg",        name: "Management Group",                slug: "mg",        category: "General",      maxLen: 90,  lowercase: false, dashes: true,  pattern: /^[\w\-().]+$/ },
  { id: "policy",    name: "Policy Definition",               slug: "policy",    category: "General",      maxLen: 64,  lowercase: false, dashes: true,  pattern: /^[^<>*%&:\\?+/]+$/ },
  { id: "ssimp",     name: "Service / API Connection",        slug: "con",       category: "General",      maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },

  // ─── Compute ───
  { id: "vm",        name: "Virtual Machine (Windows)",       slug: "vm",        category: "Compute",       maxLen: 15,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/,         note: "Windows: max 15 characters. Linux: max 64." },
  { id: "vmlinux",   name: "Virtual Machine (Linux)",         slug: "vm",        category: "Compute",       maxLen: 64,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/ },
  { id: "vmss",      name: "VM Scale Set",                    slug: "vmss",      category: "Compute",       maxLen: 64,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/ },
  { id: "avail",     name: "Availability Set",                slug: "avail",     category: "Compute",       maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "disk",      name: "Managed Disk (OS)",               slug: "osdisk",    category: "Compute",       maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "datadisk",  name: "Managed Disk (Data)",             slug: "disk",      category: "Compute",       maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "aks",       name: "AKS Cluster",                     slug: "aks",       category: "Compute",       maxLen: 63,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-_]+$/ },
  { id: "aksnp",     name: "AKS Node Pool",                   slug: "np",        category: "Compute",       maxLen: 12,  lowercase: true,  dashes: false, pattern: /^[a-z][a-z0-9]*$/,        note: "Lowercase letters and numbers only, must start with a letter." },
  { id: "aca",       name: "Container App",                   slug: "ca",        category: "Compute",       maxLen: 32,  lowercase: true,  dashes: true,  pattern: /^[a-z][a-z0-9-]*[a-z0-9]$/ },
  { id: "cae",       name: "Container Apps Environment",      slug: "cae",       category: "Compute",       maxLen: 60,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/ },
  { id: "aci",       name: "Container Instance",              slug: "ci",        category: "Compute",       maxLen: 63,  lowercase: true,  dashes: true,  pattern: /^[a-z][a-z0-9-]*[a-z0-9]$/ },
  { id: "acr",       name: "Container Registry",              slug: "cr",        category: "Compute",       maxLen: 50,  lowercase: true,  dashes: false, pattern: /^[a-zA-Z0-9]+$/,          note: "Alphanumeric only, no hyphens. Globally unique." },
  { id: "func",      name: "Function App",                    slug: "func",      category: "Compute",       maxLen: 60,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/,         note: "Globally unique (part of *.azurewebsites.net)." },
  { id: "app",       name: "App Service (Web App)",           slug: "app",       category: "Compute",       maxLen: 60,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/,         note: "Globally unique (part of *.azurewebsites.net)." },
  { id: "asp",       name: "App Service Plan",                slug: "asp",       category: "Compute",       maxLen: 60,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/ },
  { id: "ase",       name: "App Service Environment",         slug: "ase",       category: "Compute",       maxLen: 36,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/ },

  // ─── Networking ───
  { id: "vnet",      name: "Virtual Network",                 slug: "vnet",      category: "Networking",    maxLen: 64,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "snet",      name: "Subnet",                          slug: "snet",      category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "nic",       name: "Network Interface (NIC)",         slug: "nic",       category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "nsg",       name: "Network Security Group",          slug: "nsg",       category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "pip",       name: "Public IP Address",               slug: "pip",       category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "lb",        name: "Load Balancer (internal)",          slug: "lbi",       category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "lbe",       name: "Load Balancer (external)",          slug: "lbe",       category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "agw",       name: "Application Gateway",             slug: "agw",       category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "afw",       name: "Azure Firewall",                  slug: "afw",       category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "afwp",      name: "Firewall Policy",                 slug: "afwp",      category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "bas",       name: "Azure Bastion",                   slug: "bas",       category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "vgw",       name: "Virtual Network Gateway",         slug: "vgw",       category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "lgw",       name: "Local Network Gateway",           slug: "lgw",       category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "erc",       name: "ExpressRoute Circuit",            slug: "erc",       category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "rt",        name: "Route Table",                     slug: "rt",        category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "pep",       name: "Private Endpoint",                slug: "pep",       category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "pl",        name: "Private Link Service",            slug: "pl",        category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "dnsz",      name: "DNS Zone (private)",                slug: "pdnsz",     category: "Networking",    maxLen: 63,  lowercase: true,  dashes: true,  pattern: /^[a-z0-9.-]+$/,           note: "Usually a domain name, e.g. privatelink.blob.core.windows.net." },
  { id: "fd",        name: "Front Door Profile",              slug: "afd",       category: "Networking",    maxLen: 64,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/ },
  { id: "cdn",       name: "CDN Profile",                     slug: "cdnp",      category: "Networking",    maxLen: 260, lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/ },
  { id: "tm",        name: "Traffic Manager Profile",         slug: "traf",      category: "Networking",    maxLen: 63,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/,         note: "Globally unique (part of *.trafficmanager.net)." },
  { id: "nwc",       name: "Network Watcher",                 slug: "nw",        category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "natgw",     name: "NAT Gateway",                     slug: "ng",        category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "vwan",      name: "Virtual WAN",                     slug: "vwan",      category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "vhub",      name: "Virtual Hub",                     slug: "vhub",      category: "Networking",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },

  // ─── Storage & Data ───
  { id: "st",        name: "Storage Account",                 slug: "st",        category: "Storage & Data", maxLen: 24, lowercase: true,  dashes: false, pattern: /^[a-z0-9]+$/,             note: "Lowercase letters and numbers only, no hyphens. Globally unique." },
  { id: "sqlsrv",    name: "SQL Server (logical)",            slug: "sql",       category: "Storage & Data", maxLen: 63, lowercase: true,  dashes: true,  pattern: /^[a-z0-9-]+$/,            note: "Globally unique." },
  { id: "sqldb",     name: "SQL Database",                    slug: "sqldb",     category: "Storage & Data", maxLen: 128, lowercase: false, dashes: true, pattern: /^[^<>*%&:\\/?]+$/ },
  { id: "sqlmi",     name: "SQL Managed Instance",            slug: "sqlmi",     category: "Storage & Data", maxLen: 63, lowercase: true,  dashes: true,  pattern: /^[a-z0-9-]+$/ },
  { id: "cosmos",    name: "Cosmos DB Account",               slug: "cosmos",    category: "Storage & Data", maxLen: 44, lowercase: true,  dashes: true,  pattern: /^[a-z0-9-]+$/,            note: "Globally unique." },
  { id: "psql",      name: "PostgreSQL Flexible Server",      slug: "psql",      category: "Storage & Data", maxLen: 63, lowercase: true,  dashes: true,  pattern: /^[a-z0-9-]+$/,            note: "Globally unique." },
  { id: "mysql",     name: "MySQL Flexible Server",           slug: "mysql",     category: "Storage & Data", maxLen: 63, lowercase: true,  dashes: true,  pattern: /^[a-z0-9-]+$/,            note: "Globally unique." },
  { id: "redis",     name: "Cache for Redis",                 slug: "redis",     category: "Storage & Data", maxLen: 63, lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/,         note: "Globally unique." },
  { id: "dls",       name: "Data Lake Storage (Gen2)",        slug: "dls",       category: "Storage & Data", maxLen: 24, lowercase: true,  dashes: false, pattern: /^[a-z0-9]+$/,             note: "Same rules as Storage Account." },
  { id: "adf",       name: "Data Factory",                    slug: "adf",       category: "Storage & Data", maxLen: 63, lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/,         note: "Globally unique." },
  { id: "synw",      name: "Synapse Workspace",               slug: "synw",      category: "Storage & Data", maxLen: 50, lowercase: true,  dashes: true,  pattern: /^[a-z0-9-]+$/,            note: "Globally unique." },
  { id: "dbw",       name: "Databricks Workspace",            slug: "dbw",       category: "Storage & Data", maxLen: 64, lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },

  // ─── Integration & Messaging ───
  { id: "sb",        name: "Service Bus Namespace",           slug: "sbns",      category: "Integration",    maxLen: 50,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z][a-zA-Z0-9-]*$/, note: "Globally unique, must start with a letter." },
  { id: "evh",       name: "Event Hubs Namespace",            slug: "evhns",     category: "Integration",    maxLen: 50,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z][a-zA-Z0-9-]*$/, note: "Globally unique." },
  { id: "evgt",      name: "Event Grid Topic",                slug: "evgt",      category: "Integration",    maxLen: 50,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z0-9-]+$/ },
  { id: "logic",     name: "Logic App",                       slug: "logic",     category: "Integration",    maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.()]+$/ },
  { id: "apim",      name: "API Management",                  slug: "apim",      category: "Integration",    maxLen: 50,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z][a-zA-Z0-9-]*$/, note: "Globally unique, must start with a letter." },

  // ─── Security & Identity ───
  { id: "kv",        name: "Key Vault",                       slug: "kv",        category: "Security",      maxLen: 24,  lowercase: false, dashes: true,  pattern: /^[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/, note: "Globally unique, max 24 characters, must start with a letter, no consecutive hyphens." },
  { id: "id",        name: "Managed Identity (user-assigned)", slug: "id",       category: "Security",      maxLen: 128, lowercase: false, dashes: true,  pattern: /^[\w-]+$/ },
  { id: "dcr",       name: "Disk Encryption Set",             slug: "des",       category: "Security",      maxLen: 80,  lowercase: false, dashes: true,  pattern: /^[\w\-.]+$/ },
  { id: "waf",       name: "WAF Policy",                      slug: "waf",       category: "Security",      maxLen: 128, lowercase: false, dashes: false, pattern: /^[a-zA-Z][a-zA-Z0-9]*$/,  note: "Letters and numbers only, must start with a letter." },

  // ─── Monitoring & AI ───
  { id: "log",       name: "Log Analytics Workspace",         slug: "log",       category: "Monitoring & AI", maxLen: 63, lowercase: false, dashes: true, pattern: /^[a-zA-Z0-9-]+$/,         note: "Must start and end with an alphanumeric character." },
  { id: "appi",      name: "Application Insights",            slug: "appi",      category: "Monitoring & AI", maxLen: 255, lowercase: false, dashes: true, pattern: /^[^%&\\?/]+$/ },
  { id: "ag",        name: "Action Group",                    slug: "ag",        category: "Monitoring & AI", maxLen: 260, lowercase: false, dashes: true, pattern: /^[^%&\\?/]+$/ },
  { id: "dce",       name: "Data Collection Endpoint",        slug: "dce",       category: "Monitoring & AI", maxLen: 44, lowercase: false, dashes: true, pattern: /^[a-zA-Z0-9-]+$/ },
  { id: "oai",       name: "Azure OpenAI Service",            slug: "oai",       category: "Monitoring & AI", maxLen: 64, lowercase: false, dashes: true, pattern: /^[a-zA-Z0-9-]+$/,          note: "Globally unique." },
  { id: "cog",       name: "AI Services (Cognitive)",         slug: "ais",       category: "Monitoring & AI", maxLen: 64, lowercase: false, dashes: true, pattern: /^[a-zA-Z0-9-]+$/ },
  { id: "srch",      name: "AI Search",                       slug: "srch",      category: "Monitoring & AI", maxLen: 60, lowercase: true,  dashes: true, pattern: /^[a-z0-9-]+$/,             note: "Globally unique, lowercase only." },
  { id: "mlw",       name: "Machine Learning Workspace",      slug: "mlw",       category: "Monitoring & AI", maxLen: 33, lowercase: false, dashes: true, pattern: /^[a-zA-Z0-9-]+$/ },
];

const ENVIRONMENTS = [
  { id: "prod", label: "Production (prod)" },
  { id: "acc",  label: "Acceptance (acc)" },
  { id: "test", label: "Test (test)" },
  { id: "dev",  label: "Development (dev)" },
  { id: "stg",  label: "Staging (stg)" },
  { id: "shared", label: "Shared (shared)" },
  { id: "sbx",  label: "Sandbox (sbx)" },
];

const REGIONS = [
  { id: "weu",  label: "West Europe (weu)" },
  { id: "neu",  label: "North Europe (neu)" },
  { id: "swc",  label: "Sweden Central (swc)" },
  { id: "gwc",  label: "Germany West Central (gwc)" },
  { id: "frc",  label: "France Central (frc)" },
  { id: "uks",  label: "UK South (uks)" },
  { id: "eus",  label: "East US (eus)" },
  { id: "eus2", label: "East US 2 (eus2)" },
  { id: "wus2", label: "West US 2 (wus2)" },
  { id: "sea",  label: "Southeast Asia (sea)" },
  { id: "",     label: "— no region —" },
];
