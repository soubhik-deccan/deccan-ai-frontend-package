// import { basicSetup } from "@codemirror/basic-setup";
// import { json } from "@codemirror/lang-json";
// import { EditorState } from "@codemirror/state";
// import { EditorView, keymap } from "@codemirror/view";
// import {
//   ArrowCounterClockwise,
//   CaretDown,
//   CheckCircle,
//   Copy,
//   Download,
//   MagicWand,
//   WarningCircle,
// } from "@phosphor-icons/react";
// import React, { useEffect, useRef, useState } from "react";
// import PButton from "../PButton";

// interface JsonEditorProps {
//   value?: string;
//   defaultValue?: string;
//   onChange?: (value: string) => void;
//   onValidChange?: (isValid: boolean) => void;
//   readOnly?: boolean;
//   height?: string;
//   className?: string;
// }

// const JsonEditor: React.FC<JsonEditorProps> = ({
//   value,
//   defaultValue = "",
//   onChange,
//   onValidChange,
//   readOnly = false,
//   height = "400px",
//   className = "",
// }) => {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const viewRef = useRef<EditorView | null>(null);
//   const [isValid, setIsValid] = useState(true);
//   const [isCopied, setIsCopied] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

//   const beautifyOptions = {
//     default: (json: string) => JSON.stringify(JSON.parse(json), null, 2),
//     minified: (json: string) => JSON.stringify(JSON.parse(json)),
//     compact: (json: string) => JSON.stringify(JSON.parse(json), null, 1),
//     spaced: (json: string) => JSON.stringify(JSON.parse(json), null, 4),
//   };

//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       activeDropdown &&
//       !(event.target as Element).closest(".json-editor__dropdown")
//     ) {
//       setActiveDropdown(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [activeDropdown]);

//   const toggleDropdown = (dropdownName: string) => {
//     setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
//   };

//   const applyBeautification = (style: keyof typeof beautifyOptions) => {
//     if (!viewRef.current) return;

//     try {
//       const currentValue = viewRef.current.state.doc.toString();
//       const beautified = beautifyOptions[style](currentValue);

//       viewRef.current.dispatch({
//         changes: {
//           from: 0,
//           to: viewRef.current.state.doc.length,
//           insert: beautified,
//         },
//       });
//       setActiveDropdown(null);
//     } catch (e) {
//       console.warn("Invalid JSON - unable to beautify");
//     }
//   };

//   const copyFunctions = {
//     formatted: async () => {
//       if (!viewRef.current) return;
//       const content = beautifyOptions.default(
//         viewRef.current.state.doc.toString()
//       );
//       await navigator.clipboard.writeText(content);
//     },
//     minified: async () => {
//       if (!viewRef.current) return;
//       const content = beautifyOptions.minified(
//         viewRef.current.state.doc.toString()
//       );
//       await navigator.clipboard.writeText(content);
//     },
//     download: () => {
//       if (!viewRef.current) return;
//       const content = viewRef.current.state.doc.toString();
//       const blob = new Blob([content], { type: "application/json" });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "data.json";
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     },
//   };

//   const handleCopy = async (type: keyof typeof copyFunctions) => {
//     try {
//       await copyFunctions[type]();
//       setIsCopied(true);
//       setTimeout(() => setIsCopied(false), 2000);
//       setActiveDropdown(null);
//     } catch (e) {
//       console.error("Copy failed:", e);
//     }
//   };

//   const validateJson = (content: string) => {
//     try {
//       JSON.parse(content);
//       setIsValid(true);
//       onValidChange?.(true);
//       return true;
//     } catch (e) {
//       setIsValid(false);
//       onValidChange?.(false);
//       return false;
//     }
//   };

//   const resetContent = () => {
//     if (!viewRef.current) return;
//     viewRef.current.dispatch({
//       changes: {
//         from: 0,
//         to: viewRef.current.state.doc.length,
//         insert: defaultValue,
//       },
//     });
//   };

//   useEffect(() => {
//     if (!editorRef.current) return;

