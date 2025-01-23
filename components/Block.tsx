import React, { useEffect } from "react";import hljs from "highlight.js";
import "highlight.js/styles/default.css";interface IProps {
  htmlContent: string;
}const ContentPostCode = ({ htmlContent }: IProps) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [htmlContent]);  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};export default ContentPostCode;
