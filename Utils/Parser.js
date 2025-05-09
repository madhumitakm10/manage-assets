import React from 'react';
import parse from 'html-react-parser';
import MathJax from './MathjaxParser';

const Parser = ({ mString }) => {
    const iparser = new DOMParser();
    const parsedHtml = iparser.parseFromString(mString, 'text/html');
    const itemsArray = [];
    if (!parsedHtml || !parsedHtml.body) return null;

    parsedHtml.body.childNodes.forEach(item => {
        let type = 'normal';
        if (!item.outerHTML) return;
        if (item.outerHTML.includes('xmlns="http://www.w3.org/1998/Math/MathML')) {
            type = 'math';
        }
        itemsArray.push({ type, html: item.outerHTML });
    });

    return (
        <div className="cursor-pointer">
            {itemsArray.map((item, index) =>
                item.type === 'math' ? (
                    <MathJax key={index} mString={item.html} />
                ) : (
                    <div key={index}>{parse(item.html)}</div>
                )
            )}
        </div>
    );
};

export default Parser;