//     const startState = EditorState.create({
//       doc: value ?? defaultValue,
//       extensions: [
//         basicSetup,
//         json(),
//         EditorView.theme({
//           "&": { height },
//           ".cm-content": { fontFamily: "monospace" },
//           ".cm-line": { padding: "0 4px" },
//           "&.cm-focused": { outline: "none" },
//         }),
//         EditorView.updateListener.of((update) => {
//           if (update.docChanged) {
//             const content = update.state.doc.toString();
//             validateJson(content);
//             onChange?.(content);
//           }
//         }),
//         EditorState.readOnly.of(readOnly),
//         keymap.of([
//           {
//             key: "Ctrl-s",
//             run: () => {
//               applyBeautification("default");
//               return true;
//             },
//           },
//           {
//             key: "Cmd-s",
//             run: () => {
//               applyBeautification("default");
//               return true;
//             },
//           },
//         ]),
//       ],
//     });

//     viewRef.current = new EditorView({
//       state: startState,
//       parent: editorRef.current,
//     });

//     return () => {
//       viewRef.current?.destroy();
//     };
//   }, [readOnly]);

//   useEffect(() => {
//     if (value !== undefined && viewRef.current) {
//       const currentValue = viewRef.current.state.doc.toString();
//       if (value !== currentValue) {
//         viewRef.current.dispatch({
//           changes: {
//             from: 0,
//             to: viewRef.current.state.doc.length,
//             insert: value,
//           },
//         });
//       }
//     }
//   }, [value]);

//   return (
//     <div
//       className={`json-editor ${className} ${readOnly ? "disabled" : ""}`}
//       data-valid={isValid}
//     >
//       <div className="json-editor__header">
//         <div className="json-editor__status">
//           <span className="json-editor__status-icon">
//             {isValid ? (
//               <CheckCircle size={20} weight="fill" className="icon-check" />
//             ) : (
//               <WarningCircle size={20} weight="fill" className="icon-alert" />
//             )}
//           </span>
//           <span className="json-editor__status-text">
//             {isValid ? "Valid JSON" : "Invalid JSON"}
//           </span>
//         </div>

//         <div className="json-editor__actions">
//           <div className="json-editor__dropdown beautifier">
//             <PButton
//               className="json-editor__button"
//               onClick={() => toggleDropdown("beautify")}
//               disabled={!isValid || readOnly}
//             >
//               <MagicWand size={16} />
//               <span>Beautify</span>
//               <CaretDown size={12} />
//             </PButton>
//             {activeDropdown === "beautify" && (
//               <div className="json-editor__dropdown-content">
//                 <PButton
//                   className="json-editor__dropdown-item"
//                   onClick={() => applyBeautification("default")}
//                 >
//                   Standard (2 spaces)
//                 </PButton>
//                 <PButton
//                   className="json-editor__dropdown-item"
//                   onClick={() => applyBeautification("compact")}
//                 >
//                   Compact (1 space)
//                 </PButton>
//                 <PButton
//                   className="json-editor__dropdown-item"
//                   onClick={() => applyBeautification("spaced")}
//                 >
//                   Expanded (4 spaces)
//                 </PButton>
//                 <PButton
//                   className="json-editor__dropdown-item"
//                   onClick={() => applyBeautification("minified")}
//                 >
//                   Minified
//                 </PButton>
//               </div>
//             )}
//           </div>

//           <div className="json-editor__dropdown copy">
//             <button
//               className="json-editor__button"
//               onClick={() => toggleDropdown("copy")}
//             >
//               <Copy size={16} />
//               <span>{isCopied ? "Copied!" : "Copy"}</span>
//               <CaretDown size={12} />
//             </button>
//             {activeDropdown === "copy" && (
//               <div className="json-editor__dropdown-content">
//                 <PButton
//                   className="json-editor__dropdown-item"
//                   onClick={() => handleCopy("formatted")}
//                 >
//                   Copy Formatted
//                 </PButton>
//                 <PButton
//                   className="json-editor__dropdown-item"
//                   onClick={() => handleCopy("minified")}
//                 >
//                   Copy Minified
//                 </PButton>
//                 <PButton
//                   className="json-editor__dropdown-item"
//                   onClick={() => handleCopy("download")}
//                 >
//                   <Download size={16} />
//                   Download JSON
//                 </PButton>
//               </div>
//             )}
//           </div>

//           <PButton
//             className="json-editor__button reset"
//             onClick={resetContent}
//             disabled={readOnly}
//           >
//             <ArrowCounterClockwise size={16} />
//           </PButton>
//         </div>
//       </div>

//       <div className="json-editor__content">
//         <div className="json-editor__wrapper" ref={editorRef} />
//       </div>
//     </div>
//   );
// };

