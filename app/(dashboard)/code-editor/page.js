'use client'

import React, { useEffect, useState } from 'react';
import loader from '@monaco-editor/loader';

function CodeEditor(props) {
    const [code, setCode] = useState(props.data || '');
    const [language, setLanguage] = useState(props.language || 'javascript');

    useEffect(() => {
        loader.init().then((monaco) => {
            const wrapper = document.getElementById('response');
            wrapper.style.height = '88vh';
            const properties = {
              value: code,
              language: language,
              options: editorOptions,
            };

            monaco.editor.create(wrapper, properties);

            if (props.theme === 'dark') {
                monaco.editor.setTheme('vs-dark');
            } else {
                monaco.editor.setTheme('vs-light');
            }
        });
    }, [props.theme, language, code]);

    const editorOptions = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: props.readOnly || false,
        cursorStyle: 'line',
        automaticLayout: true,
    };

    const handleChange = (newCode) => {
        setCode(newCode);
        props.setData && props.setData(newCode);
    };

    return (
        <div className='border-l-2 border-yellow-500 dark:border-yellow-800'>
            <div id='response' className='animate-fade-in-simple'></div>
        </div>
    );
}

export default CodeEditor;
