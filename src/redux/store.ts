import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
// import ActivityReducer from '../activity/slice';
// import AuthReducer from '../auth/slice';
// import ChatReducer from '../company/chat/slice';
// import CompanyReducer from '../documents/slice';
// import EventReducer from '../events/slice';
// import FiscalDocumentReducer from '../fiscalDocument/slice';
// import SecuredReducer from '../keycloak/slice';
// import ObjectReducer from '../objects/slice';
// import SidebarReducer from '../sidebar/slice';

export const store = configureStore({
    reducer: {
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

