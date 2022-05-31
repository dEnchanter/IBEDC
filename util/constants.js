export const TableManagerType = {
  UPDATE_DATASOURCE: "UPDATE_DATASOURCE",
  UPDATE_PAGINATION_CONTROLS: "UPDATE_PAGINATION_CONTROLS",
  SET_DATA_AND_COUNT: "SET_DATA_AND_COUNT",
};

export const Baseurl = "http://tms.fetswallet.com:3000" // Production
//export const Baseurl = "http://localhost:3001" // Test

export const MiddlewareBaseUrl = "https://fetspay.fetswallet.com/rest"

export const Endpoint = {
  FETCH_USERS: "user-data/fetch-users",
  FETCH_ACQUIRERS: "terminals/acquirer/fetch",
  FETCH_MERCHANT_DATA: "terminals/merchants/fetch-merchant-data?merchantType=merchant&",
  FETCH_AGENT_DATA: "terminals/merchants/fetch-merchant-data?merchantType=agent&",
  FETCH_ALL_MERCHANTS_DATA: "terminals/merchants/fetch-merchant-data",
  FETCH_MANAGERS: "terminals/managers/fetch",
  FETCH_TERMINALS: "terminals/fetch/all",
  FETCH_LOADED_TERMINALS: "terminals/fetch/loaded-terminals",
  FETCH_TERMINAL_OWNERS: "terminals/terminal-ownership/fetch",
  FETCH_TERMINAL_GROUPS: "terminals/terminal-group/fetch",

  FETCH_TERMINAL_TYPES: "utils/get-terminaltypes",

  FETCH_TRANSACTION_DETAIL: "transactions/card-data/fetch-details",
  FETCH_TRANSACTION_COMISSION_DETAIL: "transactions/card-data/fetch-commission-details",
  FETCH_ALL_TRANSCTION_SUMMARY: "transactions/card-data/fetch-summary/all",
  FETCH_SUCCESSFUL_TRANSCTION_SUMMARY:
    "transactions/card-data/fetch-summary/successful",
  FETCH_FAILED_TRANSCTION_SUMMARY:
    "transactions/card-data/fetch-summary/failed",
  FETCH_PENDING_TRANSCTION_SUMMARY:
    "transactions/card-data/fetch-summary/pending",
  FETCH_PENDING_TRANSCTION_SUMMARY:
    "transactions/card-data/fetch-summary/pending",

  FETCH_SETTLEMENT_DETAIL: "settlement/fetch-details",
  FETCH_ALL_SETTLEMENT_SUMMARY: "settlement/fetch-summary/all",
  FETCH_SUCCESSFUL_SETTLEMENT_SUMMARY: "settlement/fetch-summary/successful",
  FETCH_FAILED_SETTLEMENT_SUMMARY: "settlement/fetch-summary/failed",
  FETCH_PENDING_SETTLEMENT_SUMMARY: "settlement/fetch-summary/pending",

  FETCH_VAS_DETAIL: "vas/fetch-details",
  FETCH_ALL_VAS_SUMMARY: "vas/fetch-summary/all",
  FETCH_SUCCESSFUL_VAS_SUMMARY: "vas/fetch-summary/successful",
  FETCH_FAILED_VAS_SUMMARY: "vas/fetch-summary/failed",
  FETCH_PENDING_VAS_SUMMARY: "vas/fetch-summary/pending",

  FETCH_TERMINAL_ACTIVITY: "terminals/terminal-activity",
  FETCH_COMMISSION_SUMMARY: "transactions/card-data/fetch-commission",
  FETCH_DASHBOARD_BANK_SUMMARY: "dashboard/summary/banks",
  FETCH_DASHBOARD_REGION_SUMMARY: "dashboard/summary/regions",
  FETCH_ERROR_ANALYSIS: "dashboard/error/analysis",
  FETCH_CARD_SCHEME_PERFORMANCE: "dashboard/cardscheme-performance",
  FETCH_DASHBOARD_SUMMARY: "dashboard/summary",
  FETCH_HOST: "utils/get-hosts",

  FETCH_AUDIT_LOGS: "get-auditlogs",
};
