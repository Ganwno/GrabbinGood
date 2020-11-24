import { combineReducers } from 'redux';
import currentCompanyFinancial from './current_company_financial_reducer';
import currentCompanyInfo from './current_company_info_reducer';

const entitiesReducer = combineReducers({
    company: currentCompanyFinancial,
    info: currentCompanyInfo
});

export default entitiesReducer;