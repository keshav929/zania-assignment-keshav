import React, { useEffect, useState, useCallback, useRef } from "react";
// import data from "../data/static.json";
import Document from "./Document";
import Overlay from "./Overlay";
import useEscape from "../hooks/useEscape";
import { Draggable } from "react-drag-reorder";
import Loading from "./Loading";
import Shimmer from "./Shimmer";

const App = () => {
  const [selectedDocType, setSelectedDocType] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const hasOrderChanged = useRef(false);
  const [showLoaderOnSave, setShowLoaderOnSave] = useState(false);
  const [timeSinceLastSave, setTimeSinceLastSave] = useState(0);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEscape(() => {
    setShowOverlay(false);
    setSelectedDocType(null);
  });

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  useEffect(()=>{
    let timerInterval = setInterval(() => {
      setTimeSinceLastSave((timeSinceLastSave) => timeSinceLastSave + 1000);
    }, 1000);
    return(()=>{
      clearInterval(timerInterval);
    })
  },[]);



  useEffect(()=>{
    let intervalId = setInterval(() => {
      if (hasOrderChanged.current) {
        setShowLoaderOnSave(true);
        saveDataInStorage();
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  },[hasOrderChanged.current]);

  const fetchDocumentTypes = async () => {
    await fetch("/api/get-document-types")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setDocumentTypes(data);
      });
  };

  const handleDocumentClick = (docType) => {
    setShowOverlay(true);
    setSelectedDocType(docType.type);
  };

  const getChangedPos = (currentPos, newPos) => {
    let arr = documentTypes.slice();

    let elMoved = arr.splice(currentPos, 1);
    arr.splice(newPos, 0, elMoved[0]);
    setDocumentTypes(arr);
    hasOrderChanged.current = true;
  };

  const saveDataInStorage = async () => {
     await fetch("api/save-document-types", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(documentTypes),
    }).then((res) => {
      hasOrderChanged.current = false;
      setTimeSinceLastSave(0);
      setShowLoaderOnSave(false);
    });
  };

  const DraggableRender = useCallback(() => {
    return documentTypes.length > 0 ? (
      <Draggable onPosChange={getChangedPos}>
        {documentTypes.map((docType, index) => (
          <div
            className="document-container"
            key={index}
            onClick={() => handleDocumentClick(docType)}
          >
            <Document docEntity={docType} />
          </div>
        ))}
      </Draggable>
    ) : (
      <div className="no-data-found">No Data Found</div>
    );
  }, [documentTypes]);

  return (
    <div className="app-layout">
      <div className="app-container">
        <div className="timer-info">Time since last save: {timeSinceLastSave / 1000}s</div>
        <div className={isLoading ? '' : 'items-container'}>
          {isLoading ? <Shimmer /> : <DraggableRender />}
          {/* <Shimmer /> */}
        </div>
        <div>
        {showLoaderOnSave ? (
          <div className="loader-container">
            <Loading />
          </div>
        ) : null}
        </div>
      </div>
      
        {showOverlay && <div className="overlay-container"><Overlay selectedItemType={selectedDocType} /></div>}
      
    </div>
  );
};

export default App;