// export default JsonEditor;

/** src/components/JsonEditor/JsonEditor.tsx **/

// import {
//   ArrowCounterClockwise,
//   CaretDown,
//   CheckCircle,
//   Copy,
//   Download,
//   MagicWand,
//   MagnifyingGlass,
//   WarningCircle,
// } from "@phosphor-icons/react"; // or any icon library
// import clsx from "clsx"; // optional utility for classNames
// import React from "react";

// import { PJsonEditorProps } from "./type";
// import { useCodeMirror } from "./useCodeMirror";

//  const JsonEditor: React.FC<PJsonEditorProps> = ({
//   value,
//   defaultValue = "",
//   onChange,
//   onValidChange,
//   readOnly = false,
//   height = "400px",
//   className,
// }) => {
//   const [editorValue, setEditorValue] = React.useState(value ?? defaultValue);
//   const [isValid, setIsValid] = React.useState(true);
//   const [isCopied, setIsCopied] = React.useState(false);
//   const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
//     null
//   );

//   // Validate JSON
//   const validateJson = React.useCallback(
//     (str: string) => {
//       try {
//         JSON.parse(str);
//         setIsValid(true);
//         onValidChange?.(true);
//       } catch (err) {
//         setIsValid(false);
//         onValidChange?.(false);
//       }
//     },
//     [onValidChange]
//   );

//   // Handle content changes
//   const handleChange = (val: string) => {
//     setEditorValue(val);
//     onChange?.(val);
//     validateJson(val);
//   };

//   // Setup CodeMirror
//   const { editorRef, viewRef, setValue } = useCodeMirror({
//     initialValue: editorValue,
//     onChange: handleChange,
//     readOnly,
//     height,
//   });

//   // Sync external prop.value to local content
//   React.useEffect(() => {
//     if (value !== undefined && value !== editorValue) {
//       setEditorValue(value);
//       setValue(value);
//     }
//   }, [value, editorValue, setValue]);

//   // Validate on mount
//   React.useEffect(() => {
//     validateJson(editorValue);
//   }, [editorValue, validateJson]);

//   // Dropdown toggles
//   const toggleDropdown = (name: string) => {
//     setActiveDropdown((prev) => (prev === name ? null : name));
//   };

//   const handleOutsideClick = (e: MouseEvent) => {
//     if (activeDropdown) {
//       const target = e.target as Element;
//       if (!target.closest(".json-editor__dropdown")) {
//         setActiveDropdown(null);
//       }
//     }
//   };

//   React.useEffect(() => {
//     document.addEventListener("click", handleOutsideClick);
//     return () => {
//       document.removeEventListener("click", handleOutsideClick);
//     };
//   }, [activeDropdown]);

//   // Beautification
//   const beautifyOptions = {
//     default: (txt: string) => JSON.stringify(JSON.parse(txt), null, 2),
//     minified: (txt: string) => JSON.stringify(JSON.parse(txt)),
//     compact: (txt: string) => JSON.stringify(JSON.parse(txt), null, 1),
//     spaced: (txt: string) => JSON.stringify(JSON.parse(txt), null, 4),
//   };

//   const applyBeautification = (type: keyof typeof beautifyOptions) => {
//     if (!viewRef.current) return;
//     try {
//       const current = viewRef.current.state.doc.toString();
//       const newVal = beautifyOptions[type](current);
//       viewRef.current.dispatch({
//         changes: { from: 0, to: current.length, insert: newVal },
//       });
//       setActiveDropdown(null);
//     } catch {
//       console.warn("Invalid JSON - cannot beautify");
//     }
//   };

//   // Copy, Download, Reset
//   const copyFunctions = {
//     formatted: async () => {
//       if (!viewRef.current) return;
//       const content = beautifyOptions.default(
//         viewRef.current.state.doc.toString()
//       );
//       await navigator.clipboard.writeText(content);
//     },
//     minified: async () => {
//       if (!viewRef.current) return;
//       const content = beautifyOptions.minified(
//         viewRef.current.state.doc.toString()
//       );
//       await navigator.clipboard.writeText(content);
//     },
//     download: () => {
//       if (!viewRef.current) return;
//       const content = viewRef.current.state.doc.toString();
//       const blob = new Blob([content], { type: "application/json" });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "data.json";
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     },
//   };

