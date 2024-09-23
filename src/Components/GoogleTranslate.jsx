import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Dynamically create the script element
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;

    // Append the script to the document body
    document.body.appendChild(addScript);

    // Clean up: remove the script tag when the component is unmounted
    return () => {
      document.body.removeChild(addScript);
    };
  }, []);

  // The callback function that will be called when the Google Translate script is loaded
  window.googleTranslateElementInit = () => {
    try {
      // Use 'window.google.translate.TranslateElement' instead of 'google.translate.TranslateElement'
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          // includedLanguages: 'en,ms,ta,zh-CN', // include this for selected languages
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    } catch (error) {
      // You can handle specific types of errors differently if needed
      console.error("Error initializing Google Translate:", error);
    }
  };

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
