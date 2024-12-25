import { useRef, useState } from "react";
import { CloseIcon } from "./Icon";

interface Option {
  name: string;
  value: string;
}

interface MultiSelectProps {
  placeholder: string;
  options: Option[];
}

const MultiSelect: React.FC<MultiSelectProps> = (props) => {
  const { placeholder, options } = props;
  const componentRef = useRef<HTMLDivElement>(null);
  const componentId = (Math.random() * 1000).toFixed(0);
  const [input, setInput] = useState<string>("");
  const [selected, setSelected] = useState<Option[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleOptionClick = (event: React.MouseEvent, option: Option) => {
    event.stopPropagation();
    const filterOptions = selected.filter((o) => o.value !== option.value);
    setIsFocus(true);
    if (filterOptions.length === selected.length) {
      setSelected((prev) => prev.concat(option));
    } else {
      setSelected(filterOptions);
    }
  };

  const handleRemoveSelectedOption = (option: Option) => {
    setSelected((prev) => prev.filter((o) => o.value !== option.value));
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(e.relatedTarget)
    ) {
      setTimeout(() => setIsFocus(false), 150); // Delay to allow click event to propagate
    }
  };

  return (
    <div
      className="multiselect"
      tabIndex={-1}
      onFocus={() => setIsFocus(true)}
      onBlur={handleBlur}
      ref={componentRef}
    >
      <div className="input-field">
        <ul>
          {selected.map((option, idx) => (
            <li key={componentId + "-pill-" + idx}>
              {option.name}
              <button onClick={() => handleRemoveSelectedOption(option)}>
                <CloseIcon />
              </button>
            </li>
          ))}
          <li className="input-search">
            <input
              placeholder={placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </li>
        </ul>
      </div>
      {isFocus && (
        <div className="options">
          <ul>
            {options
              .filter((option) => option.value.includes(input))
              .map((option, idx) => (
                <li
                  key={componentId + "-option-" + idx}
                  onClick={(e) => handleOptionClick(e, option)}
                  className={
                    selected.find((o) => o.value === option.value)
                      ? "selectedOption"
                      : ""
                  }
                >
                  {option.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <MultiSelect placeholder="Search here" options={countryOptions} />
    </div>
  );
}

const countryOptions = [
  { name: "India", value: "india" },
  { name: "United States of America", value: "united-states-of-america" },
  { name: "United Kingdom", value: "united-kingdom" },
  { name: "Canada", value: "canada" },
  { name: "Australia", value: "australia" },
  { name: "New Zealand", value: "new-zealand" },
  { name: "South Korea", value: "south-korea" },
  { name: "North Korea", value: "north-korea" },
  { name: "Mexico", value: "mexico" },
  { name: "France", value: "france" },
  { name: "Germany", value: "germany" },
  { name: "Brazil", value: "brazil" },
  { name: "Argentina", value: "argentina" },
  { name: "South Africa", value: "south-africa" },
  { name: "Russia", value: "russia" },
  { name: "Japan", value: "japan" },
  { name: "China", value: "china" },
  { name: "Italy", value: "italy" },
  { name: "Spain", value: "spain" },
  { name: "Saudi Arabia", value: "saudi-arabia" },
  { name: "United Arab Emirates", value: "united-arab-emirates" },
  { name: "Indonesia", value: "indonesia" },
  { name: "Philippines", value: "philippines" },
  { name: "Egypt", value: "egypt" },
  { name: "Turkey", value: "turkey" },
];
