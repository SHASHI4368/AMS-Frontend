import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./index.css"
import { registerLicense } from "@syncfusion/ej2-base";

// Registering Syncfusion license key
registerLicense(
  "ORg4AjUWIQA/Gnt2U1hhQlJBfVhdXGFWfFN0QXNRdV90flBCcC0sT3RfQFljT39Rdk1iXH5Zcn1VQQ=="
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

