import { combineReducers } from 'redux';
import currentCompanyFinancial from './current_company_financial_reducer';
import currentCompanyInfo from './current_company_info_reducer';
import currentCompanyNews from './company_news_reducer'

const entitiesReducer = combineReducers({
    company: currentCompanyFinancial,
    info: currentCompanyInfo,
    news: currentCompanyNews
});

export default entitiesReducer;