import { useState } from "react";
import data from "./data";
import "./styles.css";

const Accordian = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMutiple = [...multiple];
    const findIndexOfCurrentId = cpyMutiple.indexOf(getCurrentId);
    // console.log(findIndexOfCurrentId);

    if(findIndexOfCurrentId === -1) cpyMutiple.push(getCurrentId)
    else cpyMutiple.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMutiple, multiple)
  }

//   console.log(selected);

  return (
    <div className="acc-wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>

      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => {
            return (
              <div key={dataItem.id} className="item">
                <div
                  onClick={
                    enableMultiSelection
                      ? () => handleMultiSelection(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)
                  }
                  className="title"
                >
                  <h3>{dataItem.question}</h3>
                  <span>+</span>
                </div>
                {
                    enableMultiSelection ? multiple.indexOf(dataItem.id) !== -1 && <div className="contenty">{dataItem.answer}</div> : selected === dataItem.id && <div className="contenty">{dataItem.answer}</div>
                }
                {/* {selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? (
                  <div className="contenty">{dataItem.answer}</div>
                ) : null} */}
              </div>
            );
          })
        ) : (
          <div>No Data Found !</div>
        )}
      </div>
    </div>
  );
};

export default Accordian;