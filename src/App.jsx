/* eslint-disable react/prop-types */
import { useCallback, useState, useEffect } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import Result from './components/Result';

// Reusable CodeEditor component
const CodeEditor = ({ language, value, onChange }) => {
  return (
    <div className="bg-[#282c34] p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2 text-white">{language}</h2>
      <CodeMirror
        className="text-xl border-gray-700 border"
        value={value}
        height="342px"
        theme="dark"
        extensions={[language(true)]}
        onChange={onChange}
      />
    </div>
  );
};

function App() {
  // State variables to store the code for HTML, CSS, and JavaScript
  const [html_edit, setHtml_Edit] = useState('');
  const [css_edit, setCss_Edit] = useState('');
  const [js_edit, setJs_Edit] = useState('');
  const [result, setResult] = useState('');

  // Callback functions to handle code changes for HTML, CSS, and JavaScript
  const onChangeHtml = useCallback((value) => {
    console.log(value);
    setHtml_Edit(value);
  }, []);

  const onChangeCss = useCallback((value) => {
    console.log(value);
    setCss_Edit(value);
  }, []);

  const onChangeJavaScript = useCallback((value) => {
    console.log(value);
    setJs_Edit(value);
  }, []);

  // Combine HTML, CSS, and JavaScript code into a single source code
  

  // useEffect to introduce a delay before updating the result
  useEffect(() => {
    const delay = setTimeout(() => {
      const srcCode = `
    <html>
    <body>${html_edit}</body>
    <style>${css_edit}</style>
    <script>${js_edit}</script>
    </html>
  `;
      setResult(srcCode);
    }, 500); // Adjust the delay time (in milliseconds) as needed

    return () => clearTimeout(delay); // Clear the timeout on component unmount or code change
  }, [html_edit,css_edit,js_edit]);

  return (
    <div>
      <div className="p-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* Reusable CodeEditor component for HTML */}
          <CodeEditor language={html} value={html_edit} onChange={onChangeHtml} />

          {/* Reusable CodeEditor component for CSS */}
          <CodeEditor language={css} value={css_edit} onChange={onChangeCss} />

          {/* Reusable CodeEditor component for JavaScript */}
          <CodeEditor language={javascript} value={js_edit} onChange={onChangeJavaScript} />
        </div>

        {/* Live preview of the combined code with delay */}
        <Result srcCode={result} />
      </div>
    </div>
  );
}

export default App;
