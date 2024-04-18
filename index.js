import { createRoot } from "react-dom/client";
import  App  from "./src/components/App";
import data from './src/data/static.json';
import { StrictMode } from "react";

async function deferRender(){
    const {worker} = await import('./src/mocks/browser');
    return worker.start({
        serviceWorker: {
            options: {
                url: './dist/mockServiceWorker.js',
                scope: ''
            }
        }
    });
}

const saveDataInStorage = async () => {
        const rawResponse = await fetch('api/save-document-types', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
};

deferRender().then(async ()=>{
    await saveDataInStorage();
}).then(()=>{
    const container = document.getElementById("app");
    const root = createRoot(container)
    root.render(<StrictMode>
        <App />
        </StrictMode>);
});