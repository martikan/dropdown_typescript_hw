import { useState, useEffect, useRef, FC, MutableRefObject } from 'react';
import './dropdown.css'

interface IDropdown {
  noneValue: string,
  placeholderText: string;
  options: Array<string>;
  onChange: (newValue: string) => void;
}

const Dropdown: FC<IDropdown> = ({ options: items = [],
  onChange = () => { },
  noneValue = null,
  placeholderText = null }) => {

  const dropdownContainer: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [opened, setOpened] = useState(false);
  const [options, setOptions] = useState(noneValue ? [noneValue, ...items] : items);
  const [selected, setSelected] = useState(placeholderText ? placeholderText : items[0]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      console.log('dropdown unmounted');
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e: Event) => {
    if (!dropdownContainer.current?.contains(e.target as Node)) {
      setOpened(false);
    }
  };

  return (
    <div className='dropdown-container' ref={dropdownContainer}>
      <button className={opened ? 'selected' : 'selected closed'}
        onClick={() => { setOpened(!opened); }}>
        {selected}
        <span className={`icon ${opened ? 'arrow-up' : 'arrow-down'}`} />
      </button>
      {opened && (
        <div className='options'>
          {options
            .filter((option) => option !== selected)
            .map((option, index) => (
              <button key={index}
                className='option'
                onClick={() => {
                  setSelected(option);
                  setOpened(false);
                  onChange(option);
                }}>
                {option}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;