//   const handleCopy = async (type: keyof typeof copyFunctions) => {
//     try {
//       await copyFunctions[type]();
//       setIsCopied(true);
//       setTimeout(() => setIsCopied(false), 2000);
//       setActiveDropdown(null);
//     } catch (err) {
//       console.error("Copy failed:", err);
//     }
//   };

//   const resetContent = () => {
//     setValue(defaultValue);
//     setEditorValue(defaultValue);
//   };

//   // Search (Open a find panel, for instance)
//   const openSearchPanel = () => {
//     // CodeMirror has a default search panel in @codemirror/search (not integrated by default).
//     // If you want to open the search panel programmatically, you can do so:
//     // import { openSearchPanel } from "@codemirror/search"
//     // if (viewRef.current) {
//     //   viewRef.current.dispatch({
//     //     effects: openSearchPanel.of(null)
//     //   })
//     // }
//     console.log("Search panel requested (implement if needed)!");
//   };

//   return (
//     <div
//       className={clsx("json-editor", className, { disabled: readOnly })}
//       data-valid={isValid}
//     >
//       {/* Header */}
//       <div className="json-editor__header">
//         {/* Status */}
//         <div className="json-editor__status">
//           <span className="json-editor__status-icon">
//             {isValid ? (
//               <CheckCircle size={20} weight="fill" className="icon-check" />
//             ) : (
//               <WarningCircle size={20} weight="fill" className="icon-alert" />
//             )}
//           </span>
//           <span className="json-editor__status-text">
//             {isValid ? "Valid JSON" : "Invalid JSON"}
//           </span>
//         </div>

//         {/* Actions */}
//         <div className="json-editor__actions">
//           {/* Beautify */}
//           <div className="json-editor__dropdown beautifier">
//             <button
//               className="json-editor__button"
//               onClick={() => toggleDropdown("beautify")}
//               disabled={!isValid || readOnly}
//             >
//               <MagicWand size={16} />
//               <span>Beautify</span>
//               <CaretDown size={12} />
//             </button>
//             {activeDropdown === "beautify" && (
//               <div className="json-editor__dropdown-content">
//                 <button
//                   className="json-editor__dropdown-item"
//                   onClick={() => applyBeautification("default")}
//                 >
//                   Standard (2 spaces)
//                 </button>
//                 <button
//                   className="json-editor__dropdown-item"
//                   onClick={() => applyBeautification("compact")}
//                 >
//                   Compact (1 space)
//                 </button>
//                 <button
//                   className="json-editor__dropdown-item"
//                   onClick={() => applyBeautification("spaced")}
//                 >
//                   Expanded (4 spaces)
//                 </button>
//                 <button
//                   className="json-editor__dropdown-item"
//                   onClick={() => applyBeautification("minified")}
//                 >
//                   Minified
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Copy */}
//           <div className="json-editor__dropdown copy">
//             <button
//               className="json-editor__button"
//               onClick={() => toggleDropdown("copy")}
//               disabled={readOnly}
//             >
//               <Copy size={16} />
//               <span>{isCopied ? "Copied!" : "Copy"}</span>
//               <CaretDown size={12} />
//             </button>
//             {activeDropdown === "copy" && (
//               <div className="json-editor__dropdown-content">
//                 <button
//                   className="json-editor__dropdown-item"
//                   onClick={() => handleCopy("formatted")}
//                 >
//                   Copy Formatted
//                 </button>
//                 <button
//                   className="json-editor__dropdown-item"
//                   onClick={() => handleCopy("minified")}
//                 >
//                   Copy Minified
//                 </button>
//                 <button
//                   className="json-editor__dropdown-item"
//                   onClick={() => handleCopy("download")}
//                 >
//                   <Download size={16} />
//                   Download JSON
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Search */}
//           <button
//             className="json-editor__button"
//             onClick={openSearchPanel}
//             disabled={readOnly}
//           >
//             <MagnifyingGlass size={16} />
//           </button>

//           {/* Reset */}
//           <button
//             className="json-editor__button reset"
//             onClick={resetContent}
//             disabled={readOnly}
//           >
//             <ArrowCounterClockwise size={16} />
//           </button>
//         </div>
//       </div>

//       {/* Editor Content */}
//       <div className="json-editor__content" style={{ height }}>
//         <div className="json-editor__wrapper" ref={editorRef} />
//       </div>
//     </div>
//   );
// };

// export default JsonEditor;
